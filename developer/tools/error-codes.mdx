---
title: "错误码查询"
description: "Waffo API 完整错误码列表及处理建议，帮助您快速定位和解决集成问题。"
---

## 错误码列表

Waffo API 使用标准 HTTP 状态码，并在响应体中返回详细的错误信息。

### 错误响应格式

```json
{
  "error": {
    "type": "card_error",
    "code": "card_declined",
    "message": "您的卡被拒绝，请联系发卡行或使用其他支付方式。",
    "decline_code": "insufficient_funds",
    "param": "payment_method",
    "request_id": "req_abc123xyz"
  }
}
```

### HTTP 状态码

| 状态码 | 说明 |
|--------|------|
| `200` | 请求成功 |
| `201` | 资源创建成功 |
| `400` | 请求参数错误（Bad Request） |
| `401` | 认证失败（Unauthorized） |
| `402` | 支付请求失败（Payment Required） |
| `403` | 权限不足（Forbidden） |
| `404` | 资源不存在（Not Found） |
| `409` | 资源冲突（Conflict） |
| `422` | 请求格式正确但业务逻辑失败 |
| `429` | 请求频率超限（Too Many Requests） |
| `500` | 服务器内部错误（Internal Server Error） |
| `503` | 服务暂时不可用（Service Unavailable） |

## 错误类型

### authentication_error — 认证错误

| 错误码 | 说明 | 处理建议 |
|--------|------|---------|
| `invalid_api_key` | API 密钥无效 | 检查密钥格式，确认未包含多余空格 |
| `missing_api_key` | 未提供 API 密钥 | 在 Authorization Header 中添加密钥 |
| `api_key_expired` | API 密钥已过期 | 在商户后台重新生成密钥 |
| `insufficient_permissions` | 密钥权限不足 | 确认使用的密钥具有操作所需权限 |

### invalid_request_error — 请求参数错误

| 错误码 | 说明 | 处理建议 |
|--------|------|---------|
| `missing_param` | 缺少必填参数 | 检查 `param` 字段确认缺少的参数 |
| `invalid_param` | 参数格式错误 | 参考 API 文档检查参数类型和格式 |
| `invalid_amount` | 金额格式错误 | 金额需为正整数（最小货币单位） |
| `invalid_currency` | 货币代码无效 | 使用标准 ISO 4217 三字母代码 |
| `resource_not_found` | 资源不存在 | 确认资源 ID 正确，且属于当前账户 |
| `resource_already_exists` | 资源已存在 | 使用幂等键避免重复创建 |

### card_error — 卡片错误

| 错误码 | decline_code | 说明 | 建议展示给用户的消息 |
|--------|-------------|------|-------------------|
| `card_declined` | `insufficient_funds` | 余额不足 | 您的卡余额不足，请充值后重试或使用其他卡 |
| `card_declined` | `lost_card` | 卡片已挂失 | 您的卡无法使用，请使用其他支付方式 |
| `card_declined` | `stolen_card` | 卡片已报失 | 您的卡无法使用，请使用其他支付方式 |
| `card_declined` | `generic_decline` | 通用拒绝 | 您的卡被拒绝，请联系发卡行或使用其他卡 |
| `expired_card` | - | 卡片已过期 | 您的卡已过期，请使用其他有效的卡 |
| `incorrect_cvc` | - | CVC/CVV 错误 | 卡片安全码错误，请重新输入 |
| `incorrect_number` | - | 卡号错误 | 卡号有误，请核实后重新输入 |
| `invalid_expiry_month` | - | 过期月份无效 | 请输入有效的过期月份（01-12） |
| `invalid_expiry_year` | - | 过期年份无效 | 请输入有效的过期年份 |

### payment_error — 支付错误

| 错误码 | 说明 | 处理建议 |
|--------|------|---------|
| `payment_intent_invalid_status` | PaymentIntent 状态不允许此操作 | 检查 PaymentIntent 当前状态 |
| `payment_method_not_attached` | 支付方式未绑定 | 先 attach 支付方式再确认支付 |
| `payment_intent_unexpected_state` | PaymentIntent 状态异常 | 查询最新状态后再操作 |
| `duplicate_payment` | 重复支付 | 使用幂等键防止重复，或查询已有 PaymentIntent |

### rate_limit_error — 频率限制

| 错误码 | 说明 | 处理建议 |
|--------|------|---------|
| `rate_limit_exceeded` | API 调用频率超限 | 实现指数退避重试，优化调用频率 |
| `concurrent_request_limit` | 并发请求超限 | 减少并发请求数，实现请求队列 |

## 常见错误处理

### 幂等键使用

对于支付创建等关键操作，建议使用幂等键避免重复提交：

```javascript
const paymentIntent = await waffo.paymentIntents.create(
  {
    amount: 2000,
    currency: 'usd',
  },
  {
    idempotencyKey: `order_${orderId}_${Date.now()}`,  // 唯一键
  }
);
```

### 指数退避重试

```javascript
async function createPaymentWithRetry(params, maxRetries = 3) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await waffo.paymentIntents.create(params);
    } catch (error) {
      if (error.type === 'api_error' && attempt < maxRetries) {
        // 服务器错误，使用指数退避重试
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;  // 其他错误或已达最大重试次数，直接抛出
    }
  }
}
```

### 错误分类处理

```javascript
try {
  const paymentIntent = await waffo.paymentIntents.confirm(id, params);
} catch (error) {
  switch (error.type) {
    case 'card_error':
      // 卡片问题，展示给用户
      showUserMessage(error.message);
      break;
    case 'invalid_request_error':
      // 开发错误，记录日志
      console.error('API 请求参数错误:', error);
      break;
    case 'authentication_error':
      // 密钥问题，告警
      alertOps('Waffo API 密钥异常:', error);
      break;
    case 'rate_limit_error':
      // 频率限制，队列重试
      await retryWithBackoff();
      break;
    default:
      // 未知错误，通用处理
      showUserMessage('支付处理失败，请稍后重试');
      console.error('未知错误:', error);
  }
}
```
