---
title: "API integration"
description: "Integrate payments by directly calling the Waffo REST API, suitable for merchants who need a fully customized payment flow."
---

## API documentation

Waffo provides standard RESTful APIs. All endpoints are based on HTTPS and return data in JSON format.

### Basic information

| Environment | Base URL |
|------|---------|
| Test environment | `https://api-test.waffo.com/v1` |
| Production environment | `https://api.waffo.com/v1` |

### Authentication

All requests must include the secret key in the Authorization header:

```http
Authorization: Bearer sk_test_xxx
Content-Type: application/json
```

### Request format

```http
POST /v1/payment_intents
Authorization: Bearer sk_test_xxx
Content-Type: application/json

{
  "amount": 2000,
  "currency": "usd",
  "payment_method_types": ["card"]
}
```

## Code examples

### Create a payment intent (Payment Intent)

```javascript
// Node.js
const response = await fetch('https://api-test.waffo.com/v1/payment_intents', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.WAFFO_SECRET_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    amount: 2000,
    currency: 'usd',
    payment_method_types: ['card', 'alipay'],
    metadata: {
      order_id: 'order_12345',
      customer_email: 'user@example.com',
    },
  }),
});

const paymentIntent = await response.json();
console.log(paymentIntent.client_secret); // 传递给前端
```

```python
# Python
import requests

response = requests.post(
    'https://api-test.waffo.com/v1/payment_intents',
    headers={
        'Authorization': f'Bearer {WAFFO_SECRET_KEY}',
        'Content-Type': 'application/json',
    },
    json={
        'amount': 2000,
        'currency': 'usd',
        'payment_method_types': ['card'],
        'metadata': {'order_id': 'order_12345'},
    }
)

payment_intent = response.json()
```

```go
// Go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

func createPaymentIntent() {
    payload := map[string]interface{}{
        "amount":               2000,
        "currency":             "usd",
        "payment_method_types": []string{"card"},
    }
    
    body, _ := json.Marshal(payload)
    req, _ := http.NewRequest("POST", "https://api-test.waffo.com/v1/payment_intents", bytes.NewBuffer(body))
    req.Header.Set("Authorization", "Bearer sk_test_xxx")
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    // 处理响应...
    _ = resp
    _ = err
    fmt.Println("Payment intent created")
}
```

### Check payment status

```javascript
const paymentIntent = await fetch(
  `https://api-test.waffo.com/v1/payment_intents/${paymentIntentId}`,
  {
    headers: { 'Authorization': `Bearer ${WAFFO_SECRET_KEY}` },
  }
).then(r => r.json());

console.log(paymentIntent.status); // succeeded | processing | requires_action
```

### Initiate a refund

```javascript
const refund = await fetch('https://api-test.waffo.com/v1/refunds', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${WAFFO_SECRET_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    payment_intent: 'pi_xxx',
    amount: 1000,  // 部分退款，不填则全额退款
    reason: 'customer_request',
  }),
}).then(r => r.json());
```

## SDK download

Waffo officially provides server-side SDKs in the following languages:

<CardGroup cols={3}>
  <Card title="Node.js SDK" icon="node-js">
    ```bash
    npm install @waffo/node
    ```
  </Card>
  <Card title="Python SDK" icon="python">
    ```bash
    pip install waffo
    ```
  </Card>
  <Card title="Go SDK" icon="golang">
    ```bash
    go get github.com/waffo/waffo-go
    ```
  </Card>
</CardGroup>

### SDK initialization example

```javascript
// Node.js SDK
const Waffo = require('@waffo/node');
const waffo = new Waffo('sk_test_xxx', {
  apiVersion: '2024-01',
  timeout: 30000,
  maxNetworkRetries: 2,
});

// 使用 SDK 创建支付
const paymentIntent = await waffo.paymentIntents.create({
  amount: 2000,
  currency: 'usd',
});
```

## Error handling

When an API call fails, the response body includes a standard error object:

```json
{
  "error": {
    "type": "card_error",
    "code": "card_declined",
    "message": "您的卡被拒绝，请联系发卡行或使用其他支付方式。",
    "param": "payment_method",
    "request_id": "req_abc123"
  }
}
```

Common error types:

| Error type | HTTP status code | Description |
|---------|-----------|------|
| `authentication_error` | 401 | API key is invalid or missing |
| `invalid_request_error` | 400 | Request parameter error |
| `card_error` | 402 | Card-related errors (declined, insufficient funds, etc.) |
| `rate_limit_error` | 429 | Request rate limit exceeded |
| `api_error` | 500 | Internal Waffo server error |

For a detailed list of error codes, see [Error code lookup](/developer/tools/error-codes).