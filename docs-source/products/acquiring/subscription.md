---
title: "订阅支付 | Subscription Payment"
description: "为周期性计费场景提供自动化、高成功率的扣款解决方案"
---

## 中文版

### 产品介绍

#### 1. 产品概览 (Overview)

为周期性计费场景提供自动化、高成功率的扣款解决方案。通过一次授权、多次自动扣款的机制，支持灵活的计费周期配置与智能重试，帮助商户实现订阅收入的持续增长并优化用户体验。

#### 2. 什么是订阅支付？

订阅支付（Subscription Payment），也称为自动扣款或周期性扣款。是指用户在首次支付时完成签约授权，后续由系统根据约定的周期（如周/月/年）自动发起扣款的支付模式。它通过将"支付行为"自动化，极大地降低了用户的续费操作成本，是 SaaS 服务、流媒体会员及内容付费业务的核心基础设施。

#### 3. 核心能力

1. **灵活计费周期**：支持周、月、季度、年度等标准周期，亦支持自定义天数步长，满足多样化业务需求。
2. **智能重试机制**：内置可配置的重试策略（如 24h/48h 间隔），并通过详细的失败码分析优化扣款成功率。
3. **全生命周期管理**：提供从订阅创建、试用期（0元/折扣）、自动扣款、升降级到取消的完整管理能力。
4. **账户自动更新**：集成 VAU/ABU 服务，当用户卡片过期或换卡时，自动更新卡信息以维持订阅连续性。

#### 4. 适用场景

- **流媒体服务**：视频、音乐平台的月度/年度会员自动续费。
- **SaaS 软件服务**：办公软件、设计工具的周期性订阅计费。
- **内容付费**：知识付费专栏、在线课程的会员服务。
- **游戏订阅**：游戏月卡、季卡及道具的自动续费。

---

### 支持的支付方式

通过 Waffo，您可以接入支持"保存支付方式"及"商户发起交易（MIT）"的主流渠道。

#### a. 银行卡支付 (Credit/Debit Cards)

- **支持卡种**：Visa、Mastercard、JCB 等全球主流卡组织。
- **核心特性**：
  - **Token 化安全**：首次支付创建 Token，后续扣款使用 MIT（Merchant Initiated Transaction）模式，无需再次输入 CVV。
  - **账户自动更新（VAU/ABU）**：卡片到期或换卡后自动同步，降低被动流失。

#### b. 数字钱包 (Digital Wallets)

- 支持 Apple Pay、Google Pay 等主流钱包的 Token 授权管理。
- 用户完成首次钱包授权后，后续订阅周期自动扣款无需用户介入。

#### c. 本地支付方式 (Local Payments)

- 部分本地支付方式（如东南亚的银行直扣）支持订阅模式。
- 具体可用性请咨询您的 Waffo 客户成功经理。

---

### 订阅模式与体验

#### 1. 核心业务模型

Waffo 支持两种主流订阅模式：

<CardGroup cols={2}>
  <Card title="服务优先（Service-First）" icon="play">
    先激活服务，再完成首次支付。适合试用期体验或低门槛获客场景。例如："免费试用7天，到期自动续费"。
  </Card>
  <Card title="支付优先（Payment-First）" icon="credit-card">
    先完成首次支付，再激活服务。适合标准订阅产品，确保支付成功后才开通权益。
  </Card>
</CardGroup>

#### 2. 试用与促销配置

- **免费试用期**：支持配置 N 天免费试用，试用结束后自动转为付费订阅。
- **首期折扣**：可设置首月/首年特惠价格，到期后恢复标准价。
- **优惠券集成**：支持通过 API 绑定优惠券码，动态调整订阅金额。

#### 3. 扣款与重试体验

