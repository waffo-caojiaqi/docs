#!/usr/bin/env node
/**
 * translate-docs.js — Translate docs-source/ (Chinese) → English
 *
 * Usage:
 *   node scripts/translate-docs.js                               # docs-source/ → docs-source-en/
 *   node scripts/translate-docs.js <input-dir> <output-dir>      # custom dirs
 *   node scripts/translate-docs.js <file.md> <out.md>            # single file
 *   node scripts/translate-docs.js --force                        # ignore cache, re-translate all
 *   node scripts/translate-docs.js --provider openai              # use OpenAI (default)
 *   node scripts/translate-docs.js --provider anthropic           # use Anthropic Claude
 *
 * Environment:
 *   OPENAI_API_KEY      — required when --provider openai (default)
 *   ANTHROPIC_API_KEY   — required when --provider anthropic
 */

'use strict'

const fs     = require('fs')
const path   = require('path')
const crypto = require('crypto')

// 本地开发：自动加载 .env 文件（CI 环境变量优先，不会被覆盖）
;(function loadDotEnv() {
  const envPath = path.resolve('.env')
  if (!fs.existsSync(envPath)) return
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/)
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].trim().replace(/^["'](.*)["']$/, '$1')
    }
  }
})()

// ── Provider config ───────────────────────────────────────────────────────────

const PROVIDERS = {
  openai: {
    model:    'gpt-5.2',
    baseURL:  'https://chatgpt.waffo.co/api/openai/v1',
    envKey:   'OPENAI_API_KEY',
    cacheVer: 'openai:gpt-5.2:v1',
  },
  anthropic: {
    model:    'claude-sonnet-4-6',
    envKey:   'ANTHROPIC_API_KEY',
    cacheVer: 'anthropic:claude-sonnet-4-6:v1',
  },
}

const CONCURRENCY = 3
const CACHE_PATH  = path.resolve('.translate-cache.json')

// ── System prompt (shared) ───────────────────────────────────────────────────

const SYSTEM = `You are a professional technical documentation translator specializing in fintech and payment systems.
Translate the Markdown/MDX content from Chinese to English.

STRICT RULES — follow exactly, no exceptions:
1. STRUCTURE: Preserve all Markdown structure — headings (#/##/###), bullet lists, numbered lists, tables, blockquotes, horizontal rules.
2. FRONTMATTER: Keep all YAML keys unchanged. Translate only the VALUES of title and description fields.
3. MDX COMPONENTS: Keep all JSX/MDX tags exactly — <Steps>, <Step>, <Card>, <CardGroup>, <Note>, <Warning>, <Tip>, <Info>, <Check>, <Tabs>, <Tab>, <AccordionGroup>, <Accordion>, <Frame>, <CodeGroup>, etc.
   - Translate text content INSIDE component tags.
   - Translate visible attribute VALUES (e.g. title="查看详情" → title="View Details").
   - NEVER change attribute names (title=, cols=, icon=, href=, type=, etc.).
4. CODE BLOCKS: Preserve EVERYTHING inside fenced code blocks exactly — do not translate code, variable names, comments, or strings.
5. INLINE CODE: Preserve all backtick-wrapped text exactly (e.g. \`error.code\`, \`PaymentIntent\`).
6. URLS & PATHS: Preserve all URLs, file paths, anchor links, and route strings exactly.
7. SPACING: Preserve blank lines and spacing between sections exactly as the source.
8. TONE: Natural, professional developer-documentation English. Sentence case for headings.
9. FINTECH TERMS: Use standard industry English:
   收单/Payin → Acquiring | 代付 → Payout | 结算 → Settlement | 拒付 → Chargeback
   入网 → Onboarding | 商户 → Merchant | 渠道 → Channel | 订阅 → Subscription
   风控 → Risk Control | 争议 → Dispute | 预警 → Alert | 对账 → Reconciliation
10. OUTPUT: Return ONLY the translated content. No preamble, no explanation, no trailing notes.`

