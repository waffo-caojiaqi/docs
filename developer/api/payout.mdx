---
title: "Payout API"
description: "Waffo Payout 接口文档，支持单笔和批量代付，覆盖全球主要市场。"
---

## 服务介绍

Waffo Payout API 提供向全球收款方付款的能力。通过统一的 REST API，商户可以发起单笔或批量付款，支持银行转账、数字钱包等多种付款方式，覆盖 100+ 国家和地区。所有 Payout 请求均经过 AML 合规筛查，确保资金流转符合各地区监管要求。

## 发起Payout

**单笔 Payout** `POST /v1/payouts`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| amount | integer | 是 | 付款金额，单位为最小货币单位 |
| currency | string | 是 | 付款货币 ISO 代码 |
| recipient | object | 是 | 收款方信息（见下方说明） |
| reference_id | string | 是 | 商户侧唯一 Payout 单号 |
| description | string | 否 | 付款说明（显示在收款方银行流水） |
| metadata | object | 否 | 自定义扩展字段 |

**收款方信息（recipient）字段：**

银行转账场景：
```json
{
  "type": "bank_account",
  "name": "John Doe",
  "bank_code": "021000021",
  "account_number": "1234567890",
  "routing_number": "021000021",
  "country": "US",
  "email": "john@example.com"
}
```

数字钱包场景：
```json
{
  "type": "wallet",
  "wallet_type": "gcash",
  "account_number": "+639123456789",
  "name": "Maria Santos"
}
```

**批量 Payout** `POST /v1/payouts/batch`

单次最多支持 1000 笔，请求体包含 `payouts` 数组，每个元素结构与单笔 Payout 相同。批量请求异步处理，通过 Webhook 返回每笔的处理结果。

## 查询Payout

**查询单笔 Payout** `GET /v1/payouts/{payout_id}`

返回 Payout 的当前状态和完整详情。

**Payout 状态：**

| 状态 | 说明 |
|------|------|
| pending | 等待处理 |
| processing | 处理中，已提交至支付网络 |
| succeeded | 付款成功，资金已到账 |
| failed | 付款失败（见 failure_reason 字段） |
| reversed | 已退回（收款方信息有误等原因） |

**查询 Payout 列表** `GET /v1/payouts`

支持按 reference_id、状态、时间范围等条件过滤。

**Payout Webhook 事件：**

| 事件 | 说明 |
|------|------|
| payout.succeeded | 付款成功到账 |
| payout.failed | 付款失败 |
| payout.reversed | 付款被退回 |
