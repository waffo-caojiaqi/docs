# Payin Overview

Waffo Payin allows merchants to accept payments from customers worldwide using a single unified API.

> [!NOTE]
> Payin supports over 100 payment methods across 50+ countries. See the full list in the Payment Methods reference.

## How it works

1. Your customer initiates checkout on your site.
2. You call `POST /payin/create` with the order details.
3. Waffo returns a `checkout_url` or embeddable SDK token.
4. The customer completes payment via the hosted or embedded flow.
5. Waffo sends a webhook to confirm the transaction status.

> [!TIP]
> Use the Embedded Checkout SDK for the best conversion rates — it keeps users on your page.

## Authentication

All API requests require a Bearer token in the `Authorization` header.

```bash
curl -X POST https://api.waffo.com/payin/create \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"amount": 1000, "currency": "USD", "order_id": "ORD-001"}'
```

> [!WARNING]
> Never expose your API key in client-side code. Always call the Waffo API from your backend server.

## Error handling

| Code | Meaning | Action |
|------|---------|--------|
| `4001` | Invalid API key | Check credentials |
| `4002` | Insufficient funds | Prompt user to use another card |
| `5001` | Provider timeout | Retry with exponential backoff |

> [!IMPORTANT]
> Always handle `5001` errors with a retry strategy. Timeouts are transient and most succeed on retry.
