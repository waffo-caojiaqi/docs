# Waffo 文档系统设计方案

> 本文档记录 Waffo 文档系统的完整技术方案，覆盖自定义组件、多人协作、OpenAPI 自动同步、文件上传、迁移风险规避和全流程闭环六个核心议题。

---

## 目录

1. [整体架构](#1-整体架构)
2. [自定义组件开发](#2-自定义组件开发)
3. [多人协作写文档](#3-多人协作写文档)
4. [OpenAPI 自动同步](#4-openapi-自动同步)
5. [文件上传到 Mintlify](#5-文件上传到-mintlify)
6. [原生 MD 中转层](#6-原生-md-中转层)
7. [全流程闭环](#7-全流程闭环)
8. [其他注意事项](#8-其他注意事项)

---

## 1. 整体架构

```
┌─────────────────┐    ┌─────────────────┐    ┌──────────────────┐
│  后端 API 仓库    │    │  产品 / 技术同学  │    │  UI 设计师        │
│  openapi.yaml   │    │  docs-source/   │    │  出设计稿         │
│  改动触发 CI      │    │  native .md     │    │                  │
└────────┬────────┘    └────────┬────────┘    └─────────┬────────┘
         │                      │                        │
         │ sync-openapi.yml     │ auto-translate.yml     │ 告知 Claude Code
         ▼                      ▼                        ▼
┌───────────────────────────────────────────────────────────────┐
│                  waffo-docs Git 仓库                           │
│                                                               │
│  docs.json                  ← 站点配置与导航                    │
│  api-reference/openapi.yaml ← 后端自动同步                     │
│  products/*.mdx             ← 产品文档（自动翻译 or 手写）       │
│  snippets/components/*.jsx  ← 自定义组件库                     │
│  docs-source/*.md           ← 原生 MD 源文件                   │
└───────────────────────────────┬───────────────────────────────┘
                                │  Mintlify 监听 main 分支，自动部署
                                ▼
                         docs.waffo.com
```

**核心设计原则**

- `docs-source/` 存原生 MD，永远是 **Source of Truth**，避免厂商锁定
- Mintlify 渲染所需的 MDX 由脚本自动生成，人不手写 Mintlify 专有语法
- 组件库集中在 `snippets/components/`，统一维护，所有人复用
- 后端 OpenAPI 变更通过 CI 无感同步，无需文档侧手动操作

---

## 2. 自定义组件开发

### 2.1 Mintlify 组件机制

Mintlify 支持两类组件：

| 类型 | 来源 | 适用场景 |
|------|------|----------|
| **内置组件** | Mintlify 提供，无需 import | `<Note>` `<Steps>` `<Card>` 等通用 UI |
| **自定义组件** | `snippets/components/*.jsx`，需 import | 复杂、品牌化的设计系统组件 |

**选用原则**：能用内置就用内置；设计稿中有特定样式要求时用自定义。

### 2.2 从设计稿拆解组件

以 `Subscription & Recurring` 页面为例，从设计稿拆解出 4 个可复用组件：

#### CapabilityCard — 功能亮点卡片

**设计稿特征**：图标框（浅蓝背景）+ 标题 + 描述，2 列网格排列。

```
snippets/components/capability-card.jsx
  exports: CapabilityCard, CapabilityGrid
```

**用法**：

```mdx
import { CapabilityCard, CapabilityGrid } from '/snippets/components/capability-card.jsx'

<CapabilityGrid>
  <CapabilityCard
    icon="🗓"
    title="Flexible Billing Cycles"
    description="Supports weekly, monthly, quarterly, yearly and custom intervals."
  />
  <CapabilityCard
    icon="⚙️"
    title="Smart Retry Mechanism"
    description="Built-in retry strategies that optimize success rates."
  />
</CapabilityGrid>
```

#### PaymentMethodPanel — 支付方式卡

**设计稿特征**：顶部标题 + 支付网络 Logo 标签，下方为带 ✓ 的特性 checklist，支持宽版和窄版。

```
snippets/components/payment-method-panel.jsx
  exports: PaymentMethodPanel, PaymentMethodGrid
```

**用法**：

```mdx
import { PaymentMethodPanel, PaymentMethodGrid } from '/snippets/components/payment-method-panel.jsx'

<PaymentMethodPanel
  title="Bank Cards (Credit/Debit Cards)"
  logos={["JCB", "Visa", "Mastercard"]}
  features={[
    { title: "Tokenization Security", description: "Token created on first payment..." },
    { title: "3DS Smart Verification", description: "Mandatory 3DS for initial signing..." },
  ]}
/>

<PaymentMethodGrid>
  <PaymentMethodPanel title="Digital Wallets" logos={["Apple Pay", "Google Pay"]} features={[...]} />
  <PaymentMethodPanel title="Local Payment Methods" logos={["PayPay", "ZaloPay"]} features={[...]} />
</PaymentMethodGrid>
```

#### BusinessModelCard — A/B 商业模式对比卡

**设计稿特征**：圆形字母标签 (A/B) + 标题 + Tagline + Mechanism + Best For 两个分段。

```
snippets/components/business-model-card.jsx
  exports: BusinessModelCard, BusinessModelGrid
```

**用法**：

```mdx
import { BusinessModelCard, BusinessModelGrid } from '/snippets/components/business-model-card.jsx'

<BusinessModelGrid>
  <BusinessModelCard
    label="A"
    title="Service-First"
    tagline="Prioritize service continuity; tolerate payment latency."
    mechanism="Service continues even if deduction fails..."
    bestFor="Video streaming, SaaS software..."
  />
  <BusinessModelCard
    label="B"
    title="Payment-First"
    tagline="Strictly pay before service; zero tolerance for arrears."
    mechanism="Service suspends immediately on failure..."
    bestFor="Physical goods, game items..."
  />
</BusinessModelGrid>
```

#### BillingFlowStepper — 流程步骤图

**设计稿特征**：横向时间线（圆点 + 连接线 + 步骤文字），下方可选告警框（红色背景）。

```
snippets/components/billing-flow-stepper.jsx
  exports: BillingFlowStepper
```

**用法**：

```mdx
import { BillingFlowStepper } from '/snippets/components/billing-flow-stepper.jsx'

<BillingFlowStepper
  title="Billing Flow"
  steps={[
    "Expiry Detection",
    "Generate MIT Order",
    "Initiate Deduction",
    "Success / Failure Retry",
  ]}
  alert={{
    title: "Failure Handling",
    lines: [
      "Default strategy retries 24 hours after failure, and again 48 hours later.",
      "Supports automatic failure notification emails.",
    ],
  }}
/>
```

### 2.3 组件设计规范（Design Tokens）

所有自定义组件使用 inline styles，遵守以下设计 token：

| Token | 值 | 用途 |
|-------|-----|------|
| Text primary | `#1e293b` | 标题、主文字 |
| Text secondary | `#64748b` | 描述、次要文字 |
| Border | `#e2e8f0` | 卡片边框 |
| Card background | `#ffffff` | 卡片底色 |
| Subtle background | `#fafafa` | checklist item 底色 |
| Check green | `#16a34a` | ✓ 图标颜色 |
| Icon bg | `#eff6ff` | 功能图标背景框 |
| Label circle | `#1e293b` | A/B 圆形标签 |
| Step dot active | `#1e3a8a` | 流程图当前步骤 |
| Step dot inactive | `#cbd5e1` | 流程图其他步骤 |
| Alert border | `#fca5a5` | 告警框边框 |
| Alert background | `#fff5f5` | 告警框背景 |

> 使用 inline styles 而非 Tailwind 的原因：Mintlify 的 snippet 上下文不保证 Tailwind 可用，inline styles 在任何环境下都稳定工作。

### 2.4 新增组件流程

1. 在 `snippets/components/` 创建 `<component-name>.jsx`
2. 顶部写 JSDoc 注释，包含 Props 说明和完整用法示例
3. 同时导出组件本身和 Grid/Wrapper 变体（方便多列排版）
4. 在 `essentials/custom-components.mdx` 补充展示和代码示例
5. 提 PR，Review 后合入 main（组件变更影响所有引用页面，需要 Review）

### 2.5 AI 快速开发组件

团队使用 Claude Code + `waffo-docs` skill：

```
用户：这是 Payin 方式选择页的设计稿 [截图]，帮我做成组件
```

Claude Code 会：
1. 分析设计稿，识别 props 接口
2. 使用上述 Design Tokens 编写组件
3. 输出 JSDoc 注释 + 组件代码 + MDX 用法示例
4. 自动放到 `snippets/components/` 正确位置

---

## 3. 多人协作写文档

### 3.1 角色分工

| 角色 | 写什么 | 在哪里写 | 需要了解的技术 |
|------|--------|----------|--------------|
| 产品经理 / 运营 | 产品介绍、FAQ、流程说明 | `docs-source/` 写原生 `.md` | 只需会 Markdown |
| 技术同学 | 集成指南、API 说明、代码示例 | 直接写 `.mdx` 或写 `.md` 都可以 | Markdown + 少量 MDX |
| UI 设计师 | 不写文字，提供设计稿 | — | 无 |
| 前端同学 | 自定义组件开发 | `snippets/components/` | JSX + inline styles |

### 3.2 产品 / 运营同学的工作流

他们只需要懂标准 Markdown：

```
1. 在 docs-source/products/ 目录创建 my-page.md
2. 用标准 Markdown 写内容
3. 需要提示框时用 GitHub 标准语法：
     > [!NOTE]  内容
     > [!WARNING]  内容
4. git push 到 main 分支
5. CI 自动翻译成 MDX，Mintlify 自动部署
```

整个过程不需要了解任何 Mintlify 专有语法。

### 3.3 技术同学的工作流

可以直接写 `.mdx`，使用自定义组件：

```
1. 在对应目录创建 .mdx 文件
2. 在顶部写 frontmatter（title + description）
3. import 需要的自定义组件
4. 参考 essentials/custom-components.mdx 的示例
5. git push → Mintlify 自动部署
```

### 3.4 组件画廊

`essentials/custom-components.mdx` 是组件使用手册，每个组件都有：
- Props 说明表格
- 完整代码示例（可复制）
- Live Preview（Mintlify 直接渲染）

所有同学写文档前看一眼这个页面，就知道有哪些组件可用。

### 3.5 Claude Code Skill 加速

团队成员安装 `waffo-docs` skill（已放在 `~/.claude/skills/waffo-docs/`）后，可以用自然语言写文档：

```
写一个 Payout 产品页，结构参考 Subscription & Recurring 页面
把这张设计稿里的支付方式选择器做成组件
把 docs-source/payin.md 翻译成 MDX 格式
```

Claude Code 会自动使用正确的组件、遵守命名规范、更新 docs.json 导航。

---

## 4. OpenAPI 自动同步

### 4.1 方案原理

```
后端仓库
  ↓ push 到 main，且 openapi.yaml 有变更
  ↓ 触发 .github/workflows/sync-openapi.yml
  ↓ 用 PAT token checkout docs 仓库
  ↓ cp openapi.yaml → api-reference/openapi.yaml
  ↓ git commit & push 到 docs 仓库
  ↓ Mintlify 检测到 docs 仓库变更，自动 redeploy
```

整个流程无需人工干预，延迟约 2-3 分钟。

### 4.2 一次性配置步骤

**Step 1：生成 GitHub PAT**
- 访问 GitHub → Settings → Developer settings → Personal access tokens
- 选择 Fine-grained tokens，给 `waffo-docs` 仓库的 `Contents: Read and write` 权限

**Step 2：在后端仓库添加 Secret**
- 后端仓库 → Settings → Secrets and variables → Actions
- 新建 secret，名称 `DOCS_REPO_TOKEN`，值为上面的 PAT

**Step 3：复制 workflow 文件**
将 `.github/workflows/sync-openapi.yml` 复制到后端仓库，修改两处：

```yaml
env:
  DOCS_REPO: "waffo-org/waffo-docs"      # ← 改成实际 docs 仓库名
  SPEC_PATH: "openapi.yaml"               # ← 改成后端实际 spec 路径
```

**Step 4：配置 docs.json**

```json
{
  "openapi": ["api-reference/openapi.yaml"]
}
```

### 4.3 多服务多 spec 的情况

Waffo 有多个后端微服务，每个服务单独维护 spec：

```json
{
  "openapi": [
    "api-reference/payin.yaml",
    "api-reference/payout.yaml",
    "api-reference/settlement.yaml"
  ]
}
```

每个后端仓库部署独立的 `sync-openapi.yml`，指向不同的目标文件路径即可。

### 4.4 选择性触发

workflow 只在 spec 文件变更时触发，避免无效推送：

```yaml
on:
  push:
    branches: [main]
    paths:
      - "openapi.yaml"
      - "api-spec/**"
```

---

## 5. 文件上传到 Mintlify

Mintlify 本质是 **Git-driven**，"上传文档"就是"推代码到 Git 仓库"。

### 5.1 方式对比

| 方式 | 适用场景 | 操作复杂度 |
|------|----------|------------|
| `git push` 到 docs 仓库 | 开发者，有 Git 权限 | 最简单 |
| 推送到 `docs-source/`，CI 自动翻译 | 产品/运营，写原生 MD | 简单（只需会 Git） |
| GitHub API 写文件 | 自动化管道、AI 批量生成 | 需要编程 |
| Mintlify CLI `mint deploy` | 本地一次性发布 | 中等 |

### 5.2 AI 生成文档的上传方式

AI（如 Claude）生成的 `.md` 文件，推荐走 `docs-source/` 路径：

```
AI 输出 → 保存为 docs-source/xxx.md → git push → CI 翻译 → 发布
```

也可以直接通过 GitHub API 创建文件：

```bash
# 用 GitHub CLI 上传文件
gh api repos/waffo-org/waffo-docs/contents/docs-source/new-page.md \
  --method PUT \
  --field message="docs: add new page" \
  --field content="$(base64 -i new-page.md)"
```

### 5.3 本地存储的 MD 文件

本地文档通过以下脚本批量转换并推送：

```bash
# 批量翻译 docs-source/ 整个目录
node scripts/md-to-mintlify.js docs-source/ .

# 推送
git add .
git commit -m "docs: sync local changes"
git push
```

---

## 6. 原生 MD 中转层

### 6.1 问题背景

Mintlify 有大量专有 MDX 语法（`<Note>`、`<CardGroup>`、frontmatter 字段等），如果文档全用这些语法：
- 迁移到其他平台时需要全部重写
- 非技术同学上手门槛高
- AI 生成的 Markdown 默认不符合 Mintlify 规范

### 6.2 解决方案：两层分离

```
docs-source/        ← 原生 Markdown（标准语法，无平台依赖）
      ↓
scripts/md-to-mintlify.js  ← 转换脚本
      ↓
products/*.mdx      ← Mintlify MDX（仅作为展示层，可重新生成）
```

**迁移时**：替换转换脚本目标格式（如 Docusaurus、Nextra），重新生成所有 MDX，`docs-source/` 不动。

### 6.3 转换规则

| 原生 Markdown | Mintlify MDX | 说明 |
|--------------|--------------|------|
| `> [!NOTE] 内容` | `<Note>内容</Note>` | GitHub Flavored Markdown callout |
| `> [!TIP] 内容` | `<Tip>内容</Tip>` | |
| `> [!WARNING] 内容` | `<Warning>内容</Warning>` | |
| `> [!IMPORTANT] 内容` | `<Info>内容</Info>` | |
| `> [!CAUTION] 内容` | `<Warning>内容</Warning>` | |
| 无 frontmatter | 自动提取 H1 → `title`，首段 → `description` | |
| 裸代码块 ` ``` ` | ` ```text ` | 补语言标签，Mintlify 要求 |
| 标准表格 / 链接 / 图片 | 原样保留 | 两者都支持标准 Markdown |

### 6.4 转换脚本使用

```bash
# 单文件转换
node scripts/md-to-mintlify.js docs-source/products/payin.md products/payin.mdx

# 整个目录批量转换
node scripts/md-to-mintlify.js docs-source/ .

# 查看帮助
node scripts/md-to-mintlify.js
```

### 6.5 中转层以什么形式存在

中转层有三种触发方式，覆盖不同场景：

**① GitHub Action（推荐，面向团队日常）**

文件：`.github/workflows/auto-translate.yml`

```
触发：push 到 main，且 docs-source/**/*.md 有变更
动作：自动运行 md-to-mintlify.js，commit 翻译结果
```

产品/运营同学推 `.md` 文件后，什么都不用做，5 分钟内文档网站自动更新。

**② 本地 CLI（面向开发者，调试用）**

```bash
node scripts/md-to-mintlify.js docs-source/my-page.md products/my-page.mdx
```

**③ Claude Code Skill（面向 AI 辅助写作）**

团队成员安装 `waffo-docs` skill 后，Claude 知道整套翻译规则：

```
用户：把这个 MD 文件翻译成 Mintlify 格式
```

Claude 会直接调用脚本或按规则手动转换，并更新 docs.json 导航。

### 6.6 Mintlify 独有能力的处理

对于自定义组件（`CapabilityCard` 等），原生 MD 无法表达。处理方式：

1. **产品/运营**：在 MD 中写注释标记 `<!-- component: capability-grid -->`，CI 脚本识别后替换为对应的 MDX 组件代码（可扩展 md-to-mintlify.js 支持）
2. **技术同学**：直接写 `.mdx` 使用组件，跳过翻译层
3. **AI 生成**：给 Claude Code 提供设计稿 + `waffo-docs` skill，直接输出完整 MDX

---

## 7. 全流程闭环

### 7.1 日常写文档流程

```
产品同学
  1. 克隆 docs 仓库（一次性）
  2. 在 docs-source/products/ 新建 .md 文件
  3. 用标准 Markdown 写内容（callout 用 > [!NOTE] 语法）
  4. git push origin main
  5. 等待约 3 分钟，docs.waffo.com 自动更新
```

```
技术同学
  1. 在对应目录新建 .mdx 文件
  2. 写 frontmatter + 内容 + 自定义组件
  3. 在 docs.json 加入导航
  4. git push → 自动部署
```

### 7.2 后端 API 变更流程

```
后端同学
  1. 修改后端代码，更新 openapi.yaml
  2. push 到后端仓库 main 分支
  3. CI 自动同步到 docs 仓库
  4. 无需任何手动操作，文档自动更新
```

### 7.3 UI 出新组件设计稿流程

```
UI 设计师
  1. 出设计稿（截图 or Figma 链接）

技术同学 / AI
  2. 打开 Claude Code（安装 waffo-docs skill）
  3. 说：「这是设计稿，帮我在 snippets/components/ 做成组件」
  4. Claude 分析设计 → 提取 props 接口 → 按 Design Tokens 编写 → 输出代码
  5. Review 后合并到 main
  6. 在 essentials/custom-components.mdx 补充说明
```

### 7.4 文档迁移流程（未来）

```
决定迁离 Mintlify
  1. docs-source/ 里的原生 .md 文件无需修改（这是 Source of Truth）
  2. 修改 scripts/md-to-mintlify.js，把输出改为目标平台语法
     （如 Docusaurus 的 admonitions、Nextra 的 callout 等）
  3. 重新运行批量转换：node scripts/md-to-mintlify.js docs-source/ new-docs/
  4. 完成迁移，自定义组件需要按新平台重写（但数量可控）
```

### 7.5 项目目录结构说明

```
waffo-docs/
│
├── docs.json                    # Mintlify 站点配置（导航、主题、OpenAPI）
├── docs-source/                 # 原生 MD 源文件（Source of Truth）
│   └── products/
│       └── payin-overview.md    # 示例：产品同学写的原生文档
│
├── products/                    # 自动翻译后的 MDX 产品页
│   └── subscription-recurring.mdx   # 示例：还原设计稿的 Demo 页
│
├── api-reference/
│   └── openapi.yaml             # 后端自动同步的 OpenAPI spec
│
├── snippets/
│   └── components/              # 自定义 React 组件库
│       ├── capability-card.jsx
│       ├── payment-method-panel.jsx
│       ├── business-model-card.jsx
│       └── billing-flow-stepper.jsx
│
├── essentials/
│   └── custom-components.mdx    # 组件使用手册（含 live preview）
│
├── scripts/
│   └── md-to-mintlify.js        # MD → MDX 转换脚本（Node.js）
│
└── .github/workflows/
    ├── sync-openapi.yml          # 模板：放在后端仓库，同步 spec
    └── auto-translate.yml        # 监听 docs-source 变更，自动翻译
```

---

## 8. 其他注意事项

### 8.1 Mintlify 初始接入（一次性）

1. 注册 Mintlify 账号，在 Dashboard 连接 GitHub 仓库
2. 设置自动部署分支为 `main`
3. 配置自定义域名 `docs.waffo.com`（在 Dashboard + DNS CNAME 记录）

以上步骤只做一次，之后全自动。

### 8.2 图片资源管理

- 所有图片放 `images/` 目录，MDX 中用 `/images/xxx.png` 引用
- 原生 MD 中如果引用了远程 CDN 图片，用 `md-image-localizer` skill 批量下载到本地：

```
用户：把 docs-source/payin.md 里的远程图片下载到本地
```

### 8.3 多服务多 OpenAPI Spec

不同后端服务的 spec 分开管理：

```json
// docs.json
{
  "openapi": [
    "api-reference/payin.yaml",
    "api-reference/payout.yaml",
    "api-reference/settlement.yaml"
  ]
}
```

每个后端仓库单独部署 `sync-openapi.yml`，指向对应的目标文件。

### 8.4 文档访问权限

| 场景 | 方案 |
|------|------|
| 公开文档 | 默认，无需配置 |
| 内测 / 仅商户可见 | Mintlify Dashboard → Password protection |
| 员工内部文档 | Mintlify Dashboard → SSO（支持 Google Workspace）|

### 8.5 多语言文档

如果未来需要中英双语：

```json
// docs.json
{
  "navigation": {
    "languages": [
      { "language": "en", "name": "English" },
      { "language": "zh", "name": "中文" }
    ]
  }
}
```

中英文共用同一套自定义组件库，只有文字内容不同。

### 8.6 文档版本管理

API 有重大版本升级时（v1 → v2）：

```json
// docs.json
{
  "navigation": {
    "versions": [
      { "version": "v2", "default": true },
      { "version": "v1" }
    ]
  }
}
```

### 8.7 组件库维护规范

- `snippets/components/` 的变更必须经过 PR Review（一个组件改动影响所有引用页面）
- 每个组件文件顶部必须有 JSDoc 注释，包含 Props 说明和使用示例
- 删除或重命名组件前，先全局搜索引用（`grep -r "component-name" . --include="*.mdx"`）

### 8.8 本地预览

```bash
# 安装 Mintlify CLI
npm i -g @mintlify/cli

# 本地预览
mint dev

# 检查坏链
mint broken-links

# 验证构建
mint validate
```

### 8.9 可能需要补充的内容

以下是目前方案暂未覆盖、但后续可能需要处理的事项：

- **Webhook 事件文档**：可在 `docs.json` 中加 `webhooks` 字段，Mintlify 支持 OpenAPI Webhook 规范
- **SDK 代码示例**：Mintlify 支持多语言 Code Group，各语言 SDK 示例可共用同一个页面展示
- **Changelog 页面**：可以用原生 MD 写 CHANGELOG，经翻译层生成 MDX，保持格式一致
- **文档搜索优化**：每篇 MDX 的 `description` + `keywords` frontmatter 直接影响站内搜索，翻译脚本已自动提取，但技术文档需要人工补充关键词
- **CI 失败告警**：建议在 `sync-openapi.yml` 和 `auto-translate.yml` 中加 Slack 通知，方便及时发现同步失败

---

*文档由 Claude Code 生成，最后更新：2026-03-17*
