---
title: "全链路数据智能 | Data Intelligence"
description: "从单笔支付成功率优化到全生命周期价值提升的全视角数据诊断平台"
---

## 中文版

### 目标

- 建立对 Waffo 全链路数据智能的认知：从单笔支付的成功率优化到全生命周期的价值 (LTV) 提升
- 阐述如何通过多维度下钻和全渠道漏斗，统一分析银行卡与本地支付方式 (APMs) 的转化瓶颈
- 展示针对订阅业务的流失归因与智能挽回 (Recovery) 量化分析能力

### 一、产品介绍

在跨境支付中，数据不仅是报表，更是潜藏的利润。全球支付环境复杂多元：用户习惯因国家而异，支付方式包括银行卡、本地钱包、BNPL 等；银行规则、风控策略、网络稳定性千差万别。与国内高度统一的支付环境不同，跨境支付需深度分析"为什么失败"，而不仅是"是否成功"。

Waffo 数据智能中心打破了"一次性支付"与"订阅支付"、以及"银行卡"与"本地钱包"之间的数据孤岛，为商户提供多层级、全视角的诊断服务，将晦涩的银行代码转化为可执行的增长策略，帮助商户回答三个核心问题：

<CardGroup cols={3}>
  <Card title="现在的支付健康吗？" icon="heart-pulse">
    实时监控 Auth Rate、TPV 和转化率，异常秒级告警。
  </Card>
  <Card title="为什么会失败？" icon="magnifying-glass">
    多维度下钻到发卡行、地区、支付方式，精准定位失败根源。
  </Card>
  <Card title="如何挽回流失的客户？" icon="arrows-rotate">
    订阅流失归因分析与智能重试挽回收益量化。
  </Card>
</CardGroup>

---

### 二、全景监控与全渠道漏斗

Waffo 不仅监控支付结果，更监控用户支付行为的全过程，特别是针对复杂的混合支付场景。

#### 1. 实时健康度看板

- **秒级响应**：无论是黑色星期五大促还是日常运营，实时追踪 Auth Rate（授权成功率）、TPV 和 Conversion Rate 的微小波动。
- **智能预警**：当成功率出现异常跌落（如某地区成功率突降 20%），系统自动触发告警，帮助技术团队快速排查是网关故障还是银行系统维护。
- **问题归因**：通过数据看板（Failure Reason Trend）立即分析，精准归因于网关问题或银行维护，驱动团队快速修复，降低业务影响。

#### 2. 全渠道转化漏斗

针对银行卡（Direct）与电子钱包/BNPL（Redirect）截然不同的支付逻辑，提供统一的漏斗视图：

- **完整步骤追踪**：从"商户发起调用收银台"开始，全程监测（End-to-End Monitoring）：
  - 收银台曝光 → 选择支付方式 → 信息录入 → 点击支付 → 成功订单
  - 每一个环节均有明确指标，帮助还原用户从进入、选择、操作到完成的真实路径。

- **流失诊断**：数据能明确告诉您用户流失是由于未能成功进入收银台（技术问题），还是在选择支付方式或填写信息阶段放弃（体验或意愿问题），从而指导针对性优化。

---

### 三、深度下钻与智能归因

当发现成功率未达预期时，Waffo 提供强大的分析工具来定位"病灶"。

#### 1. 多维度下钻分析

- **地区与银行 (Geo & Issuer)**：精准分析到具体的发卡行（BIN）。
  - 场景：发现整体成功率正常，但"巴西某银行"失败率高达 40%？提示您针对该银行优化路由或分期策略。
- **支付方式对比**：横向对比 Credit Card 与 Local Wallets 的表现。数据可能显示，在特定国家将"Apple Pay"置顶能带来更高的 GMV。

#### 2. 智能拒绝码映射 (Smart Code Mapping)

银行拒绝码（如 `Do Not Honor`、`Insufficient Funds`）晦涩难懂，不同银行的相同拒绝码含义可能完全不同。

Waffo 智能拒绝码映射将原始拒绝码翻译为**可执行策略**：

| 拒绝码类型 | 根因分类 | 建议策略 |
|-----------|---------|---------|
| `Do Not Honor` | 发卡行风控 | 建议用户联系发卡行或使用其他卡 |
| `Insufficient Funds` | 资金不足 | 触发分期付款或降级套餐建议 |
| `Invalid Card` | 卡片信息错误 | 引导用户重新录入或更换支付方式 |
| `Expired Card` | 卡片过期 | 触发 Account Updater 自动更新 |

---

### 四、订阅与续费健康度

专为订阅制业务打造的留存与挽回分析模块。

#### 1. 流失归因分析

将订阅流失精准拆分为两类：

- **主动流失（Voluntary Churn）**：用户主动取消订阅，需通过产品与服务优化解决。
- **被动流失（Involuntary Churn）**：因支付失败（余额不足、卡片过期等）导致的非自愿流失，可通过技术手段挽回。

#### 2. 挽回绩效量化 (Recovery Performance)

将"智能重试"的价值量化展示：

- **挽回金额**：本月通过智能重试策略成功挽回的订阅收入
- **挽回率趋势**：重试策略优化前后的对比数据
- **最佳重试窗口**：基于大数据分析的最佳扣款时间分布

#### 3. 同期群分析 (Cohort Analysis)

按订阅起始月分组，分析不同获客渠道、套餐类型的留存曲线，帮助商户识别：
- 哪个渠道获取的用户 LTV 最高
- 哪个套餐的续费率最稳定
- 不同市场的留存差异与优化空间

---

### 五、常见问题 (FAQ)

**Q: 数据更新频率是多少？**

A: 实时监控看板数据秒级更新；分析报表（漏斗分析、下钻分析）数据每小时更新一次；订阅健康度数据每日更新。

