---
title: "Foreign exchange"
description: "Waffo FX conversion service supports multi-currency acquiring and automatic conversion, providing real-time exchange rates and FX exposure management"
---

## Service overview

Waffo Foreign Exchange (FX) helps cross-border merchants easily handle multi-currency acquiring and settlement. Merchants can accept payments in users’ preferred local currencies. Waffo completes the currency conversion and disburses funds in the merchant’s designated settlement currency, removing the burden of complex multi-currency account management.

Waffo partners with leading international banks and FX liquidity providers to offer competitive exchange rates and fast conversion execution.

## FX management

### Multi-currency acquiring

Merchants can configure multiple payment currencies (Payment Currency) in a single setup. Waffo automatically detects the user’s region and displays prices in the corresponding currency to improve the localized shopping experience.

**Workflow**:
1. The merchant configures supported payment currencies in the Console (e.g., USD, EUR, JPY, SGD)
2. The user sees prices in their local currency on the merchant page
3. The user completes payment; funds enter Waffo in the payment currency
4. Waffo automatically converts to the merchant’s settlement currency based on the exchange rate at settlement
5. The merchant receives funds in a unified settlement currency

### Exchange rate mechanism

Waffo provides two exchange rate modes:

#### Real-time rate (Spot Rate)
- Real-time market rate at the moment of conversion, plus Waffo’s service spread
- Suitable for merchants that do not require precise exchange-rate budgeting
- Exchange-rate fluctuation risk is borne by the merchant

#### Forward lock (Forward Lock)
- The merchant locks a target exchange rate before the transaction; the rate remains fixed within the validity period
- Suitable for merchants with high requirements for cost accuracy (e.g., products with fixed pricing)
- Application required in advance; maximum lock period: 90 days

### Exchange rate query

Merchants can query the latest exchange rates in real time via the API:

```bash
# 查询汇率
GET /v1/fx/rates?from=USD&to=CNY

# 响应示例
{
  "from": "USD",
  "to": "CNY",
  "rate": 7.2456,
  "timestamp": 1700000000,
  "valid_until": 1700003600
}
```

### Multi-currency settlement accounts

Merchants can configure multiple settlement accounts to receive different currencies:

```
USD acquiring → USD account (no FX conversion)
EUR acquiring → EUR account (no FX conversion)
Other currency acquiring → converted then disbursed to the designated account
```

## FX exposure management

### What is FX exposure

FX exposure refers to the exchange-rate fluctuation risk a merchant faces due to holding assets or liabilities in multiple currencies. For example, a merchant accepts payments in EUR but pays costs in USD. If the EUR/USD rate declines, the actual profit decreases.

### Exposure management strategies

#### Immediate conversion
Convert each transaction to the settlement currency immediately at the spot rate, eliminating FX exposure.

- **Pros**: No FX risk; predictable revenue
- **Cons**: If conversion occurs at a low exchange rate, potential gains may be lost

#### Batch conversion
Aggregate receipts in the same currency and convert in batches, allowing selection of a more favorable timing.

- **Pros**: Convert in a concentrated manner when rates are higher to optimize revenue
- **Cons**: Exposed to downside exchange-rate risk; requires active management

#### Natural hedging
Offset receipts in a currency against expenses in the same currency (e.g., supplier payments, employee payroll).

- **Applicable scenarios**: Merchants that both receive and spend funds in the target country

### Exposure reports

The Waffo Console provides a real-time FX exposure dashboard:

| Metric | Description |
|------|------|
| Current exposure amount | Unconverted balances by currency and USD equivalent |
| Exchange-rate impact | Floating P&L of exposed assets based on current market prices |
| Historical conversion records | Detailed records and rates for each conversion operation |
| Exchange-rate alert settings | Sends notifications when a specific rate reaches a preset threshold |

<Warning>
FX market volatility may impact merchants’ settlement revenue. Merchants are advised to choose an appropriate FX management strategy based on business scale and risk tolerance, and consult a professional financial advisor when necessary.
</Warning>