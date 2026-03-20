---
title: "Checkout integration"
description: "Waffo hosted checkout integration guide, covering integration steps, parameter configuration, and customization options."
---

## Integration steps

Hosted checkout integration takes only three steps:

**Step 1: Create a payment session**

On your server, call the Waffo API to create a Checkout Session, specifying the payment amount, currency, product information, and callback URLs:

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

**Step 2: Redirect to checkout**

Redirect the user to the `checkout_url` returned in the response. The user completes the payment on the Waffo-hosted page.

**Step 3: Handle the payment result**

- After the user completes the payment, they are redirected back to `success_url` (the URL includes `session_id`)
- At the same time, Waffo sends a `payment.succeeded` event to `webhook_url`
- **Important**: Use the webhook callback as the source of truth to update order status, and do not rely only on the page redirect

## Parameter configuration

Key parameters supported when creating a Checkout Session:

| Parameter | Type | Required | Description |
|------|------|------|------|
| amount | integer | Yes | Payment amount, in the smallest currency unit (e.g., cents) |
| currency | string | Yes | 3-letter ISO currency code, such as USD, EUR |
| order_id | string | Yes | Merchant-side order ID; must be unique |
| success_url | string | Yes | Redirect URL after a successful payment |
| cancel_url | string | Yes | Redirect URL after the user cancels the payment |
| webhook_url | string | No | Payment result callback URL (recommended) |
| customer_email | string | No | Customer email, used to send a payment receipt |
| locale | string | No | Checkout display language, such as zh-CN, en, ja |
| payment_methods | array | No | List of payment methods to display (restricted) |
| metadata | object | No | Custom key-value pairs, returned as-is |

## Customization options

In the Merchant Portal, you can customize the checkout as follows:

- Upload a merchant logo (PNG/SVG supported; recommended size 200×60px)
- Set the theme primary color (HEX color value)
- Configure supported payment methods and display order
- Customize the checkout domain (white-label, e.g., `pay.yourcompany.com`)

## API documentation

For the full parameter descriptions, response formats, and error codes for checkout-related APIs, see the [One-time payment API](/developer/api/one-time-payment) documentation.