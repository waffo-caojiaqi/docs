---
title: "End-to-end data intelligence | Data Intelligence"
description: "A full-perspective data diagnostics platform, from optimizing single-payment success rates to improving full-lifecycle value"
---
## Chinese version

### Goals

- Build an understanding of Waffo’s end-to-end data intelligence: from optimizing single-payment success rates to improving full-lifecycle value (LTV)
- Explain how to use multi-dimensional drill-down and an all-channel funnel to unify analysis of conversion bottlenecks across cards and local payment methods (APMs)
- Demonstrate quantitative capabilities for subscription churn attribution and intelligent Recovery

### 1. Product overview

In cross-border payments, data is not just reporting—it is hidden profit. The global payments landscape is complex and diverse: user habits vary by country; payment methods include cards, local wallets, BNPL, and more; bank rules, Risk Control strategies, and network stability differ widely. Unlike a highly standardized domestic payments environment, cross-border payments require deep analysis of “why it failed,” not just “whether it succeeded.”

The Waffo Data Intelligence Center breaks down data silos between “one-time payments” and “subscription payments,” and between “cards” and “local wallets.” It provides merchants with multi-level, full-view diagnostic capabilities, turning obscure bank codes into actionable growth strategies and helping merchants answer three core questions:

<CardGroup cols={3}>
  <Card title="Is payment health good right now?" icon="heart-pulse">
    Real-time monitoring of Auth Rate, TPV, and conversion rate, with anomaly alerts in seconds.
  </Card>
  <Card title="Why did it fail?" icon="magnifying-glass">
    Drill down across issuer, region, and payment method to pinpoint root causes.
  </Card>
  <Card title="How do we recover churned customers?" icon="arrows-rotate">
    Subscription churn attribution analysis and quantified revenue recovered through intelligent retries.
  </Card>
</CardGroup>

---

### 2. Panoramic monitoring and all-channel funnel

Waffo monitors not only payment outcomes, but also the full user payment journey—especially in complex mixed-payment scenarios.

#### 1. Real-time health dashboard

- **Second-level response**: Whether during Black Friday peaks or day-to-day operations, track subtle fluctuations in Auth Rate (authorization success rate), TPV, and Conversion Rate in real time.
- **Intelligent alerts**: When the success rate drops abnormally (e.g., a 20% sudden decline in a specific region), the system automatically triggers an alert to help the engineering team quickly determine whether it’s a gateway issue or bank system maintenance.
- **Issue attribution**: Use the dashboard (Failure Reason Trend) to analyze immediately, accurately attributing the issue to gateway problems or bank maintenance—driving fast fixes and reducing business impact.

#### 2. All-channel conversion funnel

For the very different payment flows of cards (Direct) versus e-wallets/BNPL (Redirect), Waffo provides a unified funnel view:

- **Full-step tracking**: Starting from “merchant initiates checkout,” Waffo monitors end-to-end:
  - Checkout exposure → Select payment method → Enter information → Click pay → Successful order
  - Each stage has clear metrics to reconstruct the real path users take from entry and selection through action to completion.

- **Drop-off diagnostics**: The data clearly shows whether users dropped because they could not enter checkout successfully (technical issue) or abandoned during payment method selection or information entry (experience or intent issue), enabling targeted optimization.

---

### 3. Deep drill-down and intelligent attribution

When success rates fall below expectations, Waffo provides powerful analysis tools to locate the “lesion.”

#### 1. Multi-dimensional drill-down analysis

- **Geo & issuer (Geo & Issuer)**: Analyze precisely down to the specific issuer (BIN).
  - Scenario: Overall success rate looks normal, but a “specific bank in Brazil” has a failure rate as high as 40%? This prompts you to optimize routing or installment strategies for that bank.
- **Payment method comparison**: Compare Credit Card versus Local Wallets side by side. The data may show that prioritizing “Apple Pay” in certain countries drives higher GMV.

#### 2. Smart code mapping (Smart code mapping)

Bank decline codes (such as `Do Not Honor`, `Insufficient Funds`) are hard to interpret, and the same decline code can mean completely different things across banks.

Waffo Smart Code Mapping translates raw decline codes into **actionable strategies**:

| Decline code type | Root cause category | Recommended strategy |
|-----------|---------|---------|
| `Do Not Honor` | Issuer Risk Control | Suggest the user contact the issuer or use another card |
| `Insufficient Funds` | Insufficient funds | Trigger installment payments or suggest a downgraded plan |
| `Invalid Card` | Incorrect card information | Guide the user to re-enter details or switch payment methods |
| `Expired Card` | Card expired | Trigger Account Updater for automatic updates |

---

### 4. Subscription and renewal health

A retention and recovery analytics module built specifically for subscription businesses.

#### 1. Churn attribution analysis

Split subscription churn precisely into two categories:

- **Voluntary churn**: Users actively cancel; this should be addressed through product and service improvements.
- **Involuntary churn**: Unintentional churn caused by payment failures (insufficient balance, expired card, etc.), which can be recovered through technical measures.

