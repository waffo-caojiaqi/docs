#!/usr/bin/env node
/**
 * md-to-mintlify.js — Smart Markdown → Mintlify MDX converter
 *
 * Transformations (in order):
 *   1.  Frontmatter      H1 + first paragraph → YAML frontmatter
 *   2.  Callouts         > [!NOTE/TIP/WARNING/IMPORTANT/CAUTION/CHECK/INFO] → component
 *   3.  Code language    bare ``` → ```text
 *   4.  CodeGroup        2+ consecutive fenced blocks → <CodeGroup>
 *   5.  Steps            numbered lists under "step-like" headings → <Steps><Step>
 *   6.  Accordion        FAQ headings + sub-headings / **Q:** **A:** pattern → <AccordionGroup>
 *   7.  CardGroup        feature/benefit bullet lists → <CardGroup cols={2}>
 *   8.  Frame            standalone images → <Frame>
 *   9.  Tabs             <!-- tabs --> ... <!-- tab: Name --> markers → <Tabs>
 *   10. ParamField       param-like tables under request headings → <ParamField>
 *   11. ResponseField    field-like tables under response headings → <ResponseField>
 *   12. Expandable       <details><summary> → <Expandable>
 *
 * Usage:
 *   node scripts/md-to-mintlify.js <input.md> [output.mdx]
 *   node scripts/md-to-mintlify.js docs-source/ docs/    (batch mode)
 */

'use strict'

const fs   = require('fs')
const path = require('path')

// ── Constants ────────────────────────────────────────────────────────────────

const CALLOUT_MAP = {
  NOTE:      'Note',
  TIP:       'Tip',
  WARNING:   'Warning',
  IMPORTANT: 'Info',
  CAUTION:   'Warning',
  CHECK:     'Check',
  SUCCESS:   'Check',
  INFO:      'Info',
}

// Headings that signal a numbered list should become <Steps>
const STEP_KW = [
  'step', 'steps', 'how to', 'how-to', 'guide', 'setup', 'set up',
  'install', 'configure', 'process', 'workflow', 'procedure', 'tutorial',
  'quickstart', 'quick start', 'getting started', 'walkthrough', 'integration',
  '步骤', '如何', '安装', '配置', '流程', '操作', '快速开始', '入门', '集成', '教程',
]

// Headings that signal a bullet list should become <CardGroup>
const CARD_KW = [
  'feature', 'features', 'capability', 'capabilities', 'benefit', 'benefits',
  'advantage', 'advantages', 'use case', 'use cases', 'scenario', 'scenarios',
  'highlight', 'highlights', 'offering', 'offerings', 'option', 'options',
  'product', 'products', 'service', 'services', 'module', 'modules',
  '功能', '特性', '优势', '使用场景', '应用场景', '亮点', '特点', '能力', '产品', '服务',
]

// Headings that signal sub-headings are FAQ items
const FAQ_KW = [
  'faq', 'frequently asked', 'q&a', 'questions', 'common questions',
  '常见问题', '问题解答', '疑问', 'q & a',
]

// Headings that signal a table is about request parameters
const PARAM_KW = [
  'parameter', 'param', 'request body', 'request params', 'input', 'payload',
  'body', 'query', 'path param', 'header',
  '参数', '入参', '请求体', '请求参数', '字段',
]

// Headings that signal a table is about response fields
const RESPONSE_KW = [
  'response', 'output', 'return', 'result', 'payload', 'data',
  '返回', '响应', '输出', '结果', '回包',
]

// ── Helpers ──────────────────────────────────────────────────────────────────

function kwMatch(text, keywords) {
  if (!text) return false
  const lower = text.toLowerCase()
  return keywords.some(kw => lower.includes(kw))
}

