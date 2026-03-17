---
title: "Tokenization | 凭证化支付"
description: "将敏感卡号替换为安全随机字符串（Waffo Token），实现一键支付与周期扣款，商户无需接触明文卡数据。/ Replace sensitive card data with a secure random string (Waffo Token), enabling one-click checkout and recurring billing without merchants ever touching raw card numbers."
---

## 中文版

### 产品概览

Tokenization（凭证化）技术通过将敏感的银行卡信息替换为一段非敏感的随机字符串（**Waffo Token**），使商户能够在不触碰原始卡号的前提下，安全地存储用户的支付信息。

Waffo 提供标准化的 Token 解决方案，商户只需对接统一的 Token 接口，即可实现"一键支付"和"周期性扣款"，无需关心底层复杂的卡组织规则与安全加密细节。

<Note>
Token 不存储在商户服务器上，所有凭证由 Waffo PCI-DSS Level 1 金库安全托管。商户系统仅保存不具备支付能力的 `token_id`，大幅缩减合规审计范围。
</Note>

---

### 核心价值

<CardGroup cols={3}>
  <Card title="极致支付体验" icon="bolt">
    用户只需首次输入卡号，后续消费无需重复输入，极大降低结账摩擦，提升转化率。
  </Card>
  <Card title="降低合规成本" icon="shield-check">
    敏感数据由 Waffo 的 PCI-DSS Level 1 级金库托管，商户系统无需处理明文卡号，大幅缩减合规审计范围与维护成本。
  </Card>
  <Card title="跨渠道通用" icon="globe">
    生成的 Token 可在您的 App、Web 端、移动端网页等全渠道通用，构建统一的用户支付账户体系。
  </Card>
</CardGroup>

---

### 为何选择 Waffo Tokenization

<CardGroup cols={2}>
  <Card title="智能支付优化（Smart Optimization）" icon="microchip-ai">
    Waffo 在底层运用了多种行业领先的优化技术。当您使用 Waffo Token 发起扣款时，智能引擎会根据发卡行偏好、交易类型和风险特征，自动选择最优的交易报文格式与路由策略。

    - **更高授权通过率**：相比传统卡号支付，Token 交易可获得更优的发卡行响应。
    - **无感零配置**：所有优化在毫秒级内自动完成，商户无需任何额外配置。
  </Card>
  <Card title="卡片自动更新（Account Updater）" icon="arrows-rotate">
    Waffo 与主流卡组织网络深度集成，支持卡片生命周期的自动化管理。

    - **自动续连**：当用户的实体卡片过期、挂失补卡或卡号变更时，系统自动获取最新卡片信息。
    - **业务零中断**：Waffo 在后台静默更新映射关系，您的 `token_id` 字符串保持不变，但已指向新卡，确保订阅扣款不因用户换卡而失败。
  </Card>
</CardGroup>

---

### 核心适用场景

<CardGroup cols={3}>
  <Card title="一键支付（One-Click Checkout）" icon="cursor-arrow-rays">
    **场景**：老用户在商户再次购物。

    用户首次结账时完成 Tokenization，Token 保存至商户系统。再次购物时，用户只需确认，系统自动用 Token 完成扣款，无需重新输入卡号。
  </Card>
  <Card title="订阅与自动续费（Recurring）" icon="calendar-check">
    适用于 SaaS 订阅、会员周期续费等场景。

    首次付款时获取 Token，每个周期到期时系统自动使用 Token 发起 MIT（Merchant Initiated Transaction）扣款，无需用户介入。
  </Card>
  <Card title="预订与延迟扣款（Booking）" icon="hotel">
    适用于酒店预订、租车、代订票务等场景。

    预订时完成 Token 创建并验证用户卡片有效性（零元或小额验证），实际服务完成后（如退房）再发起实际扣款。
  </Card>
</CardGroup>

---

### 生命周期管理流程

