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
│   └── md-to-mintlify.js            # MD → MDX 转换脚本
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