function esc(str) {
  return (str || '').replace(/"/g, '&quot;')
}

function titleFromPath(filePath) {
  return path.basename(filePath, path.extname(filePath))
    .split(/[-_]/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

// ── 1. Frontmatter ───────────────────────────────────────────────────────────

function ensureFrontmatter(content, filePath) {
  if (content.startsWith('---')) return content

  const h1  = content.match(/^#\s+(.+)$/m)
  const title = h1 ? h1[1].trim() : titleFromPath(filePath)

  let description = ''
  let foundH1 = false
  for (const line of content.split('\n')) {
    if (line.startsWith('# ')) { foundH1 = true; continue }
    if (foundH1 && line.trim() && !line.startsWith('#')) {
      description = line.trim().replace(/[*_`]/g, '').substring(0, 150)
      break
    }
  }

  const fm = ['---', `title: "${esc(title)}"`, description ? `description: "${description}"` : '', '---', '']
    .filter(Boolean).join('\n')

  return fm + '\n' + content
}

// ── 2. Callouts ──────────────────────────────────────────────────────────────

function convertCallouts(content) {
  const lines  = content.split('\n')
  const output = []
  let i = 0

  while (i < lines.length) {
    const m = lines[i].match(/^>\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION|CHECK|SUCCESS|INFO)\](.*)$/i)
    if (m) {
      const type  = CALLOUT_MAP[m[1].toUpperCase()] || 'Note'
      const body  = []
      if (m[2].trim()) body.push(m[2].trim())
      i++
      while (i < lines.length && /^>\s*/.test(lines[i])) {
        body.push(lines[i].replace(/^>\s*/, ''))
        i++
      }
      output.push(`<${type}>`, ...body, `</${type}>`)
    } else {
      output.push(lines[i++])
    }
  }

  return output.join('\n')
}

// ── 3. Code language ─────────────────────────────────────────────────────────

function ensureCodeLanguage(content) {
  const lines   = content.split('\n')
  let inBlock   = false

  return lines.map(line => {
    if (!inBlock && /^```\s*$/.test(line)) { inBlock = true;  return '```text' }
    if ( inBlock && /^```\s*$/.test(line)) { inBlock = false; return line }
    if (!inBlock && /^```\S/.test(line))   { inBlock = true }
    return line
  }).join('\n')
}

// ── 4. CodeGroup (consecutive fenced blocks) ─────────────────────────────────

function convertConsecutiveCodeBlocks(content) {
  const lines  = content.split('\n')
  const output = []
  let i = 0

  while (i < lines.length) {
    if (!/^```\S/.test(lines[i])) { output.push(lines[i++]); continue }

    // Collect consecutive code blocks separated only by blank lines
    const blocks = []
    let j = i

    while (j < lines.length) {
      if (!/^```\S/.test(lines[j])) break

      const block = [lines[j++]]  // opening fence with lang tag

      // Body until closing ```
      while (j < lines.length && !/^```\s*$/.test(lines[j])) {
        block.push(lines[j++])
      }
      if (j < lines.length) block.push(lines[j++])  // closing ```
      blocks.push(block)

      // Peek past blank lines for another code block
      const blankStart = j
      while (j < lines.length && lines[j].trim() === '') j++
      if (j < lines.length && /^```\S/.test(lines[j])) continue  // found next block
      j = blankStart  // restore: blank lines belong outside the group
      break
    }

    if (blocks.length >= 2) {
      output.push('<CodeGroup>')
      blocks.forEach(b => b.forEach(l => output.push(l)))
      output.push('</CodeGroup>')
    } else {
      blocks.forEach(b => b.forEach(l => output.push(l)))
    }
    i = j
  }

  return output.join('\n')
}

// ── 5. Steps (numbered lists after step-like headings) ───────────────────────

function convertStepLists(content) {
  const lines  = content.split('\n')
  const output = []
  let lastHeading = ''
  let i = 0

  while (i < lines.length) {
    const hm = lines[i].match(/^#{1,4}\s+(.+)$/)
    if (hm) { lastHeading = hm[1]; output.push(lines[i++]); continue }

    // Only start if the list begins with item 1 and heading matches
    if (!/^1\.\s/.test(lines[i]) || !kwMatch(lastHeading, STEP_KW)) {
      output.push(lines[i++]); continue
    }

    const items = []
    let j = i

    while (j < lines.length) {
      const im = lines[j].match(/^(\d+)\.\s+(.+)$/)
      if (im) {
        const title = im[2]
        const body  = []
        j++

        // Collect indented continuation lines
        while (j < lines.length) {
          if (/^\s{2,}/.test(lines[j])) {
            body.push(lines[j].replace(/^\s{2,}/, ''))
            j++
          } else if (lines[j].trim() === '') {
            // Blank line: keep if indented content or next numbered item follows
            let peek = j + 1
            while (peek < lines.length && lines[peek].trim() === '') peek++
            if (peek < lines.length && (/^\s{2,}/.test(lines[peek]) || /^\d+\.\s/.test(lines[peek]))) {
              body.push('')
              j++
            } else { break }
          } else { break }
        }

        // Trim trailing blanks in body
        while (body.length && !body[body.length - 1].trim()) body.pop()
        items.push({ title, body })
      } else if (lines[j].trim() === '') {
        // Blank line between items
        let peek = j + 1
        while (peek < lines.length && lines[peek].trim() === '') peek++
        if (peek < lines.length && /^\d+\.\s/.test(lines[peek])) { j = peek }
        else { break }
      } else { break }
    }

    if (items.length >= 2) {
      output.push('<Steps>')
      for (const { title, body } of items) {
        output.push(`  <Step title="${esc(title)}">`)
        body.forEach(l => output.push(l ? `    ${l}` : ''))
        output.push('  </Step>')
      }
      output.push('</Steps>')
      i = j
    } else {
      output.push(lines[i++])  // not enough items — leave as-is
    }
  }

  return output.join('\n')
}

// ── 6. Accordion / FAQ ───────────────────────────────────────────────────────

function convertFaqSections(content) {
  const lines  = content.split('\n')
  const output = []
  let i = 0

  while (i < lines.length) {

    // Pattern A: heading with FAQ keywords → following sub-headings become accordions
    const hm = lines[i].match(/^(#{1,3})\s+(.+)$/)
    if (hm && kwMatch(hm[2], FAQ_KW)) {
      output.push(lines[i++])
      while (i < lines.length && lines[i].trim() === '') { output.push(lines[i++]) }

      const parentLevel = hm[1].length
      const items       = []

      while (i < lines.length) {
        const sm = lines[i].match(/^(#{2,5})\s+(.+)$/)
        if (sm && sm[1].length === parentLevel + 1) {
          const question = sm[2]
          const body     = []
          i++
          while (i < lines.length) {
            const nh = lines[i].match(/^(#{1,5})\s+/)
            if (nh && nh[1].length <= parentLevel + 1) break
            body.push(lines[i++])
          }
          while (body.length && !body[0].trim()) body.shift()
          while (body.length && !body[body.length - 1].trim()) body.pop()
          items.push({ question, body })
        } else { break }
      }

      if (items.length >= 2) {
        output.push('<AccordionGroup>')
        for (const { question, body } of items) {
          output.push(`  <Accordion title="${esc(question)}">`)
          body.forEach(l => output.push(`    ${l}`))
          output.push('  </Accordion>')
        }
        output.push('</AccordionGroup>')
      } else {
        // Restore sub-headings as-is
        items.forEach(({ question, body }) => {
          output.push(`${'#'.repeat(parentLevel + 1)} ${question}`)
          body.forEach(l => output.push(l))
        })
      }
      continue
    }

    // Pattern B: **Q:** ... **A:** inline pairs
    if (/^\*\*Q[：:]\*\*/.test(lines[i])) {
      const pairs = []
      while (i < lines.length && /^\*\*Q[：:]\*\*/.test(lines[i])) {
        const question = lines[i].replace(/^\*\*Q[：:]\*\*\s*/, '').trim()
        const body     = []
        i++
        while (i < lines.length && !/^\*\*Q[：:]\*\*/.test(lines[i])) {
          const am = lines[i].match(/^\*\*A[：:]\*\*\s*(.*)$/)
          if (am) { body.push(am[1]); i++ }
          else if (/^\*\*Q[：:]\*\*/.test(lines[i])) { break }
          else { body.push(lines[i++]) }
        }
        while (body.length && !body[0].trim()) body.shift()
        while (body.length && !body[body.length - 1].trim()) body.pop()
        pairs.push({ question, body })
      }

      if (pairs.length >= 2) {
        output.push('<AccordionGroup>')
        for (const { question, body } of pairs) {
          output.push(`  <Accordion title="${esc(question)}">`)
          body.forEach(l => output.push(`    ${l}`))
          output.push('  </Accordion>')
        }
        output.push('</AccordionGroup>')
      } else {
        pairs.forEach(({ question, body }) => {
          output.push(`**Q:** ${question}`)
          body.forEach(l => output.push(l))
        })
      }
      continue
    }

    output.push(lines[i++])
  }

  return output.join('\n')
}

// ── 7. CardGroup (feature/benefit bullet lists) ──────────────────────────────

function convertFeatureCards(content) {
  const lines  = content.split('\n')
  const output = []
  let lastHeading = ''
  let i = 0

  while (i < lines.length) {
    const hm = lines[i].match(/^#{1,4}\s+(.+)$/)
    if (hm) { lastHeading = hm[1]; output.push(lines[i++]); continue }

    const bm = lines[i].match(/^[-*+]\s+(.+)$/)
    if (!bm || !kwMatch(lastHeading, CARD_KW)) { output.push(lines[i++]); continue }

    // Collect all items in this bullet list
    const items = []
    let j = i

    while (j < lines.length) {
      const im = lines[j].match(/^[-*+]\s+(.+)$/)
      if (im) {
        const text = im[1]
        const sub  = []
        j++
        while (j < lines.length && /^\s{2,}/.test(lines[j])) {
          sub.push(lines[j].replace(/^\s{2,}[-*+]?\s*/, ''))
          j++
        }
        items.push({ text, sub })
      } else if (lines[j].trim() === '') {
        j++
        if (j < lines.length && /^[-*+]\s/.test(lines[j])) continue
        break
      } else { break }
    }

    if (items.length >= 3) {
      output.push('<CardGroup cols={2}>')
      for (const { text, sub } of items) {
        let title, body
        // "**Bold Title**: description" pattern
        const boldM = text.match(/^\*\*(.+?)\*\*[：:\s]*(.*)$/)
        // "emoji Title: description" pattern
        const emojiM = text.match(/^([\u{1F000}-\u{1FFFF}\u2600-\u27BF]|\p{Emoji_Presentation})\s+(.+)$/u)

        if (boldM)  { title = boldM[1]; body = boldM[2] || sub.join(' ') }
        else if (emojiM) {
          const rest = emojiM[2]
          const ci   = rest.indexOf(':')
          if (ci > 0 && ci < 60) { title = rest.slice(0, ci).trim(); body = rest.slice(ci + 1).trim() }
          else { title = rest; body = sub.join(' ') }
        } else {
          const ci = text.indexOf(': ')
          if (ci > 0 && ci < 60) { title = text.slice(0, ci); body = text.slice(ci + 2) }
          else { title = text; body = sub.join(' ') }
        }

        output.push(`  <Card title="${esc(title.trim())}">`)
        if (body) output.push(`    ${body}`)
        else sub.forEach(s => output.push(`    ${s}`))
        output.push('  </Card>')
      }
      output.push('</CardGroup>')
      i = j
    } else {
      items.forEach(({ text, sub }) => {
        output.push(`- ${text}`)
        sub.forEach(s => output.push(`  ${s}`))
      })
      i = j
    }
  }

  return output.join('\n')
}

// ── 8. Frame (standalone images) ─────────────────────────────────────────────

function convertStandaloneImages(content) {
  // Match a line that is only an image (not inside a link)
  return content.replace(
    /^(!\[[^\]]*\]\([^)]+\))$/gm,
    '<Frame>\n  $1\n</Frame>'
  )
}

// ── 9. Tabs (<!-- tabs --> markers) ──────────────────────────────────────────

function convertTabMarkers(content) {
  return content.replace(
    /<!-- tabs -->\n?([\s\S]*?)<!-- \/tabs -->/g,
    (_, inner) => {
      const tabs  = []
      const re    = /<!-- tab: (.+?) -->\n?([\s\S]*?)<!-- \/tab -->/g
      let   m
      while ((m = re.exec(inner)) !== null) {
        tabs.push({ title: m[1].trim(), body: m[2].trim() })
      }
      if (!tabs.length) return _

      const out = ['<Tabs>']
      for (const { title, body } of tabs) {
        out.push(`  <Tab title="${esc(title)}">`)
        body.split('\n').forEach(l => out.push(`    ${l}`))
        out.push('  </Tab>')
      }
      out.push('</Tabs>')
      return out.join('\n')
    }
  )
}

// ── 10 & 11. ParamField / ResponseField (API tables) ─────────────────────────

function convertApiTables(content) {
  const lines  = content.split('\n')
  const output = []
  let lastHeading = ''
  let i = 0

  while (i < lines.length) {
    const hm = lines[i].match(/^#{1,4}\s+(.+)$/)
    if (hm) { lastHeading = hm[1]; output.push(lines[i++]); continue }

    // Is this a table header row?
    if (!/^\|/.test(lines[i]) || i + 1 >= lines.length || !/^\|[-| :]+\|/.test(lines[i + 1])) {
      output.push(lines[i++]); continue
    }

    const headers = lines[i].split('|').map(h => h.trim().toLowerCase()).filter(Boolean)
    const hasName = headers.some(h => ['parameter','param','field','name','参数','字段','名称'].includes(h))
    const hasType = headers.some(h => ['type','类型'].includes(h))

    if (!hasName || !hasType) { output.push(lines[i++]); continue }

    const isParam    = kwMatch(lastHeading, PARAM_KW)
    const isResponse = kwMatch(lastHeading, RESPONSE_KW)
    if (!isParam && !isResponse) { output.push(lines[i++]); continue }

    const Component = isResponse ? 'ResponseField' : 'ParamField'

    // Parse table rows (skip header + separator)
    i += 2
    while (i < lines.length && /^\|/.test(lines[i])) {
      const cells = lines[i].split('|').map(c => c.trim()).filter(Boolean)
      const row   = {}
      headers.forEach((h, idx) => { row[h] = cells[idx] || '' })

      const name  = row['parameter'] || row['param'] || row['field'] || row['name'] || row['参数'] || row['字段'] || row['名称'] || ''
      const type  = row['type']        || row['类型'] || ''
      const desc  = row['description'] || row['desc'] || row['说明'] || row['描述'] || ''
      const req   = row['required']    || row['必填'] || ''
      const isReq = /yes|是|✓|true/i.test(req)

      const attrs = [`name="${esc(name.replace(/`/g, ''))}" type="${esc(type.replace(/`/g, ''))}"`]
      if (isReq && Component === 'ParamField') attrs[0] += ' required'

      output.push(`<${Component} ${attrs[0]}>`)
      if (desc) output.push(`  ${desc}`)
      output.push(`</${Component}>`)
      output.push('')
      i++
    }
    continue
  }

  return output.join('\n')
}

// ── 12. Expandable (<details> → <Expandable>) ────────────────────────────────

function convertDetailsToExpandable(content) {
  return content.replace(
    /<details>\s*<summary>([^<]+)<\/summary>([\s\S]*?)<\/details>/gi,
    (_, title, body) => {
      const lines = ['<Expandable title="' + esc(title.trim()) + '">',
                     ...body.trim().split('\n'),
                     '</Expandable>']
      return lines.join('\n')
    }
  )
}

// ── Main transformer ──────────────────────────────────────────────────────────

function convertMdToMdx(content, filePath = '') {
  let r = content
  r = ensureFrontmatter(r, filePath)
  r = convertCallouts(r)
  r = ensureCodeLanguage(r)
  r = convertConsecutiveCodeBlocks(r)
  r = convertStepLists(r)
  r = convertFaqSections(r)
  r = convertFeatureCards(r)
  r = convertStandaloneImages(r)
  r = convertTabMarkers(r)
  r = convertApiTables(r)
  r = convertDetailsToExpandable(r)
  return r
}

// ── File / Directory processing ───────────────────────────────────────────────

function processFile(inputPath, outputPath) {
  const content   = fs.readFileSync(inputPath, 'utf8')
  const converted = convertMdToMdx(content, inputPath)
  const outDir    = path.dirname(outputPath)
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(outputPath, converted, 'utf8')
  console.log(`✓ ${inputPath} → ${outputPath}`)
}

function processDirectory(inputDir, outputDir) {
  for (const entry of fs.readdirSync(inputDir, { withFileTypes: true })) {
    const inputPath = path.join(inputDir, entry.name)
    if (entry.isDirectory()) {
      processDirectory(inputPath, path.join(outputDir, entry.name))
    } else if (entry.name.endsWith('.md')) {
      const outName = entry.name.replace(/\.md$/, '.mdx')
      processFile(inputPath, path.join(outputDir, outName))
    }
  }
}

// ── CLI entry point ───────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2)
  if (!args.length) {
    console.log('Usage:')
    console.log('  node scripts/md-to-mintlify.js <input.md> [output.mdx]')
    console.log('  node scripts/md-to-mintlify.js <input-dir/> <output-dir/>')
    process.exit(1)
  }

  const input = args[0]
  const stat  = fs.existsSync(input) && fs.statSync(input)
  if (!stat) { console.error(`ERROR: "${input}" does not exist`); process.exit(1) }

  if (stat.isDirectory()) {
    const outputDir = args[1] || input.replace(/\/?$/, '-mintlify')
    console.log(`Batch converting ${input} → ${outputDir}`)
    processDirectory(input, outputDir)
  } else {
    processFile(input, args[1] || input.replace(/\.md$/, '.mdx'))
  }
  console.log('Done.')
}

if (require.main === module) main()

// ── Export ────────────────────────────────────────────────────────────────────
module.exports = { convertMdToMdx }