<Steps>
  <Step title="创建令牌（Create Token）">
    用户首次输入卡片信息并授权存储，Waffo 加密处理后生成 Waffo Token，并返回 `token_id` 给商户。商户将 `token_id` 保存至自身系统，用于后续扣款。

    ```http
    POST /tokens
    ```
  </Step>
  <Step title="验证与支付（Verify & Charge）">
    使用 `token_id` 发起 MIT 扣款，无需用户再次输入卡片信息。Waffo 自动处理 3DS 认证豁免与路由优化逻辑。

    ```http
    POST /payments
    {
      "token_id": "tok_xxxxxxxx",
      "amount": 2000,
      "currency": "USD"
    }
    ```
  </Step>
  <Step title="维护与展示（Manage）">
    商户可查询用户已保存的卡片列表（`token_id` + 卡片末四位 + 品牌），支持用户删除指定卡片。卡片自动更新机制在后台静默维护 Token 有效性，无需商户干预。

    ```http
    GET  /tokens              # 查询卡片列表
    DELETE /tokens/{token_id} # 删除指定卡片
    ```
  </Step>
</Steps>

---

### 接入与迁移

#### 集成方式

| 方式 | 说明 | 适用场景 |
|---|---|---|
| **前端 SDK** | 收银台内嵌 Token 授权 UI，Waffo 托管卡号输入表单 | 快速接入，PCI 合规范围最小 |
| **纯 API** | 商户自定义 UI，通过 API 提交卡片信息完成 Token 创建 | 需自定义结账体验，需持有 PCI SAQ-D |

#### 数据迁移（Data Migration）

支持从其他 PSP 将已有 Token 迁移至 Waffo，保护存量用户资产，无需用户重新绑卡。请联系客户成功经理获取专项迁移方案。

---

### 常见问题

**Q：Token 会过期吗？**

Waffo Token 本身不设过期时间。底层卡片到期后，Account Updater 机制会自动获取新卡信息并更新映射，您持有的 `token_id` 持续有效。

**Q：一张卡可以生成多个 Token 吗？**

可以。同一张卡在不同商户或不同业务场景下可生成多个独立的 `token_id`，各 Token 相互隔离，互不影响。

**Q：用户删除 Token 后，能否恢复？**

不能。Token 删除后即永久注销，无法恢复。如需再次使用，用户须重新授权绑卡并生成新的 `token_id`。

**Q：Tokenization 支持哪些卡组织？**

Waffo Tokenization 支持 Visa、Mastercard、American Express 等主流国际卡组织，以及部分本地卡网络。具体覆盖范围请咨询您的 Waffo 集成团队。

---

## English Version

### Overview

Tokenization replaces sensitive card data with a secure, non-sensitive random string — the **Waffo Token** — enabling merchants to store payment credentials safely without ever touching raw card numbers.

Waffo provides a unified Token API so merchants can implement one-click checkout and recurring billing through a single integration, without worrying about the underlying complexities of card network protocols or encryption standards.

<Note>
Tokens are never stored on the merchant's servers. All credentials are secured in Waffo's PCI-DSS Level 1 vault. Merchants retain only a non-chargeable `token_id`, significantly reducing compliance audit scope.
</Note>

---

### Core Value

<CardGroup cols={3}>
  <Card title="Frictionless UX" icon="bolt">
    Cardholders enter their card details once and pay forever after. Eliminating re-entry at checkout dramatically reduces abandonment and increases conversion.
  </Card>
  <Card title="Reduced Compliance Scope" icon="shield-check">
    Sensitive card data is vaulted in Waffo's PCI-DSS Level 1 environment. Merchant systems never handle plaintext card numbers, shrinking PCI audit scope and ongoing compliance overhead.
  </Card>
  <Card title="Omnichannel Ready" icon="globe">
    A single Token works across your iOS app, web storefront, and mobile browser — building a unified payment identity for every customer across all channels.
  </Card>
</CardGroup>

---

### Why Choose Waffo Tokenization