<Steps>
  <Step title="到期触发扣款">系统在订阅周期到期前自动发起 MIT 扣款请求。</Step>
  <Step title="首次扣款">向绑定的支付方式发送扣款请求，实时获取结果。</Step>
  <Step title="失败智能重试">若扣款失败，根据失败原因（余额不足/卡片问题等）按配置策略自动重试（默认 24h/48h/72h）。</Step>
  <Step title="用户通知">通过邮件/消息通知用户扣款结果，引导主动更新支付方式。</Step>
  <Step title="处理流失">超过最大重试次数后，标记订阅为"待支付"状态，触发被动流失挽回流程。</Step>
</Steps>

---

### 开发与集成

#### 1. 收银台集成 (Hosted Checkout)

无需开发前端页面，通过 Waffo 托管的收银台完成订阅签约。

- 用户完成首次支付后，Waffo 自动创建订阅协议并返回 `subscription_id`。
- 后续周期扣款由 Waffo 自动管理，商户无需额外操作。

#### 2. API 集成 (API Integration)

通过纯 API 方式实现深度定制化订阅管理：

1. 调用 `POST /subscriptions` 创建订阅计划。
2. 通过 Tokenization API 绑定用户支付方式。
3. Waffo 在每个计费周期自动发起扣款并推送 Webhook 通知。
4. 商户根据 Webhook 事件处理扣款成功/失败逻辑。

---

### 安全与合规

- **MIT 授权规范**：严格遵循 Visa/Mastercard MIT 授权框架，确保每次自动扣款合规。
- **PSD2 & SCA 合规**：欧洲市场首次签约强制完成强客户验证（SCA），后续 MIT 豁免额外验证。
- **数据安全**：支付凭证（Token）加密存储，原始卡号从不落地于商户系统。

---

### 常见问题 (FAQ)

**Q: 用户取消订阅后，当前周期的权益是否继续？**

A: 取消后的处理逻辑由商户自定义。通常情况下，当前已付费周期的权益会保留至周期结束。

**Q: 扣款失败多次后如何处理？**

A: 超过最大重试次数（可配置）后，订阅状态变为 `past_due`，Waffo 通过 Webhook 通知商户，商户可触发主动催收流程或暂停服务。

**Q: 如何处理订阅升降级？**

A: Waffo 支持按比例计算差价（Proration），升级时立即生效并收取差额，降级时在下个计费周期生效。

---

## English Version

### 1. Product Introduction

#### 1.1 Overview

Provides an automated, high-success-rate billing solution for recurring payment scenarios. Through a one-time authorization and multiple automatic billing mechanism, it supports flexible billing cycle configuration and intelligent retry, helping merchants achieve continuous subscription revenue growth and optimize user experience.

#### 1.2 What is Subscription Payment?

Subscription Payment, also known as automatic deduction or recurring billing, is a payment model where users complete authorization on the first payment, and the system subsequently initiates automatic charges according to the agreed period (weekly/monthly/yearly). By automating the "payment behavior," it greatly reduces users' renewal effort — it is the core infrastructure for SaaS services, streaming memberships, and paid content businesses.

#### 1.3 Core Capabilities

1. **Flexible Billing Cycles**: Supports standard cycles (weekly, monthly, quarterly, yearly) and custom day intervals to meet diverse business needs.
2. **Smart Retry Mechanism**: Built-in configurable retry strategies (e.g., 24h/48h intervals) with detailed failure code analysis to optimize payment success rates.
3. **Full Lifecycle Management**: Complete management from subscription creation, trial periods (free/discounted), automatic billing, upgrades/downgrades, to cancellation.
4. **Account Updater**: Integrated VAU/ABU service automatically updates card information when users' cards expire or are replaced, maintaining subscription continuity.

#### 1.4 Use Cases

- **Streaming Services**: Monthly/yearly auto-renewal for video and music platforms.
- **SaaS Software**: Recurring billing for office software and design tools.
- **Paid Content**: Membership services for knowledge platforms and online courses.
- **Gaming Subscriptions**: Auto-renewal for monthly/seasonal passes and in-game items.

---