// ── Provider adapters ────────────────────────────────────────────────────────

// 单次 API 调用（不含重试）
async function callOpenAI(apiKey, model, baseURL, content) {
  const OpenAI = require('openai')
  const client = new OpenAI({ apiKey, ...(baseURL && { baseURL }) })
  const res = await client.chat.completions.create({
    model,
    max_completion_tokens: 8192,
    messages: [
      { role: 'system', content: SYSTEM },
      { role: 'user',   content },
    ],
  })
  return res.choices[0].message.content
}

async function callAnthropic(apiKey, model, content) {
  const Anthropic = require('@anthropic-ai/sdk')
  const client = new Anthropic({ apiKey })
  const res = await client.messages.create({
    model,
    max_tokens: 8192,
    system: SYSTEM,
    messages: [{ role: 'user', content }],
  })
  return res.content[0].text
}

// ── 重试 ──────────────────────────────────────────────────────────────────────

const MAX_RETRIES   = 3
const RETRY_DELAY   = 5000   // ms，每次重试前等待
const CHUNK_LIMIT   = 6000   // 超过此字节数则分片翻译

async function withRetry(fn, retries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn()
    } catch (err) {
      const isLast = attempt === retries
      if (isLast) throw err
      const delay = RETRY_DELAY * attempt
      process.stderr.write(`    重试 ${attempt}/${retries - 1}（${err.message}），等待 ${delay / 1000}s...\n`)
      await new Promise(r => setTimeout(r, delay))
    }
  }
}

// ── 分片翻译（大文件按 H2 拆分）────────────────────────────────────────────────