**Q: 是否支持自定义时间范围和维度？**

A: 支持自定义时间范围（最长回溯 13 个月）、多维度组合筛选（支付方式 × 地区 × 货币），以及自定义指标看板。

**Q: 数据如何导出？**

A: 支持 CSV/Excel 导出所有报表数据，可通过 API 将数据推送至商户的 BI 系统（如 Tableau、Looker）。

---

## English Version

### 1. Product Introduction

In cross-border payments, data is not just reporting — it's hidden profit. The global payment environment is complex: user habits vary by country, payment methods include cards, local wallets, and BNPL; bank rules, risk controls, and network stability vary widely.

Waffo's Data Intelligence Center breaks down data silos between one-time and subscription payments, and between card and wallet payments. We provide multi-level, full-perspective diagnostic services that translate cryptic bank codes into actionable growth strategies, helping merchants answer three core questions:

<CardGroup cols={3}>
  <Card title="Is payment healthy now?" icon="heart-pulse">
    Real-time monitoring of Auth Rate, TPV, and conversion rates with second-level anomaly alerts.
  </Card>
  <Card title="Why did it fail?" icon="magnifying-glass">
    Drill down to issuer, region, and payment method to pinpoint failure root causes.
  </Card>
  <Card title="How to recover lost customers?" icon="arrows-rotate">
    Subscription churn attribution analysis and smart retry recovery revenue quantification.
  </Card>
</CardGroup>

---

### 2. Monitoring & Omnichannel Funnel

Waffo monitors not just payment outcomes but the full user payment journey, especially in complex mixed-payment scenarios.

#### 2.1 Real-Time Health Dashboard

- **Second-level Response**: Real-time tracking of Auth Rate, TPV, and Conversion Rate fluctuations whether during Black Friday promotions or daily operations.
- **Smart Alerts**: When success rates drop abnormally (e.g., a 20% sudden drop in a region), the system automatically triggers alerts to help technical teams quickly identify gateway failures vs. bank maintenance.
- **Issue Attribution**: Immediately analyze via Failure Reason Trend dashboard, precisely attributing failures to gateway issues or bank maintenance, driving rapid resolution.

#### 2.2 Omnichannel Conversion Funnel

Provides a unified funnel view for the fundamentally different payment logic of card (Direct) vs. e-wallet/BNPL (Redirect):

- **Complete Step Tracking**: From "merchant initiates checkout" through end-to-end monitoring:
  - Checkout exposure → Payment method selection → Data entry → Click pay → Successful order
  - Each step has clear metrics to reveal the real user journey.

- **Drop-off Diagnosis**: Data clearly identifies whether user drop-off is due to checkout entry failure (technical issue) or abandonment during method selection or data entry (UX or intent issue).

---

### 3. Drill-down & Smart Attribution

When success rates fall short of expectations, Waffo provides powerful analysis tools to locate the "root cause."

#### 3.1 Multi-Dimensional Drill-Down

- **Geo & Issuer Analysis**: Drill down to specific issuing banks (BIN level).
  - Example: Overall success rate looks fine, but a specific Brazilian bank has a 40% failure rate? System prompts you to optimize routing or installment strategies for that bank.
- **Payment Method Comparison**: Compare Credit Card vs. Local Wallet performance side by side. Data may show that placing Apple Pay at the top in a specific country can significantly increase GMV.

#### 3.2 Smart Code Mapping

Bank decline codes (like `Do Not Honor`, `Insufficient Funds`) are cryptic, and the same code can mean completely different things at different banks.

Waffo's Smart Code Mapping translates raw decline codes into **actionable strategies**:

| Decline Code Type | Root Cause | Recommended Strategy |
|------------------|-----------|---------------------|
| `Do Not Honor` | Issuer risk control | Guide user to contact issuer or use alternative card |
| `Insufficient Funds` | Insufficient balance | Trigger installment option or plan downgrade suggestion |
| `Invalid Card` | Card info error | Guide user to re-enter or switch payment method |
| `Expired Card` | Card expired | Trigger Account Updater for automatic card update |

---

### 4. Subscription & Retention Health

Retention and recovery analysis module built specifically for subscription businesses.

#### 4.1 Churn Attribution Analysis

Precisely splits subscription churn into two categories:

- **Voluntary Churn**: Users actively cancel subscriptions — requires product and service improvements.
- **Involuntary Churn**: Payment failure-caused churn (insufficient funds, expired cards, etc.) — recoverable through technical means.

#### 4.2 Recovery Performance Quantification

Quantifies the value of "smart retry" strategies:

- **Recovered Revenue**: Monthly subscription revenue recovered through smart retry strategies
- **Recovery Rate Trends**: Before/after comparison data for retry strategy optimizations
- **Optimal Retry Window**: Best billing time distribution based on big data analysis

#### 4.3 Cohort Analysis

Group by subscription start month to analyze retention curves by acquisition channel and plan type, helping merchants identify:
- Which channels acquire users with the highest LTV
- Which plans have the most stable renewal rates
- Retention differences across markets and optimization opportunities

---

### 5. FAQ (Frequently Asked Questions)

**Q: How frequently is data updated?**

A: Real-time monitoring dashboard data updates at second-level intervals; analytical reports (funnel analysis, drill-down analysis) update hourly; subscription health data updates daily.

**Q: Are custom time ranges and dimensions supported?**

A: Yes — custom time ranges (up to 13 months lookback), multi-dimensional combined filtering (payment method × region × currency), and custom metric dashboards are all supported.

**Q: How can I export data?**

A: All report data supports CSV/Excel export. Data can also be pushed to merchant BI systems (Tableau, Looker, etc.) via API.