### 2. Supported Payment Methods

#### 2.1 Bank Cards (Credit/Debit Cards)

- **Supported Networks**: Visa, Mastercard, JCB, and other global card networks.
- **Key Features**:
  - **Tokenization Security**: Creates a Token on first payment; subsequent charges use MIT (Merchant Initiated Transaction) mode — no CVV re-entry required.
  - **Account Updater (VAU/ABU)**: Automatically syncs updated card details, reducing passive churn.

#### 2.2 Digital Wallets

- Supports Token authorization management for Apple Pay, Google Pay, and other leading wallets.
- Once users complete the initial wallet authorization, subsequent subscription cycles are charged automatically without user intervention.

#### 2.3 Local Payment Methods

- Some local payment methods (e.g., direct bank debit in Southeast Asia) support subscription mode.
- Specific availability varies by market — please consult your Waffo Customer Success Manager.

---

### 3. Subscription Models & Experience

#### 3.1 Core Business Models

<CardGroup cols={2}>
  <Card title="Service-First" icon="play">
    Activate service first, then complete initial payment. Ideal for trial experiences or low-friction acquisition. Example: "Free trial for 7 days, then auto-renew."
  </Card>
  <Card title="Payment-First" icon="credit-card">
    Complete initial payment first, then activate service. Suitable for standard subscription products ensuring successful payment before granting access.
  </Card>
</CardGroup>

#### 3.2 Trial & Promotion Configuration

- **Free Trial Period**: Configure N-day free trials that automatically convert to paid subscriptions.
- **First-Period Discounts**: Set introductory pricing for the first month/year, reverting to standard price thereafter.
- **Coupon Integration**: Bind coupon codes via API to dynamically adjust subscription amounts.

#### 3.3 Deduction & Retry Logic

<Steps>
  <Step title="Billing Trigger">System automatically initiates MIT charge request before subscription period expires.</Step>
  <Step title="Initial Charge">Sends charge request to the bound payment method and receives real-time result.</Step>
  <Step title="Smart Retry">If charge fails, retries automatically based on failure reason (insufficient funds, card issue, etc.) per configured strategy (default: 24h/48h/72h).</Step>
  <Step title="User Notification">Notifies users of charge results via email/message, prompting proactive payment method updates.</Step>
  <Step title="Churn Handling">After maximum retries, marks subscription as "past_due" and triggers passive churn recovery flow.</Step>
</Steps>

---

### 4. Integration

#### 4.1 Hosted Checkout

No frontend development required — use Waffo's hosted checkout to complete subscription authorization.

#### 4.2 API Integration

Full API-based subscription management for deep customization:

1. Call `POST /subscriptions` to create a subscription plan.
2. Use the Tokenization API to bind user payment methods.
3. Waffo automatically initiates charges each billing cycle and pushes Webhook notifications.
4. Merchants handle success/failure logic based on Webhook events.

---

### 5. Security & Compliance

- **MIT Authorization Standards**: Strictly follows Visa/Mastercard MIT authorization frameworks for compliant automatic billing.
- **PSD2 & SCA Compliance**: European market requires Strong Customer Authentication (SCA) for initial authorization; subsequent MIT transactions are exempt.
- **Data Security**: Payment credentials (Tokens) are encrypted at rest; original card numbers never touch merchant systems.

---

### 6. FAQ (Frequently Asked Questions)

**Q: If a user cancels, do benefits continue for the current period?**

A: Post-cancellation handling is merchant-configurable. Typically, benefits for the already-paid period remain active until cycle end.

**Q: What happens after multiple failed charges?**

A: After exceeding the maximum retry count (configurable), the subscription status changes to `past_due`. Waffo notifies merchants via Webhook to trigger proactive collection or service suspension.

**Q: How are subscription upgrades/downgrades handled?**

A: Waffo supports prorated billing. Upgrades take effect immediately with differential charges; downgrades take effect at the next billing cycle.
