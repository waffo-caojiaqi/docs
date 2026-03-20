---
title: "Error code reference"
description: "A complete list of Waffo API error codes and handling recommendations to help you quickly identify and resolve integration issues."
---

## Error code list

The Waffo API uses standard HTTP status codes and returns detailed error information in the response body.

### Error response format

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

### HTTP status codes

| Status code | Description |
|--------|------|
| `200` | Request succeeded |
| `201` | Resource created successfully |
| `400` | Invalid request parameters (Bad Request) |
| `401` | Authentication failed (Unauthorized) |
| `402` | Payment request failed (Payment Required) |
| `403` | Insufficient permissions (Forbidden) |
| `404` | Resource not found (Not Found) |
| `409` | Resource conflict (Conflict) |
| `422` | Request format is valid, but business logic failed |
| `429` | Rate limit exceeded (Too Many Requests) |
| `500` | Internal server error (Internal Server Error) |
| `503` | Service temporarily unavailable (Service Unavailable) |

## Error types

### authentication_error — Authentication errors

| Error code | Description | Recommended action |
|--------|------|---------|
| `invalid_api_key` | Invalid API key | Check the key format and confirm it does not include extra spaces |
| `missing_api_key` | API key not provided | Add the key in the Authorization header |
| `api_key_expired` | API key has expired | Regenerate the key in the Merchant Dashboard |
| `insufficient_permissions` | Insufficient key permissions | Confirm the key has the permissions required for the operation |

### invalid_request_error — Invalid request parameters

| Error code | Description | Recommended action |
|--------|------|---------|
| `missing_param` | Missing required parameter | Check the `param` field to identify the missing parameter |
| `invalid_param` | Invalid parameter format | Refer to the API documentation to verify parameter types and formats |
| `invalid_amount` | Invalid amount format | Amount must be a positive integer (in the smallest currency unit) |
| `invalid_currency` | Invalid currency code | Use a standard ISO 4217 three-letter code |
| `resource_not_found` | Resource not found | Confirm the resource ID is correct and belongs to the current account |
| `resource_already_exists` | Resource already exists | Use an idempotency key to avoid duplicate creation |

### card_error — Card errors

| Error code | decline_code | Description | Message recommended to show to the user |
|--------|-------------|------|-------------------|
| `card_declined` | `insufficient_funds` | Insufficient funds | Your card has insufficient funds. Please top up and try again, or use a different card. |
| `card_declined` | `lost_card` | Card reported lost | Your card can’t be used. Please use another payment method. |
| `card_declined` | `stolen_card` | Card reported stolen | Your card can’t be used. Please use another payment method. |
| `card_declined` | `generic_decline` | Generic decline | Your card was declined. Please contact your card issuer or use another card. |
| `expired_card` | - | Card has expired | Your card has expired. Please use another valid card. |
| `incorrect_cvc` | - | Incorrect CVC/CVV | The card security code is incorrect. Please re-enter it. |
| `incorrect_number` | - | Incorrect card number | The card number is invalid. Please check and re-enter it. |
| `invalid_expiry_month` | - | Invalid expiry month | Please enter a valid expiry month (01-12). |
| `invalid_expiry_year` | - | Invalid expiry year | Please enter a valid expiry year. |

### payment_error — Payment errors

| Error code | Description | Recommended action |
|--------|------|---------|
| `payment_intent_invalid_status` | The PaymentIntent status does not allow this operation | Check the current PaymentIntent status |
| `payment_method_not_attached` | Payment method not attached | Attach the payment method before confirming the payment |
| `payment_intent_unexpected_state` | Unexpected PaymentIntent state | Query the latest status before proceeding |
| `duplicate_payment` | Duplicate payment | Use an idempotency key to prevent duplicates, or query an existing PaymentIntent |

### rate_limit_error — Rate limiting

| Error code | Description | Recommended action |
|--------|------|---------|
| `rate_limit_exceeded` | API rate limit exceeded | Implement exponential backoff retries and optimize call frequency |
| `concurrent_request_limit` | Concurrent request limit exceeded | Reduce concurrent requests and implement a request queue |

## Common error handling

### Using idempotency keys

For critical operations such as payment creation, use an idempotency key to avoid duplicate submissions:

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

### Exponential backoff retries

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

### Handling errors by category

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