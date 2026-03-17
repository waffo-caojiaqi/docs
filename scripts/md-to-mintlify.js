#!/usr/bin/env node
/**
 * md-to-mintlify.js
 *
 * Converts native Markdown files to Mintlify-flavored MDX.
 *
 * Transformation rules:
 *   > [!NOTE]      → <Note>
 *   > [!TIP]       → <Tip>
 *   > [!WARNING]   → <Warning>
 *   > [!IMPORTANT] → <Info>
 *   > [!CAUTION]   → <Warning>
 *   # H1 title     → frontmatter title (if no frontmatter)
 *   ``` code       → ensure language tag
 *   ---            → kept as-is
 *
 * Usage:
 *   node scripts/md-to-mintlify.js <input.md> [output.mdx]
 *   node scripts/md-to-mintlify.js docs-source/ docs/    (batch mode)
 *
 * Environment:
 *   MINTLIFY_PRESERVE_CALLOUTS=1   skip callout conversion (dry run)
 */

const fs = require('fs')
const path = require('path')

// ── Callout type mappings ────────────────────────────────────────────────────
const CALLOUT_MAP = {
  NOTE: 'Note',
  TIP: 'Tip',
  WARNING: 'Warning',
  IMPORTANT: 'Info',
  CAUTION: 'Warning',
}

// ── Core transformation ──────────────────────────────────────────────────────

function convertMdToMdx(content, filePath = '') {
  let result = content

  // 1. Extract or inject frontmatter
  result = ensureFrontmatter(result, filePath)

  // 2. GitHub-style callouts → Mintlify components
  result = convertCallouts(result)

  // 3. Ensure all fenced code blocks have a language tag
  result = ensureCodeLanguage(result)

  // 4. Convert bare URLs in text to proper markdown links (optional, safe)
  // result = convertBareUrls(result)

  return result
}

function ensureFrontmatter(content, filePath) {
  // Already has frontmatter
  if (content.startsWith('---')) return content

  // Extract title from first H1
  const h1Match = content.match(/^#\s+(.+)$/m)
  const title = h1Match ? h1Match[1].trim() : titleFromPath(filePath)

  // Extract first non-heading paragraph as description
  const lines = content.split('\n')
  let description = ''
  let foundH1 = false
  for (const line of lines) {
    if (line.startsWith('# ')) { foundH1 = true; continue }
    if (foundH1 && line.trim() && !line.startsWith('#')) {
      description = line.trim().replace(/[*_`]/g, '')
      break
    }
  }

  const fm = [
    '---',
    `title: "${title}"`,
    description ? `description: "${description.substring(0, 150)}"` : '',
    '---',
    '',
  ].filter(Boolean).join('\n')

  return fm + '\n' + content
}

function convertCallouts(content) {
  /**
   * Handles multi-line GitHub callouts:
   *
   *   > [!NOTE]
   *   > First line
   *   > Second line
   *
   * → <Note>
   *   First line
   *   Second line
   *   </Note>
   */
  const lines = content.split('\n')
  const output = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const calloutMatch = line.match(/^>\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\](.*)$/i)

    if (calloutMatch) {
      const type = CALLOUT_MAP[calloutMatch[1].toUpperCase()] || 'Note'
      const firstLineExtra = calloutMatch[2].trim()

      // Collect following blockquote lines
      const bodyLines = []
      if (firstLineExtra) bodyLines.push(firstLineExtra)

      i++
      while (i < lines.length && lines[i].match(/^>\s*/)) {
        bodyLines.push(lines[i].replace(/^>\s*/, ''))
        i++
      }

      output.push(`<${type}>`)
      bodyLines.forEach(l => output.push(l))
      output.push(`</${type}>`)
    } else {
      output.push(line)
      i++
    }
  }

  return output.join('\n')
}

function ensureCodeLanguage(content) {
  // Only add 'text' to OPENING fences that have no language tag.
  // Closing fences are always bare ``` — we must not touch them.
  const lines = content.split('\n')
  let insideBlock = false

  return lines.map(line => {
    if (!insideBlock && line.match(/^```\s*$/)) {
      insideBlock = true
      return '```text'
    }
    if (insideBlock && line.match(/^```\s*$/)) {
      insideBlock = false
    }
    if (!insideBlock && line.match(/^```\S/)) {
      insideBlock = true
    }
    return line
  }).join('\n')
}

function titleFromPath(filePath) {
  const name = path.basename(filePath, path.extname(filePath))
  return name
    .split(/[-_]/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

// ── File / Directory processing ──────────────────────────────────────────────

function processFile(inputPath, outputPath) {
  const content = fs.readFileSync(inputPath, 'utf8')
  const converted = convertMdToMdx(content, inputPath)

  const outDir = path.dirname(outputPath)
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

  fs.writeFileSync(outputPath, converted, 'utf8')
  console.log(`✓ ${inputPath} → ${outputPath}`)
}

function processDirectory(inputDir, outputDir) {
  const entries = fs.readdirSync(inputDir, { withFileTypes: true })

  for (const entry of entries) {
    const inputPath = path.join(inputDir, entry.name)
    if (entry.isDirectory()) {
      processDirectory(inputPath, path.join(outputDir, entry.name))
    } else if (entry.name.endsWith('.md')) {
      const outName = entry.name.replace(/\.md$/, '.mdx')
      processFile(inputPath, path.join(outputDir, outName))
    }
  }
}

// ── CLI entry point ──────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2)
  if (args.length === 0) {
    console.log('Usage:')
    console.log('  node scripts/md-to-mintlify.js <input.md> [output.mdx]')
    console.log('  node scripts/md-to-mintlify.js <input-dir/> <output-dir/>')
    process.exit(1)
  }

  const input = args[0]
  const stat = fs.existsSync(input) && fs.statSync(input)

  if (!stat) {
    console.error(`ERROR: "${input}" does not exist`)
    process.exit(1)
  }

  if (stat.isDirectory()) {
    const outputDir = args[1] || input.replace(/\/?$/, '-mintlify')
    console.log(`Batch converting ${input} → ${outputDir}`)
    processDirectory(input, outputDir)
  } else {
    const outputPath = args[1] || input.replace(/\.md$/, '.mdx')
    processFile(input, outputPath)
  }

  console.log('Done.')
}

main()

// ── Export for programmatic use ──────────────────────────────────────────────
module.exports = { convertMdToMdx }
