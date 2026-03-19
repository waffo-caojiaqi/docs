---
title: "支付方式 | Payment Methods"
description: "Waffo 全球支付方式指南 — 通过统一 API 接入全球主流与本地特色支付方式"
---

## 中文版

### 一、支付方式概览：全球化与本地化的完美结合

Waffo 致力于通过一个统一的 API 接口，为您的业务连接全球主流与本地特色支付方式，确保您在任何市场都能提供客户习惯的支付体验。

#### 🚀 Waffo 核心价值主张

<CardGroup cols={3}>
  <Card title="统一接入" icon="plug">
    单一 API 集成全球 430+ 种支付方式，无需为每个渠道单独开发。
  </Card>
  <Card title="本地化优先" icon="map-pin">
    根据用户所在地区智能匹配本地支付方式，提升支付成功率和用户体验。
  </Card>
  <Card title="持续扩展" icon="plus">
    Waffo 持续接入新渠道，商户无需额外开发即可使用新增支付方式。
  </Card>
</CardGroup>

---

### 二、支付方式分类

#### 🔍 按支付类型

| 支付类型 | 说明 | 代表方式 |
|--------|------|---------|
| **信用卡** (CREDITCARD) | 国际主流信用卡 | Visa, Mastercard, Amex, JCB, UnionPay |
| **借记卡** (DEBITCARD) | 银行借记卡 | Visa Debit, Mastercard Debit |
| **电子钱包** (EWALLET) | 数字钱包类 | Apple Pay, Google Pay, PayPal, Alipay, WeChat Pay |
| **实时支付** (REALTIME-PAYMENT) | 即时银行转账 | PIX（巴西）, FPS（香港）, PromptPay（泰国）|
| **先买后付** (BNPL) | 分期付款 | Paidy, Tendopay, Billease |
| **网银支付** (ONLINE_BANKING) | 网络银行直扣 | iDEAL, FPX, Bancontact, SOFORT |
| **OTC 现金** (OTC) | 线下代理商/便利店 | OXXO, 7-Eleven |
| **OTC 银行** (OTCBANK) | 线下银行柜台 | Boleto |
| **预付卡** (PREPAIDCARD) | 礼品卡/预付卡 | 各类预付卡和代金券 |
| **虚拟账户** (VA) | 虚拟银行账户 | 印尼 VA |
| **加密货币** (CRYPTO) | 数字货币支付 | 稳定币等 |

#### 🌍 按地区覆盖

| 地区 | 主要支付方式 |
|------|------------|
| **全球** | Visa、Mastercard、Amex、Apple Pay、Google Pay、PayPal |
| **中国大陆** | Alipay（支付宝）、WeChat Pay（微信支付）、UnionPay（云闪付）|
| **日本** | Paidy（先享后付）、JCB、Konbini 便利店支付 |
| **东南亚（印尼）** | GoPay、DANA、OVO、Bank Transfer、Virtual Account |
| **东南亚（泰国）** | TrueMoney、PromptPay、KBank |
| **东南亚（菲律宾）** | GCash、Maya、7-Eleven |
| **欧洲** | iDEAL（荷兰）、Bancontact（比利时）、SOFORT（德国）、SEPA |
| **拉丁美洲（巴西）** | PIX、Boleto Bancário |
| **拉丁美洲（墨西哥）** | OXXO、SPEI |
| **非洲（尼日利亚）** | 本地银行转账、移动支付 |

<Note>
具体可用支付方式取决于您的入网协议和所在地区。请联系您的 Waffo 客户成功经理获取完整列表。
</Note>

#### 📋 筛选维度

您可以按以下维度筛选适合您业务的支付方式：

- **支付类型**：信用卡、钱包、实时支付、BNPL 等
- **目标地区**：PHL（菲律宾）、IDN（印尼）、JPN（日本）、NGA（尼日利亚）等
- **支付币种**：EUR、USD、BRL、IDR 等目标结算币种
- **是否支持订阅**：是/否（MIT 授权支持）

---

### 常见问题解答 (FAQ)

#### 1. Waffo 支持哪些支付方式？

Waffo 为全球商户提供全渠道支付矩阵，核心支持：

