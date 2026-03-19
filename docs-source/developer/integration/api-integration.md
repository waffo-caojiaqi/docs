---
title: "API 集成"
description: "通过直接调用 Waffo REST API 实现支付集成，适合需要完全自定义支付流程的商户。"
---

## 接口文档

Waffo 提供标准的 RESTful API，所有接口均基于 HTTPS，返回 JSON 格式数据。

### 基础信息

| 环境 | Base URL |
|------|---------|
| 测试环境 | `https://api-test.waffo.com/v1` |
| 生产环境 | `https://api.waffo.com/v1` |

### 认证方式

所有请求须在 Authorization Header 中携带私钥：

```http
Authorization: Bearer sk_test_xxx
Content-Type: application/json
```

### 请求格式

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

## 代码示例

### 创建支付意图（Payment Intent）

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

### 查询支付状态

```javascript
const paymentIntent = await fetch(
  `https://api-test.waffo.com/v1/payment_intents/${paymentIntentId}`,
  {
    headers: { 'Authorization': `Bearer ${WAFFO_SECRET_KEY}` },
  }
).then(r => r.json());

console.log(paymentIntent.status); // succeeded | processing | requires_action
```

### 发起退款

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

## SDK 下载

Waffo 官方提供以下语言的服务端 SDK：

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

### SDK 初始化示例

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

## 错误处理

API 调用失败时，响应体包含标准错误对象：

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

常见错误类型：

| 错误类型 | HTTP 状态码 | 说明 |
|---------|-----------|------|
| `authentication_error` | 401 | API 密钥无效或缺失 |
| `invalid_request_error` | 400 | 请求参数错误 |
| `card_error` | 402 | 卡片相关错误（被拒绝、余额不足等） |
| `rate_limit_error` | 429 | 请求频率超限 |
| `api_error` | 500 | Waffo 服务器内部错误 |

详细错误码列表请参阅[错误码查询](/developer/tools/error-codes)。
