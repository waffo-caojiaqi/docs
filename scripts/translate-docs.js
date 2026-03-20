#!/usr/bin/env node
/**
 * translate-docs.js — Translate docs-source/ (Chinese) → English using Claude
 *
 * Usage:
 *   node scripts/translate-docs.js                          # docs-source/ → docs-source-en/
 *   node scripts/translate-docs.js <input-dir> <output-dir> # custom dirs
 *   node scripts/translate-docs.js <file.md> <out.md>       # single file
 *   node scripts/translate-docs.js --force                   # re-translate all (ignore cache)
 *
 * Environment:
 *   ANTHROPIC_API_KEY  — required
 */

'use strict'

const fs        = require('fs')
const path      = require('path')
const crypto    = require('crypto')
const Anthropic = require('@anthropic-ai/sdk')

// ── Config ───────────────────────────────────────────────────────────────────

const MODEL       = 'claude-sonnet-4-6'
const CONCURRENCY = 3                          // parallel API calls
const CACHE_PATH  = path.resolve('.translate-cache.json')
const CACHE_VER   = `${MODEL}:v1`             // bump to invalidate all cache

// ── System prompt ─────────────────────────────────────────────────────────────

const SYSTEM = `You are a professional technical documentation translator specializing in fintech and payment systems.
Translate the Markdown/MDX content from Chinese to English.

STRICT RULES — follow exactly, no exceptions:
1. STRUCTURE: Preserve all Markdown structure — headings (#/##/###), bullet lists, numbered lists, tables, blockquotes, horizontal rules
2. FRONTMATTER: Keep all YAML keys unchanged. Translate only the VALUES of title and description fields.
3. MDX COMPONENTS: Keep all JSX/MDX tags exactly — <Steps>, <Step>, <Card>, <CardGroup>, <Note>, <Warning>, <Tip>, <Info>, <Check>, <Tabs>, <Tab>, <AccordionGroup>, <Accordion>, <Frame>, <CodeGroup>, etc.
   - Translate text content INSIDE component tags
   - Translate visible attribute VALUES (e.g. title="查看详情" → title="View Details")
   - NEVER change attribute names (title=, cols=, icon=, href=, type=, etc.)
4. CODE BLOCKS: Preserve EVERYTHING inside fenced code blocks (triple backtick) exactly — do not translate code, variable names, comments, or strings
5. INLINE CODE: Preserve all backtick-wrapped text exactly (e.g. \`error.code\`, \`PaymentIntent\`)
6. URLS & PATHS: Preserve all URLs, file paths, anchor links, and route strings exactly
7. SPACING: Preserve blank lines and spacing between sections exactly as the source
8. TONE: Use natural, professional developer-documentation English. Sentence case for headings.
9. FINTECH TERMS: Use standard industry English:
   收单/Payin → Acquiring | 代付 → Payout | 结算 → Settlement | 拒付 → Chargeback
   入网 → Onboarding | 商户 → Merchant | 渠道 → Channel | 订阅 → Subscription
   风控 → Risk Control | 争议 → Dispute | 预警 → Alert | 对账 → Reconciliation
10. OUTPUT: Return ONLY the translated content. No preamble, no explanation, no trailing notes.`

// ── Cache ─────────────────────────────────────────────────────────────────────

function loadCache() {
  try { return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8')) } catch { return {} }
}

function saveCache(cache) {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2), 'utf8')
}

function cacheKey(content) {
  return `${CACHE_VER}:${crypto.createHash('md5').update(content).digest('hex')}`
}

// ── Translate via Claude ──────────────────────────────────────────────────────

async function translateContent(client, content, filePath) {
  const msg = await client.messages.create({
    model: MODEL,
    max_tokens: 8192,
    system: SYSTEM,
    messages: [{ role: 'user', content }],
  })
  return msg.content[0].text
}

// ── File processing ───────────────────────────────────────────────────────────