- **国际信用卡与借记卡**：Visa、Mastercard、American Express、JCB、Discover、Diners Club、UnionPay
- **数字钱包**：Apple Pay、Google Pay、PayPal、微信支付、支付宝
- **先享后付 (BNPL)**：Paidy、Tendopay、Billease 等，提升大额订单转化率
- **本地银行转账**：iDEAL、SOFORT、Bancontact、Giropay（欧洲），以及东南亚、拉美实时银行转账
- **实时支付**：PIX（巴西）、FPS（香港）等
- **OTC 现金支付**：OXXO（墨西哥）、Boleto（巴西）、7-Eleven（东南亚）
- **预付卡与代金券**：多种主流预付卡渠道

#### 2. Waffo 的支付系统安全性如何？

安全是 Waffo 的核心承诺。我们已获得 **PCI DSS Level 1 合规认证**（最高级别），通过行业领先的加密技术和反欺诈系统，有效保障每一笔交易的数据安全，为商户和消费者构建可信赖的支付环境。

#### 3. Waffo 是否支持订阅支付/自动续费 (Recurring Billing)？

是的，Waffo 提供完善的订阅管理与周期性扣款服务：

- **灵活账期设置**：自定义试用期长度、正式订阅周期（日/周/月/年）
- **自动化扣款**：系统自动处理后续扣款，降低人工干预成本
- **流失挽回**：智能失败重试机制，提升续费成功率

#### 4. 线上支付的手续费标准是多少？

手续费因支付方式、地区、交易量等因素而异。请联系您的 Waffo 客户成功经理或[联系销售团队](/support/overview)获取专属报价。

---

## English Version

### 1. Payment Methods Overview: The Perfect Combination of Global & Local

Waffo is committed to connecting your business to global mainstream and local payment methods through a unified API, ensuring you can provide the payment experience customers are accustomed to in any market.

---

### 2. Payment Method Classification & Filtering Dimensions

#### Payment Types

| Type | Description | Examples |
|------|-------------|---------|
| **Credit Card** | International credit cards | Visa, Mastercard, Amex, JCB, UnionPay |
| **Debit Card** | Bank debit cards | Visa Debit, Mastercard Debit |
| **E-Wallet** | Digital wallets | Apple Pay, Google Pay, PayPal, Alipay, WeChat Pay |
| **Real-time Payment** | Instant bank transfer | PIX (Brazil), FPS (HK), PromptPay (Thailand) |
| **BNPL** | Buy Now Pay Later | Paidy, Tendopay, Billease |
| **Online Banking** | Direct bank debit | iDEAL, FPX, Bancontact, SOFORT |
| **OTC Cash** | Convenience store payment | OXXO, 7-Eleven |
| **OTC Bank** | Bank counter payment | Boleto |
| **Prepaid Card** | Gift/prepaid cards | Various prepaid and voucher channels |
| **Virtual Account** | Virtual bank accounts | Indonesia VA |
| **Crypto** | Cryptocurrency | Stablecoins, etc. |

#### 2.2 Specific Payment Methods by Region

| Region | Key Payment Methods |
|--------|-------------------|
| **Global** | Visa, Mastercard, Amex, Apple Pay, Google Pay, PayPal |
| **China** | Alipay, WeChat Pay, UnionPay |
| **Japan** | Paidy, JCB, Konbini |
| **Indonesia** | GoPay, DANA, OVO, Bank Transfer, VA |
| **Thailand** | TrueMoney, PromptPay |
| **Philippines** | GCash, Maya, 7-Eleven |
| **Europe** | iDEAL, Bancontact, SOFORT, SEPA |
| **Brazil** | PIX, Boleto |
| **Mexico** | OXXO, SPEI |

---

### 3. Frequently Asked Questions (FAQ)

**Q: What payment methods does Waffo support?**

Waffo supports a comprehensive global payment matrix including: international credit/debit cards (Visa, Mastercard, Amex, JCB, UnionPay), digital wallets (Apple Pay, Google Pay, PayPal, WeChat Pay, Alipay), BNPL (Paidy, Tendopay, Billease), local bank transfers, real-time payments (PIX, FPS), OTC cash payments, and prepaid cards.

**Q: How secure is Waffo's payment system?**

Waffo holds **PCI DSS Level 1 certification** (highest level), with industry-leading encryption and anti-fraud systems protecting every transaction.

**Q: Does Waffo support recurring billing/auto-renewal?**

Yes. Waffo provides comprehensive subscription management with flexible billing cycles, automated charges, and smart retry mechanisms for churn recovery.

**Q: What are the transaction fee standards?**

Fees vary by payment method, region, and transaction volume. Please contact your Waffo Customer Success Manager or [reach out to sales](/support/overview) for a customized quote.
