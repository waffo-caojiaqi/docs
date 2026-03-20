---
title: "Quick start"
description: "Use this guide to complete your Waffo Payments integration in minutes and start accepting payments globally."
---

## Integration guide

This guide will help you quickly complete your Waffo Payments integration—from registering an account to completing your first test payment. The entire process typically takes about 30 minutes.

### Prerequisites

Before you start the integration, make sure you have completed the following:

1. **Register a Waffo merchant account** — Go to [portal.waffo.com](https://portal.waffo.com) to complete registration
2. **Obtain API keys** — Get your test keys in **Developer Settings** in the merchant dashboard
3. **Choose an integration method** — Choose [Hosted Checkout](/developer/integration/checkout-integration) or [Frontend Components](/developer/integration/frontend-components) based on your business needs

### API key overview

Waffo provides API keys for two separate environments:

| Key type | Format | Usage |
|---------|------|------|
| Test publishable key | `pk_test_xxx` | Frontend SDK initialization; can be used in the browser |
| Test secret key | `sk_test_xxx` | Server-side API calls; **must never be exposed on the frontend** |
| Live publishable key | `pk_live_xxx` | Frontend usage in production |
| Live secret key | `sk_live_xxx` | Server-side usage in production |

<Warning>
The secret key (Secret Key) must only be used on the server. **Never** put the secret key in frontend code, Git repositories, or any location accessible to clients.
</Warning>

## Sandbox testing

The test environment (sandbox) is completely isolated from production. All test transactions use simulated data and do not involve real fund flows.

### Sandbox environment configuration

```javascript
const waffoPayment = new WaffoPayment({
  apiKey: 'pk_test_xxx',      // 使用测试公钥
  environment: 'test',         // 指定测试环境
});
```

### Quick integration example

The following example shows the most simplified one-time payment integration flow:

**Step 1: Create a payment session on the server**

```javascript
// Node.js 示例
const Waffo = require('@waffo/node');
const waffo = new Waffo('sk_test_xxx');

const paymentIntent = await waffo.paymentIntents.create({
  amount: 1000,          // 金额，单位为最小货币单位（如分）
  currency: 'usd',
  payment_method_types: ['card'],
});

// 将 client_secret 安全地传递给前端
res.json({ clientSecret: paymentIntent.client_secret });
```

**Step 2: Initialize the payment on the frontend**

```html
<script src="https://js.waffo.com/v1/waffo.js"></script>
<div id="checkout-container"></div>

<script>
  const waffoPayment = new WaffoPayment({ apiKey: 'pk_test_xxx', environment: 'test' });
  
  // 从服务端获取 client_secret
  const { clientSecret } = await fetch('/create-payment-intent').then(r => r.json());
  
  const checkout = waffoPayment.initCheckout({
    clientSecret,
    successUrl: 'https://example.com/success',
    cancelUrl: 'https://example.com/cancel',
  });
  
  checkout.mount('#checkout-container');
</script>
```

**Step 3: Handle the payment result**

```javascript
// 服务端 Webhook 处理
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const event = waffo.webhooks.constructEvent(req.body, req.headers['waffo-signature'], 'whsec_xxx');
  
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    // 处理支付成功逻辑，如更新订单状态
    fulfillOrder(paymentIntent.metadata.order_id);
  }
  
  res.json({ received: true });
});
```

## Authentication configuration

All API requests must include authentication information in the HTTP headers:

```http
Authorization: Bearer sk_test_xxx
Content-Type: application/json
```

### Webhook signature verification

To ensure that Webhook requests come from Waffo, verify the request signature:

```javascript
const signature = req.headers['waffo-signature'];
const payload = req.body; // 原始请求体，不要解析为 JSON

try {
  const event = waffo.webhooks.constructEvent(payload, signature, process.env.WEBHOOK_SECRET);
  // 验证通过，处理事件
} catch (err) {
  // 签名验证失败，拒绝请求
  return res.status(400).send('Webhook signature verification failed');
}
```

<Tip>
During development, you can use the Waffo CLI tool to forward Webhook events to your local development server, so you can debug your Webhook handling logic without deploying.
</Tip>

## Next steps

<CardGroup cols={2}>
  <Card title="Checkout integration" icon="credit-card" href="/developer/integration/checkout-integration">
    Use Waffo Hosted Checkout to quickly integrate a complete payment UI
  </Card>
  <Card title="Frontend components" icon="code" href="/developer/integration/frontend-components">
    Embed payment components directly into your page
  </Card>
  <Card title="Testing tools" icon="flask" href="/developer/tools/testing">
    Use test card numbers and test scenarios to validate your integration
  </Card>
  <Card title="API reference" icon="book" href="/developer/api/one-time-payment">
    View the complete API documentation
  </Card>
</CardGroup>