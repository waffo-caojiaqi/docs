---
title: "通用API"
description: "Waffo 通用接口说明，包含退款、查询、Webhook 签名验证等基础能力。"
---

## 退款接口

`POST /v1/refunds`

对已成功的支付发起退款。支持全额退款和部分退款。

**请求参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| payment_id | string | 是 | 要退款的支付 ID |
| amount | integer | 否 | 退款金额（不填则全额退款） |
| reason | string | 否 | 退款原因（`duplicate`、`fraudulent`、`customer_request`） |
| metadata | object | 否 | 自定义扩展字段 |

**注意事项：**
- 同一笔支付可多次部分退款，但累计退款金额不能超过原始支付金额
- 退款通常在 5-10 个工作日内到账用户账户，具体取决于发卡行处理时效
- 退款不收取额外手续费，但原始支付的手续费不予退还

## 查询接口

**通用列表查询参数：**

所有列表类接口均支持以下分页参数：

| 参数 | 类型 | 说明 |
|------|------|------|
| limit | integer | 每页条数，范围 1-100，默认 20 |
| starting_after | string | 游标分页：返回此 ID 之后的记录 |
| ending_before | string | 游标分页：返回此 ID 之前的记录 |
| created_after | integer | 创建时间下限（Unix 时间戳） |
| created_before | integer | 创建时间上限（Unix 时间戳） |

**响应格式：**

```json
{
  "object": "list",
  "data": [...],
  "has_more": true,
  "total_count": 156
}
```

## Webhook

Waffo 通过 Webhook 将支付事件实时推送至您的服务器。

**Webhook 签名验证：**

每个 Webhook 请求的 Header 中包含 `Waffo-Signature` 字段，用于验证请求来源。

```javascript
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSig = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSig)
  );
}
```

**主要 Webhook 事件列表：**

| 事件 | 说明 |
|------|------|
| payment.succeeded | 支付成功 |
| payment.failed | 支付失败 |
| payment.refunded | 退款完成 |
| subscription.created | 订阅创建 |
| invoice.payment_succeeded | 订阅续费成功 |
| invoice.payment_failed | 订阅续费失败 |
| payout.succeeded | Payout 到账 |
| dispute.created | 新争议/拒付 |

**Webhook 重试机制：**

若 Webhook 端点返回非 2xx 状态码，Waffo 会按指数退避策略重试，最多重试 5 次，间隔分别为 5 分钟、30 分钟、2 小时、6 小时、24 小时。

**错误码说明：**

Waffo API 使用标准 HTTP 状态码，错误响应格式：

```json
{
  "error": {
    "code": "card_declined",
    "message": "Your card was declined.",
    "decline_code": "insufficient_funds",
    "param": null
  }
}
```

完整错误码列表请使用商户 Portal 中的[错误码查询工具](/developer/tools/overview)。