function splitByH2(content) {
  // 保留 frontmatter + 第一段（H2 之前的所有内容）作为第一块
  // 之后每个 H2 section 作为独立块
  const parts = content.split(/(?=\n## )/g)
  return parts.length > 1 ? parts : [content]
}

async function translateChunked(callFn, content) {
  if (Buffer.byteLength(content, 'utf8') <= CHUNK_LIMIT) {
    return withRetry(() => callFn(content))
  }

  const chunks = splitByH2(content)
  if (chunks.length === 1) {
    // 无法拆分（没有 H2），直接重试整体
    return withRetry(() => callFn(content))
  }

  // 分片翻译，顺序执行避免并发引发超时
  const results = []
  for (let i = 0; i < chunks.length; i++) {
    process.stderr.write(`    分片 ${i + 1}/${chunks.length}（${Buffer.byteLength(chunks[i], 'utf8')} bytes）\n`)
    results.push(await withRetry(() => callFn(chunks[i])))
  }
  return results.join('\n')
}

async function translateWithOpenAI(apiKey, model, baseURL, content) {
  return translateChunked(c => callOpenAI(apiKey, model, baseURL, c), content)
}

async function translateWithAnthropic(apiKey, model, content) {
  return translateChunked(c => callAnthropic(apiKey, model, c), content)
}

// ── Cache ─────────────────────────────────────────────────────────────────────

function loadCache() {
  try { return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8')) } catch { return {} }
}

function saveCache(cache) {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2), 'utf8')
}

function cacheKey(cacheVer, content) {
  return `${cacheVer}:${crypto.createHash('md5').update(content).digest('hex')}`
}

// ── File processing ───────────────────────────────────────────────────────────

function ensureDir(filePath) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

async function processFile({ inputPath, outputPath, provider, apiKey, model, baseURL, cacheVer, cache, force }) {
  const content = fs.readFileSync(inputPath, 'utf8')

  // Non-Chinese → copy as-is
  if (!/[\u4e00-\u9fff]/.test(content)) {
    ensureDir(outputPath)
    fs.copyFileSync(inputPath, outputPath)
    return 'copied'
  }

  const key = cacheKey(cacheVer, content)
  if (!force && cache[key] && fs.existsSync(outputPath)) {
    return 'cached'
  }

  const translated = provider === 'openai'
    ? await translateWithOpenAI(apiKey, model, baseURL, content)
    : await translateWithAnthropic(apiKey, model, content)

  ensureDir(outputPath)
  fs.writeFileSync(outputPath, translated, 'utf8')
  cache[key] = { output: outputPath, ts: new Date().toISOString() }
  return 'translated'
}

// ── Concurrency pool ──────────────────────────────────────────────────────────

async function pool(tasks, concurrency) {
  let i = 0
  async function worker() {
    while (i < tasks.length) await tasks[i++]()
  }
  await Promise.all(Array.from({ length: concurrency }, worker))
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

function parseArgs(argv) {
  const raw      = argv.slice(2)
  const force    = raw.includes('--force')
  const provIdx  = raw.indexOf('--provider')
  const provider = provIdx !== -1 ? raw[provIdx + 1] : 'openai'
  const rest     = raw.filter((a, i) => !['--force','--provider'].includes(a) && raw[i - 1] !== '--provider')
  return { force, provider, positional: rest }
}

async function main() {
  const { force, provider, positional } = parseArgs(process.argv)

  if (!PROVIDERS[provider]) {
    console.error(`ERROR: Unknown provider "${provider}". Choose: openai | anthropic`)
    process.exit(1)
  }

  const { model, baseURL, envKey, cacheVer } = PROVIDERS[provider]
  const apiKey = process.env[envKey]

  if (!apiKey) {
    console.error(`ERROR: ${envKey} is not set.`)
    console.error(provider === 'openai'
      ? '  export OPENAI_API_KEY=sk-...'
      : '  export ANTHROPIC_API_KEY=sk-ant-...')
    process.exit(1)
  }

  const inputArg  = positional[0] || 'docs-source'
  const outputArg = positional[1] || inputArg.replace(/\/?$/, '-en')

  const stat = fs.existsSync(inputArg) && fs.statSync(inputArg)
  if (!stat) { console.error(`ERROR: "${inputArg}" does not exist`); process.exit(1) }

  const filePairs = stat.isDirectory()
    ? findMdFiles(inputArg).map(f => ({
        input:  f,
        output: path.join(outputArg, path.relative(inputArg, f)),
      }))
    : [{ input: inputArg, output: outputArg }]

  if (!filePairs.length) { console.log('No .md/.mdx files found.'); return }

  console.log(`\nTranslating ${inputArg} → ${outputArg}`)
  console.log(`Provider: ${provider}  Model: ${model}  Files: ${filePairs.length}  Concurrency: ${CONCURRENCY}\n`)

  const cache  = loadCache()
  const counts = { translated: 0, cached: 0, copied: 0, failed: 0 }
  const start  = Date.now()
  let   done   = 0
  const total  = filePairs.length

  const tasks = filePairs.map(({ input, output }) => async () => {
    const rel = path.relative(process.cwd(), input)
    try {
      const status = await processFile({ inputPath: input, outputPath: output, provider, apiKey, model, baseURL, cacheVer, cache, force })
      done++
      counts[status]++
      const icon = { translated: '✓', cached: '·', copied: '→' }[status] || '?'
      console.log(`[${done}/${total}] ${icon} ${rel}  (${status})`)
    } catch (err) {
      done++
      counts.failed++
      console.error(`[${done}/${total}] ✗ ${rel}  ERROR: ${err.message}`)
    }
  })

  await pool(tasks, CONCURRENCY)
  saveCache(cache)

  const elapsed = ((Date.now() - start) / 1000).toFixed(1)
  console.log(`\nDone in ${elapsed}s — translated: ${counts.translated}, cached: ${counts.cached}, copied: ${counts.copied}, failed: ${counts.failed}`)
  console.log(`Output: ${path.resolve(outputArg)}/`)
}

main().catch(err => { console.error(err); process.exit(1) })
