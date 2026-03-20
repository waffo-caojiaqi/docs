---
title: "Checkout integration"
description: "Integrate Waffo Checkout into your website with both hosted redirect and embedded modes to deliver a complete payment experience."
---

## Integration steps

Waffo Checkout provides two integration modes: **Hosted mode (Hosted)** redirects users to a payment page under the Waffo domain; **Embedded mode (Embedded)** renders the payment UI directly on your web page via the JavaScript SDK.

### System architecture

```
商户系统 -> SDK -> Iframe -> Payment Service -> 支付网关
```

Core component overview:
- **SDK Layer**: Unified API interface that encapsulates underlying communication details
- **UI Components**: Customizable payment form components
- **Payment Engine**: Payment workflow engine that handles the state machine and retry logic
- **Security Layer**: Security and authentication layer responsible for key management and request signing

### Step 1: Create a Checkout Session on the server

```javascript
// Node.js
const Waffo = require('@waffo/node');
const waffo = new Waffo(process.env.WAFFO_SECRET_KEY);

const session = await waffo.checkout.sessions.create({
  payment_method_types: ['card', 'alipay', 'wechat_pay'],
  line_items: [
    {
      price_data: {
        currency: 'usd',
        product_data: { name: '商品名称' },
        unit_amount: 2000,  // $20.00
      },
      quantity: 1,
    },
  ],
  mode: 'payment',
  success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
  cancel_url: 'https://example.com/cancel',
});

// 返回 client_secret 给前端
res.json({ clientSecret: session.client_secret });
```

### Step 2: Initialize the frontend SDK

```html
<script src="https://js.waffo.com/v1/waffo.js"></script>
```

```javascript
const waffoPayment = new WaffoPayment({
  apiKey: 'pk_test_xxx',
  environment: 'test' | 'production',
  locale: 'zh-CN' | 'en-US',
  appearance: {
    theme: 'light' | 'dark' | 'night',
    variables: {
      colorPrimary: '#0570de',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      borderRadius: '4px'
    }
  }
});
```

### Step 3: Mount Checkout

**Hosted mode (Hosted/Redirect):**

```javascript
const checkout = waffoPayment.initCheckout({
  clientSecret: 'cs_xxx',
  successUrl: 'https://example.com/success',
  cancelUrl: 'https://example.com/cancel',
  elementsOptions: { appearance }
});

checkout.mount('#checkout-container');
```

**Embedded mode (Embedded):**

```javascript
const elements = waffoPayment.elements({ appearance, clientSecret });
const paymentElement = elements.create('payment', {
  layout: 'accordion',
  paymentMethodOrder: ['card', 'alipay', 'wechat_pay']
});
paymentElement.mount('#payment-element');

// 提交支付
const { error } = await waffoPayment.confirmPayment({
  elements,
  confirmParams: {
    return_url: 'https://example.com/complete',
  },
});
```

## Parameter configuration

### Core Checkout Session parameters

| Parameter | Type | Required | Description |
|------|------|------|------|
| `payment_method_types` | array | Yes | List of supported payment methods |
| `line_items` | array | Yes | Itemized line items |
| `mode` | string | Yes | `payment` (one-time) or `subscription` (Subscription) |
| `success_url` | string | Yes | Redirect URL after a successful payment |
| `cancel_url` | string | Yes | Redirect URL after the user cancels payment |
| `customer` | string | No | Existing customer ID, used to associate payment records |
| `metadata` | object | No | Custom business data, passed through in Webhooks |
| `expires_at` | timestamp | No | Session expiration time; defaults to 24 hours |

## Customization options

Waffo Checkout supports three levels of customization:

### 1. Merchant Portal (visual configuration)

In **Checkout settings** on [portal.waffo.com](https://portal.waffo.com), configure brand colors, logo, button styles, and more through the visual interface. This configuration is automatically applied to all Hosted-mode Checkout pages.

### 2. API parameters (server-side control)

When creating a Checkout Session, pass configuration via the `appearance` parameter:

```javascript
const session = await waffo.checkout.sessions.create({
  // ...其他参数
  appearance: {
    theme: 'light',
    variables: {
      colorPrimary: '#FF6B35',
    }
  }
});
```

### 3. Client SDK (frontend level)

Pass the `appearance` configuration during SDK initialization; this has the highest priority:

```javascript
const waffoPayment = new WaffoPayment({
  apiKey: 'pk_test_xxx',
  appearance: {
    theme: 'custom',
    variables: {
      colorPrimary: '#2C8CFF',
      colorBackground: '#f8f9fa',
      colorText: '#1a1a2e',
      colorDanger: '#ef4444',
      spacingUnit: '4px',
      borderRadius: '8px',
      fontFamily: '"PingFang SC", "Helvetica Neue", sans-serif'
    }
  }
});
```

### Theme presets

| Theme | Description |
|------|------|
| `light` | Default light theme |
| `dark` | Dark theme |
| `night` | Night mode, suitable for dark-background websites |
| `custom` | Fully custom, used with CSS Variables |

## API reference

For the full set of API parameters and response formats, see:
- [One-time payment API](/developer/api/one-time-payment)
- [Common APIs (refunds, queries, Webhooks)](/developer/api/common)