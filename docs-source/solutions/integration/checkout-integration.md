---
title: "收银台集成"
description: "Waffo 托管收银台集成指南，涵盖集成步骤、参数配置和定制化选项。"
---

## 集成步骤

托管收银台集成只需三步：

**第一步：创建支付会话**

在您的服务端调用 Waffo API 创建 Checkout Session，指定支付金额、币种、商品信息和回调地址：

```bash
POST https://api.waffo.com/v1/checkout/sessions
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "amount": 9900,
  "currency": "USD",
  "order_id": "your-order-id-001",
  "success_url": "https://yoursite.com/payment/success",
  "cancel_url": "https://yoursite.com/payment/cancel",
  "webhook_url": "https://yoursite.com/webhooks/waffo"
}
```

**第二步：跳转至收银台**

将用户重定向至响应中返回的 `checkout_url`，用户在 Waffo 托管页面完成支付。

**第三步：处理支付结果**

- 用户支付完成后跳回 `success_url`（URL 中携带 session_id）
- 同时 Waffo 向 `webhook_url` 发送 `payment.succeeded` 事件
- **重要**：请以 Webhook 回调为准更新订单状态，不要仅依赖页面跳转

## 参数配置

创建 Checkout Session 时支持的主要参数：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| amount | integer | 是 | 支付金额，单位为最小货币单位（如美分） |
| currency | string | 是 | 3 位 ISO 货币代码，如 USD、EUR |
| order_id | string | 是 | 商户侧订单号，需保证唯一性 |
| success_url | string | 是 | 支付成功后的跳转地址 |
| cancel_url | string | 是 | 用户取消支付后的跳转地址 |
| webhook_url | string | 否 | 支付结果回调地址（推荐配置） |
| customer_email | string | 否 | 用户邮箱，用于发送支付回执 |
| locale | string | 否 | 收银台显示语言，如 zh-CN、en、ja |
| payment_methods | array | 否 | 限制显示的支付方式列表 |
| metadata | object | 否 | 自定义键值对，会原样回传 |

## 定制化选项

通过商户 Portal 可对收银台进行以下定制：

- 上传商户 Logo（支持 PNG/SVG，建议尺寸 200×60px）
- 设置主题主色（HEX 颜色值）
- 配置支持的支付方式和显示顺序
- 自定义收银台域名（White-label，如 `pay.yourcompany.com`）

## 接口文档

收银台相关接口的完整参数说明、响应格式和错误码，请参阅[一次性支付 API](/developer/api/one-time-payment) 文档。
