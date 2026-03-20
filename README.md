# Waffo Docs

Waffo 产品文档站，基于 [Mintlify](https://mintlify.com) 构建，托管于 `docs.waffo.com`。

## 项目文件结构

```
waffo-docs/
│
├── docs.json                        # 站点配置：主题色、导航结构、favicon
├── favicon.svg
│
├── index.mdx                        # 首页
├── quickstart.mdx
├── development.mdx
│
├── logo/                            # Logo 资源
│   ├── light.svg
│   ├── dark.svg
│   └── waffo-logo.svg
│
├── images/                          # 全局图片资源
│
├── products/                        # 产品文档（核心内容）
│   ├── acquiring/                   # 收单支付
│   │   ├── overview.mdx             # 产品概述
│   │   ├── one-time-payment.mdx     # 一次性支付
│   │   ├── subscription.mdx         # 订阅支付/自动扣款
│   │   ├── checkout.mdx             # 收银台
│   │   └── payment-methods.mdx      # 支付方式
│   ├── payout/                      # 代发 Payout
│   │   ├── overview.mdx
│   │   └── methods.mdx
│   ├── settlement/                  # 结算与资金管理
│   │   ├── merchant-settlement.mdx  # 商户结算
│   │   ├── fx.mdx                   # 外汇
│   │   └── tax.mdx                  # 全球税务 (MoR)
│   ├── risk/                        # 风控与合规
│   │   ├── security.mdx             # 安全保障
│   │   └── disputes.mdx             # 拒付与争议
│   └── value-added/                 # 增值服务
│       ├── data-analytics.mdx       # 全链路数据智能
│       ├── merchant-portal.mdx      # 商户 Portal
│       ├── tokenization.mdx         # Tokenization 凭证化
│       └── auth-capture.mdx         # Auth & Capture 预授权
│
├── solutions/                       # 解决方案
│   ├── industries/                  # 按行业
│   │   ├── digital-entertainment.mdx
│   │   ├── ecommerce.mdx
│   │   └── content-providers.mdx
│   └── integration/                 # 按集成方式
│       ├── quickstart.mdx
│       ├── checkout-integration.mdx
│       ├── api-integration.mdx
│       └── frontend-components.mdx
│
├── developer/                       # 开发者中心
│   ├── integration/                 # 集成指南
│   │   ├── quickstart.mdx
│   │   ├── checkout-integration.mdx
│   │   ├── api-integration.mdx
│   │   └── frontend-components.mdx
│   ├── api/                         # API 文档
│   │   ├── one-time-payment.mdx
│   │   ├── subscription.mdx
│   │   ├── payout.mdx
│   │   └── common.mdx               # 退款、查询、Webhook
│   └── tools/                       # 工具与资源
│       ├── overview.mdx
│       ├── testing.mdx
│       ├── error-codes.mdx
│       ├── status-codes.mdx
│       ├── postman.mdx
│       └── sdk.mdx
│
├── api-reference/                   # OpenAPI 自动生成的 API Reference
│   ├── openapi.json                 # ← 后端 CI 自动同步，勿手动编辑
│   └── introduction.mdx
│
├── pricing/
│   └── overview.mdx
│
├── support/
│   └── overview.mdx
│
├── snippets/                        # 可复用内容与自定义组件
│   ├── snippet-intro.mdx
│   └── components/                  # 自定义 JSX 组件库
│       ├── capability-card.jsx      # 功能亮点卡片 (CapabilityCard / CapabilityGrid)
│       ├── payment-method-panel.jsx # 支付方式面板 (PaymentMethodPanel)
│       ├── payment-logos-row.jsx    # 支付品牌 Logo 徽章行 (PaymentMethodsSection)
│       ├── integration-mode-table.jsx # 集成模式对比表 (IntegrationModeTable)
│       ├── billing-flow-stepper.jsx # 计费流程步骤器
│       └── business-model-card.jsx  # 商业模型卡片
│
├── docs-source/                     # 原生 Markdown 源文件（厂商无关）
│   └── products/                    # 对应 products/ 的原始 .md 文件
│       └── payin-overview.md        # ← 技术同学/产品在此处写文档
│
├── scripts/
│   ├── md-to-mintlify.js            # MD → MDX 转换脚本
│   └── translate-docs.js            # 中文文档 → 英文（AI 翻译）
│
├── .github/workflows/
│   ├── auto-translate.yml           # docs-source/*.md 变更时自动转换为 MDX
│   └── sync-openapi.yml             # 后端 OpenAPI 变更时自动同步到本仓库（放在后端仓库）
│
├── designUI/                        # 设计稿参考截图
├── ai-tools/                        # AI 工具集成指南 (Claude Code / Cursor / Windsurf)
│
├── DOCS-SYSTEM-DESIGN.md            # 文档系统整体设计方案（必读）
├── CONTRIBUTING.md                  # 贡献指南
└── AGENTS.md                        # AI Agent 工作指南
```

## 写文档的工作流

**约定：只写中文版，英文版由脚本自动生成。**

```
docs-source/（中文 .md 源文件）
      ↓  scripts/md-to-mintlify.js
  .mdx 文件（带 Mintlify 组件，Mintlify 渲染这里）
      ↓  scripts/translate-docs.js
docs-source-en/（英文 .md，再走一遍转换即可发布）
```

### 1. MD → MDX 转换（`scripts/md-to-mintlify.js`）

把 `docs-source/` 下的原生 Markdown 智能转换为带 Mintlify 组件的 `.mdx` 文件，输出到项目根目录。

**转换规则：**

| Markdown 写法 | 转成 Mintlify 组件 |
|---|---|
| `> [!NOTE]` / `> [!WARNING]` 等 | `<Note>` / `<Warning>` / `<Tip>` / `<Check>` |
| 数字列表 + 标题含"步骤/setup/how to" | `<Steps><Step>` |
| 无序列表 + 标题含"功能/features/能力" | `<CardGroup cols={2}><Card>` |
| 子标题在"FAQ/常见问题"下 | `<AccordionGroup><Accordion>` |
| 连续多个代码块 | `<CodeGroup>` |
| 单独一行的图片 `![](url)` | `<Frame>` |
| `<!-- tabs -->...<!-- tab: Name -->` | `<Tabs><Tab>` |
| 请求参数表格 | `<ParamField>` |
| 响应字段表格 | `<ResponseField>` |
| `<details><summary>` | `<Expandable>` |
| 无语言标签的代码块 | 补 `text` 标签 |
| 无 frontmatter | 从 H1 + 首段自动生成 |

**用法：**

```bash
# 转换整个 docs-source/ 目录（输出到项目根目录）
node scripts/md-to-mintlify.js docs-source/ .

# 转换单个文件
node scripts/md-to-mintlify.js docs-source/products/acquiring/overview.md products/acquiring/overview.mdx
```

---

### 2. 中文 → 英文 AI 翻译（`scripts/translate-docs.js`）

使用 AI 将 `docs-source/` 下的中文文档翻译成英文，输出到 `docs-source-en/`（已 gitignore）。

翻译时自动保留：MDX 组件标签、代码块、URL、frontmatter 键名、内联代码。只翻译可见文本内容。

**配置 API Key：**

复制 `.env.example` 为 `.env`，填入 key（`.env` 已 gitignore，不会提交）：

```bash
cp .env.example .env
# 然后编辑 .env，填入 OPENAI_API_KEY
```

**用法：**

```bash
# 翻译全部文档（docs-source/ → docs-source-en/）
node scripts/translate-docs.js

# 指定输入/输出目录
node scripts/translate-docs.js docs-source/ docs-source-en/

# 翻译单个文件
node scripts/translate-docs.js docs-source/products/acquiring/overview.md /tmp/overview-en.md

# 切换到 Anthropic Claude 翻译
node scripts/translate-docs.js --provider anthropic

# 强制重新翻译（忽略缓存）
node scripts/translate-docs.js --force

# 组合使用
node scripts/translate-docs.js docs-source/products/ out/ --provider anthropic --force
```

**缓存机制：** 脚本根据文件内容哈希 + 模型版本做缓存（`.translate-cache.json`），重复运行只翻译有改动的文件，节省 API 用量。

---

### GitHub Actions 自动触发

推送 `docs-source/` 下的 `.md` 文件时，CI 自动完成完整流水线：

```
push docs-source/*.md
        ↓
  [1/3] 中文 MD → 中文 MDX   (md-to-mintlify.js)
        ↓
  [2/3] 中文 MD → 英文 MD    (translate-docs.js)
        ↓
  [3/3] 英文 MD → 英文 MDX   (md-to-mintlify.js → en/)
        ↓
  自动 commit 所有生成文件
```

**配置 GitHub Secrets（一次性操作）：**

1. 打开仓库页面 → **Settings** → **Secrets and variables** → **Actions**
2. 点击 **New repository secret**，添加以下 secret：

| Secret 名称 | 值 | 说明 |
|---|---|---|
| `OPENAI_API_KEY` | 你的 OpenAI key | 必填，AI 翻译使用 |
| `ANTHROPIC_API_KEY` | 你的 Anthropic key | 选填，切换 provider 时使用 |

3. 保存后，下次 push `docs-source/` 即自动触发。

也可以在 GitHub Actions 页面手动触发，勾选"强制重新处理所有文件"可忽略缓存全量重跑。

---

## AI-assisted writing

Set up your AI coding tool to work with Mintlify:

```bash
npx skills add https://mintlify.com/docs
```

This command installs Mintlify's documentation skill for your configured AI tools like Claude Code, Cursor, Windsurf, and others. The skill includes component reference, writing standards, and workflow guidance.

See the [AI tools guides](/ai-tools) for tool-specific setup.

## Development

Install the [Mintlify CLI](https://www.npmjs.com/package/mint) to preview your documentation changes locally. To install, use the following command:

```
npm i -g mint
```

Run the following command at the root of your documentation, where your `docs.json` is located:

```
mint dev
```

View your local preview at `http://localhost:3000`.

## Publishing changes

Install our GitHub app from your [dashboard](https://dashboard.mintlify.com/settings/organization/github-app) to propagate changes from your repo to your deployment. Changes are deployed to production automatically after pushing to the default branch.

## Need help?

### Troubleshooting

- If your dev environment isn't running: Run `mint update` to ensure you have the most recent version of the CLI.
- If a page loads as a 404: Make sure you are running in a folder with a valid `docs.json`.

### Resources
- [Mintlify documentation](https://mintlify.com/docs)