<CardGroup cols={2}>
  <Card title="Smart Payment Optimization" icon="microchip-ai">
    Waffo applies industry-leading optimization techniques under the hood. When a charge is initiated with a Waffo Token, the intelligent routing engine selects the optimal message format and route based on issuer preferences, transaction type, and risk profile.

    - **Higher authorization rates**: Token-based transactions consistently outperform raw card number payments with issuers.
    - **Zero configuration**: All optimizations complete in milliseconds with no additional setup required from merchants.
  </Card>
  <Card title="Account Updater" icon="arrows-rotate">
    Waffo is deeply integrated with major card network update services, automating the full card lifecycle.

    - **Automatic re-linkage**: When a physical card expires, is reported lost, or has its number changed, the system automatically retrieves the updated card details.
    - **Zero business disruption**: Waffo silently updates the internal mapping. Your `token_id` string stays the same but now points to the new card, ensuring subscription charges never fail due to a card replacement.
  </Card>
</CardGroup>

---

### Use Cases

<CardGroup cols={3}>
  <Card title="One-Click Checkout" icon="cursor-arrow-rays">
    **Scenario**: A returning customer makes another purchase.

    Tokenize at first checkout and store the `token_id`. On the next visit, the customer confirms and the charge completes automatically — no card re-entry required.
  </Card>
  <Card title="Recurring & Subscription" icon="calendar-check">
    Ideal for SaaS subscriptions, membership renewals, and any periodic billing model.

    Acquire the Token on the first payment. On each billing cycle, the system automatically initiates an MIT (Merchant Initiated Transaction) charge — no cardholder interaction needed.
  </Card>
  <Card title="Booking & Delayed Charge" icon="hotel">
    Ideal for hotel reservations, car rentals, and ticketing services.

    Tokenize and verify the card at booking time (via a zero-amount or micro-authorization), then initiate the actual charge when the service is delivered (e.g., at checkout).
  </Card>
</CardGroup>

---

### Token Lifecycle

<Steps>
  <Step title="Create Token">
    The cardholder enters their card details and authorizes storage. Waffo encrypts the data and returns a `token_id` to the merchant. The merchant stores only the `token_id` for future use.

    ```http
    POST /tokens
    ```
  </Step>
  <Step title="Verify & Charge">
    Use the `token_id` to initiate an MIT charge. No cardholder input is required. Waffo automatically handles 3DS exemption logic and intelligent routing.

    ```http
    POST /payments
    {
      "token_id": "tok_xxxxxxxx",
      "amount": 2000,
      "currency": "USD"
    }
    ```
  </Step>
  <Step title="Manage & Display">
    Merchants can retrieve a customer's saved card list (`token_id` + last four digits + brand), and allow users to delete specific cards. The Account Updater silently maintains Token validity in the background — no merchant action required.

    ```http
    GET    /tokens              # List saved cards
    DELETE /tokens/{token_id}   # Remove a card
    ```
  </Step>
</Steps>

---

### Integration & Migration

#### Integration Methods

| Method | Description | Best For |
|---|---|---|
| **Frontend SDK** | Waffo-hosted card input form embedded in checkout UI | Fast integration, minimal PCI scope |
| **Pure API** | Merchant-built UI submits card data via API to create a Token | Custom checkout experience; requires PCI SAQ-D |

#### Data Migration

Existing tokens from other PSPs can be migrated to Waffo, preserving your customers' saved payment methods without requiring them to re-enter card details. Contact your Waffo Customer Success Manager for a dedicated migration plan.

---

### FAQ

**Q: Do Waffo Tokens expire?**

Waffo Tokens themselves do not have an expiry date. When the underlying physical card expires, the Account Updater mechanism automatically retrieves the new card details and updates the internal mapping. Your `token_id` remains valid continuously.

**Q: Can a single card generate multiple Tokens?**

Yes. The same card can be tokenized multiple times across different merchants or business contexts, generating independent `token_id` values. Each Token is isolated and does not affect others.

**Q: Can a deleted Token be restored?**

No. Once a Token is deleted it is permanently invalidated and cannot be recovered. To resume using that card, the customer must re-authorize and a new `token_id` will be issued.

**Q: Which card networks does Waffo Tokenization support?**

Waffo Tokenization supports all major international card networks including Visa, Mastercard, and American Express, as well as select local card schemes. Contact your Waffo integration team for the full list of supported networks in your target markets.
