---
title: "API集成"
description: "通过 Waffo REST API 直接集成支付，提供完整的代码示例和 SDK 下载。"
---

## 代码示例

以下示例展示如何通过 Waffo API 直接创建支付并处理结果。

**Node.js 示例：**

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

**Python 示例：**

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

**处理 Webhook 回调（Node.js/Express）：**

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

## SDK下载

Waffo 官方提供以下语言的 SDK，封装了 API 调用和 Webhook 签名验证：

| 语言 | 安装方式 | 源码 |
|------|---------|------|
| Node.js | `npm install @waffo/node` | GitHub |
| Python | `pip install waffo` | GitHub |
| PHP | `composer require waffo/waffo-php` | GitHub |
| Java | Maven: `com.waffo:waffo-java` | GitHub |
| Go | `go get github.com/waffo/waffo-go` | GitHub |

所有 SDK 均开源，遵循 MIT 协议。如您使用的语言暂无官方 SDK，可直接调用 REST API，或联系 Waffo 技术团队申请 SDK 支持。
