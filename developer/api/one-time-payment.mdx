---
title: "一次性支付API"
description: "Waffo 一次性支付接口文档，包含创建支付、查询支付和支付确认的完整说明。"
---

## 创建支付

`POST /v1/payments`

创建一笔新的支付订单。支持托管收银台和 API 直连两种模式。

**请求参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| amount | integer | 是 | 支付金额，单位为最小货币单位（如美元对应美分） |
| currency | string | 是 | 3 位 ISO 4217 货币代码，如 `USD`、`EUR`、`JPY` |
| order_id | string | 是 | 商户侧唯一订单号，长度 1-64 字符 |
| payment_method | object | 否 | 支付方式信息（API 直连模式必填） |
| return_url | string | 否 | 支付完成后的跳转地址（3DS 或跳转类支付必填） |
| webhook_url | string | 否 | 支付结果 Webhook 回调地址 |
| customer | object | 否 | 用户信息（email、name、phone 等） |
| metadata | object | 否 | 自定义扩展字段，原样返回，不参与业务逻辑 |
| capture_method | string | 否 | `automatic`（默认）或 `manual`（预授权模式） |
| description | string | 否 | 支付描述，显示在用户账单 |

**响应示例：**

```json
{
  "id": "pay_abc123xyz",
  "object": "payment",
  "amount": 9900,
  "currency": "USD",
  "status": "succeeded",
  "order_id": "order-001",
  "created_at": "2025-01-15T10:30:00Z",
  "payment_method": {
    "type": "card",
    "card": {
      "brand": "visa",
      "last4": "4242",
      "exp_month": 12,
      "exp_year": 2026
    }
  }
}
```

## 查询支付

`GET /v1/payments/{payment_id}`

根据支付 ID 查询单笔支付的详细信息和当前状态。

**路径参数：**

| 参数 | 说明 |
|------|------|
| payment_id | 支付 ID，格式为 `pay_` 开头的字符串 |

**支付状态说明：**

| 状态 | 说明 |
|------|------|
| pending | 支付创建，等待用户操作 |
| processing | 支付处理中 |
| succeeded | 支付成功 |
| failed | 支付失败 |
| canceled | 支付已取消 |
| requires_action | 需要用户额外操作（如 3DS 验证） |

## 支付确认

`POST /v1/payments/{payment_id}/confirm`

对状态为 `requires_action` 或预授权的支付发起确认/请款操作。

**请求参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| payment_method | object | 否 | 更新支付方式（用于用户更换付款方式场景） |
| amount | integer | 否 | 请款金额（预授权部分请款时使用，不填则全额请款） |

**错误码说明：**

完整的错误码列表请参阅[通用 API](/developer/api/common) 文档中的错误码部分，或使用商户 Portal 中的[错误码查询工具](/developer/tools/overview)。
