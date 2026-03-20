---
title: "API integration"
description: "Integrate payments directly via the Waffo REST API, with complete code examples and SDK downloads."
---

## Code examples

The following examples show how to create a payment directly through the Waffo API and handle the result.

**Node.js example:**

```javascript
const axios = require('axios');

async function createPayment() {
  const response = await axios.post(
    'https://api.waffo.com/v1/payments',
    {
      amount: 9900,
      currency: 'USD',
      payment_method: {
        type: 'card',
        card: {
          number: '4242424242424242',
          exp_month: 12,
          exp_year: 2026,
          cvc: '123'
        }
      },
      order_id: 'order-001',
      return_url: 'https://yoursite.com/payment/result'
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.WAFFO_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data;
}
```

**Python example:**

```python
import requests
import os

def create_payment():
    response = requests.post(
        'https://api.waffo.com/v1/payments',
        json={
            'amount': 9900,
            'currency': 'USD',
            'payment_method': {
                'type': 'card',
                'token': 'tok_sandbox_xxxx'  # 使用前端 Token 化后的卡 Token
            },
            'order_id': 'order-001',
            'return_url': 'https://yoursite.com/payment/result'
        },
        headers={
            'Authorization': f'Bearer {os.environ["WAFFO_API_KEY"]}',
            'Content-Type': 'application/json'
        }
    )
    return response.json()
```

**Handling Webhook callbacks (Node.js/Express):**

```javascript
const express = require('express');
const crypto = require('crypto');
const app = express();

app.post('/webhooks/waffo', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['waffo-signature'];
  const payload = req.body;

  // 验证签名
  const expectedSig = crypto
    .createHmac('sha256', process.env.WAFFO_WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');

  if (signature !== expectedSig) {
    return res.status(400).send('Invalid signature');
  }

  const event = JSON.parse(payload);

  if (event.type === 'payment.succeeded') {
    // 更新订单状态为已支付
    console.log('Payment succeeded:', event.data.payment_id);
  }

  res.status(200).send('OK');
});
```

## SDK downloads

Waffo officially provides SDKs in the following languages, encapsulating API calls and Webhook signature verification:

| Language | Installation | Source code |
|------|---------|------|
| Node.js | `npm install @waffo/node` | GitHub |
| Python | `pip install waffo` | GitHub |
| PHP | `composer require waffo/waffo-php` | GitHub |
| Java | Maven: `com.waffo:waffo-java` | GitHub |
| Go | `go get github.com/waffo/waffo-go` | GitHub |

All SDKs are open source under the MIT license. If there is no official SDK for your language, you can call the REST API directly, or contact the Waffo technical team to request SDK support.