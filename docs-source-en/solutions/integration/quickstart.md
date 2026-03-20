---
title: "Quick start"
description: "Complete the basic Waffo integration in 5 minutes—from account registration to initiating your first test payment."
---

## Integration guide

Welcome to Waffo! This guide will help you complete the basic integration in the shortest time and initiate your first test payment.

**Integration steps overview:**

1. Register a Waffo merchant account and complete KYB verification
2. Obtain the sandbox API Key in the Merchant Portal
3. Choose the integration method that fits you best (hosted checkout / embedded components / direct API integration)
4. Follow the corresponding integration documentation to complete development
5. Complete end-to-end testing in the sandbox environment
6. Switch to the production API Key and go live

For the hosted checkout mode, the full integration process can usually be completed within 1 business day; for direct API integration, it typically takes 3–5 business days depending on business complexity.

## Sandbox testing

Waffo provides a complete sandbox testing environment that is functionally identical to production but does not involve real fund movements:

- **Sandbox API endpoint**: `https://sandbox-api.waffo.com`
- **Test card numbers**: Use Waffo’s standard test card numbers (see [Developer tools](/developer/tools/overview) for details)
- **Simulated scenarios**: Supports simulating successful payments, various failures (insufficient funds, invalid card number, etc.), 3DS authentication, and more
- **Webhook testing**: The sandbox supports configuring a test Webhook endpoint; you can use tools such as ngrok to receive callbacks locally

Before going live, we recommend fully testing the following scenarios in the sandbox environment: payment success, payment failure, refunds, and Webhook receipt and processing.

## Authentication configuration

The Waffo API uses API Keys for authentication. All requests must include the following HTTP header:

```
Authorization: Bearer YOUR_API_KEY
```

**Notes:**
- API Keys come in two sets: sandbox (`sk_sandbox_...`) and production (`sk_live_...`). Do not mix them.
- Keep production API Keys secure. Do not commit them to code repositories or expose them in frontend code.
- If you suspect an API Key has been leaked, rotate to a new key immediately in the Merchant Portal.
- We recommend storing API Keys using environment variables or a secrets management service.