#### 2. Recovery performance quantification (Recovery performance)

Quantify the value of “intelligent retries”:

- **Recovered amount**: Subscription revenue recovered this month through intelligent retry strategies
- **Recovery rate trend**: Before-and-after comparison data from retry strategy improvements
- **Best retry window**: Best charge-time distribution based on big-data analysis

#### 3. Cohort analysis (Cohort analysis)

Group by subscription start month and analyze retention curves across acquisition channels and plan types, helping merchants identify:
- Which channel delivers the highest LTV users
- Which plan has the most stable renewal rate
- Retention differences and optimization opportunities across markets

---

### 5. Frequently asked questions (FAQ)

**Q: How often is the data updated?**

A: The real-time monitoring dashboard updates at second-level latency; analytics reports (funnel analysis, drill-down analysis) update hourly; subscription health data updates daily.

**Q: Do you support custom time ranges and dimensions?**

A: Yes. You can customize the time range (up to a 13-month lookback), apply multi-dimensional combined filters (payment method × region × currency), and create custom metric dashboards.

**Q: How can data be exported?**

A: You can export all report data to CSV/Excel, and push data to the merchant’s BI system (e.g., Tableau, Looker) via API.

---
## English version

### 1. Product introduction

In cross-border payments, data is not just reporting — it’s hidden profit. The global payment environment is complex: user habits vary by country, payment methods include cards, local wallets, and BNPL; bank rules, risk controls, and network stability vary widely.

Waffo’s Data Intelligence Center breaks down data silos between one-time and subscription payments, and between card and wallet payments. We provide multi-level, full-perspective diagnostic services that translate cryptic bank codes into actionable growth strategies, helping merchants answer three core questions:

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

### 2. Monitoring & omnichannel funnel

Waffo monitors not just payment outcomes but the full user payment journey, especially in complex mixed-payment scenarios.

#### 2.1 Real-time health dashboard

- **Second-level response**: Real-time tracking of Auth Rate, TPV, and Conversion Rate fluctuations whether during Black Friday promotions or daily operations.
- **Smart alerts**: When success rates drop abnormally (e.g., a 20% sudden drop in a region), the system automatically triggers alerts to help technical teams quickly identify gateway failures vs. bank maintenance.
- **Issue attribution**: Immediately analyze via Failure Reason Trend dashboard, precisely attributing failures to gateway issues or bank maintenance, driving rapid resolution.

#### 2.2 Omnichannel conversion funnel

Provides a unified funnel view for the fundamentally different payment logic of card (Direct) vs. e-wallet/BNPL (Redirect):

- **Complete step tracking**: From “merchant initiates checkout” through end-to-end monitoring:
  - Checkout exposure → Payment method selection → Data entry → Click pay → Successful order
  - Each step has clear metrics to reveal the real user journey.

- **Drop-off diagnosis**: Data clearly identifies whether user drop-off is due to checkout entry failure (technical issue) or abandonment during method selection or data entry (UX or intent issue).

---

### 3. Drill-down & smart attribution

When success rates fall short of expectations, Waffo provides powerful analysis tools to locate the “root cause.”

#### 3.1 Multi-dimensional drill-down

- **Geo & issuer analysis**: Drill down to specific issuing banks (BIN level).
  - Example: Overall success rate looks fine, but a specific Brazilian bank has a 40% failure rate? System prompts you to optimize routing or installment strategies for that bank.
- **Payment method comparison**: Compare Credit Card vs. Local Wallet performance side by side. Data may show that placing Apple Pay at the top in a specific country can significantly increase GMV.

#### 3.2 Smart code mapping

Bank decline codes (like `Do Not Honor`, `Insufficient Funds`) are cryptic, and the same code can mean completely different things at different banks.

Waffo’s Smart Code Mapping translates raw decline codes into **actionable strategies**:

| Decline Code Type | Root Cause | Recommended Strategy |
|------------------|-----------|---------------------|
| `Do Not Honor` | Issuer risk control | Guide user to contact issuer or use alternative card |
| `Insufficient Funds` | Insufficient balance | Trigger installment option or plan downgrade suggestion |
| `Invalid Card` | Card info error | Guide user to re-enter or switch payment method |
| `Expired Card` | Card expired | Trigger Account Updater for automatic card update |

---

### 4. Subscription & retention health

Retention and recovery analysis module built specifically for subscription businesses.

#### 4.1 Churn attribution analysis

Precisely splits subscription churn into two categories:

- **Voluntary churn**: Users actively cancel subscriptions — requires product and service improvements.
- **Involuntary churn**: Payment failure-caused churn (insufficient funds, expired cards, etc.) — recoverable through technical means.

#### 4.2 Recovery performance quantification

Quantifies the value of “smart retry” strategies:

- **Recovered revenue**: Monthly subscription revenue recovered through smart retry strategies
- **Recovery rate trends**: Before/after comparison data for retry strategy optimizations
- **Optimal retry window**: Best billing time distribution based on big data analysis

#### 4.3 Cohort analysis

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