async function processFile(client, inputPath, outputPath, cache, force) {
  const content = fs.readFileSync(inputPath, 'utf8')

  // Skip non-Chinese files (heuristic: no CJK characters)
  const hasChinese = /[\u4e00-\u9fff]/.test(content)
  if (!hasChinese) {
    ensureDir(outputPath)
    fs.copyFileSync(inputPath, outputPath)
    return { status: 'copied', path: outputPath }
  }

  const key = cacheKey(content)
  if (!force && cache[key] && fs.existsSync(outputPath)) {
    return { status: 'cached', path: outputPath }
  }

  const translated = await translateContent(client, content, inputPath)
  ensureDir(outputPath)
  fs.writeFileSync(outputPath, translated, 'utf8')
  cache[key] = { output: outputPath, ts: new Date().toISOString() }
  return { status: 'translated', path: outputPath }
}

function ensureDir(filePath) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

// ── Concurrency pool ──────────────────────────────────────────────────────────

async function pool(tasks, concurrency) {
  const results = []
  let i = 0

  async function worker() {
    while (i < tasks.length) {
      const idx = i++
      results[idx] = await tasks[idx]()
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker))
  return results
}

// ── Directory scan ────────────────────────────────────────────────────────────

function findMdFiles(dir) {
  const files = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...findMdFiles(full))
    else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) files.push(full)
  }
  return files
}

// ── CLI ───────────────────────────────────────────────────────────────────────

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('ERROR: ANTHROPIC_API_KEY is not set.')
    console.error('  export ANTHROPIC_API_KEY=sk-ant-...')
    process.exit(1)
  }

  const args  = process.argv.slice(2).filter(a => a !== '--force')
  const force = process.argv.includes('--force')

  const inputArg  = args[0] || 'docs-source'
  const outputArg = args[1] || inputArg.replace(/\/?$/, '-en')

  const client = new Anthropic({ apiKey })
  const cache  = loadCache()

  const stat = fs.existsSync(inputArg) && fs.statSync(inputArg)
  if (!stat) { console.error(`ERROR: "${inputArg}" does not exist`); process.exit(1) }

  let filePairs = []

  if (stat.isDirectory()) {
    console.log(`\nTranslating ${inputArg}/ → ${outputArg}/  [model: ${MODEL}]\n`)
    const files = findMdFiles(inputArg)
    filePairs = files.map(f => {
      const rel  = path.relative(inputArg, f)
      return { input: f, output: path.join(outputArg, rel) }
    })
  } else {
    // Single file
    filePairs = [{ input: inputArg, output: outputArg }]
  }

  if (!filePairs.length) { console.log('No .md/.mdx files found.'); return }

  const stats   = { translated: 0, cached: 0, copied: 0, failed: 0 }
  const start   = Date.now()
  let   done    = 0
  const total   = filePairs.length

  const tasks = filePairs.map(({ input, output }) => async () => {
    const rel = path.relative(process.cwd(), input)
    try {
      const result = await processFile(client, input, output, cache, force)
      done++
      stats[result.status]++
      const icon = result.status === 'translated' ? '✓' : result.status === 'cached' ? '·' : '→'
      console.log(`[${done}/${total}] ${icon} ${rel}  (${result.status})`)
      return result
    } catch (err) {
      done++
      stats.failed++
      console.error(`[${done}/${total}] ✗ ${rel}  ERROR: ${err.message}`)
      return { status: 'failed', path: output, error: err.message }
    }
  })

  await pool(tasks, CONCURRENCY)
  saveCache(cache)

  const elapsed = ((Date.now() - start) / 1000).toFixed(1)
  console.log(`\nDone in ${elapsed}s — translated: ${stats.translated}, cached: ${stats.cached}, copied: ${stats.copied}, failed: ${stats.failed}`)
  console.log(`Output: ${path.resolve(outputArg)}/`)
}

main().catch(err => { console.error(err); process.exit(1) })
