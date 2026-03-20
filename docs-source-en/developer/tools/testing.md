---
title: "Testing tools"
description: "Use the Waffo sandbox environment and test card numbers to validate your payment integration and ensure everything works correctly before going live."
---

## Test environment setup

Waffo provides a dedicated Sandbox test environment that is fully isolated from the production environment. All transactions in the test environment are simulated data and do not involve real fund movements.

### Obtain test keys

Log in to [portal.waffo.com](https://portal.waffo.com), go to “Developer Settings” → “API Keys”, and switch to “Test Mode” to obtain:

- **Test publishable key**: `pk_test_xxx` (for frontend SDK initialization)
- **Test secret key**: `sk_test_xxx` (for server-side API calls)

### Initialize the SDK for the test environment

```javascript
const waffoPayment = new WaffoPayment({
  apiKey: 'pk_test_xxx',
  environment: 'test',  // Explicitly specify the test environment
});
```

```javascript
// Server-side Node.js
const Waffo = require('@waffo/node');
const waffo = new Waffo('sk_test_xxx');
// Test environment API endpoint: https://api-test.waffo.com/v1
```

## Test card numbers

In the test environment, use the following test card numbers to simulate different payment scenarios:

### Successful payment cards

| Card network | Card number | Expiry date | CVV |
|--------|------|----------|-----|
| Visa | `4242 4242 4242 4242` | Any future date | Any 3 digits |
| Mastercard | `5555 5555 5555 4444` | Any future date | Any 3 digits |
| American Express | `3782 8224 6310 005` | Any future date | Any 4 digits |
| UnionPay | `6200 0000 0000 0005` | Any future date | Any 3 digits |
| Visa (3D Secure) | `4000 0027 6000 3184` | Any future date | Any 3 digits |

### Failure scenario cards

| Card number | Triggered scenario | Error code |
|------|---------|--------|
| `4000 0000 0000 0002` | Card declined (generic) | `card_declined` |
| `4000 0000 0000 9995` | Insufficient funds | `insufficient_funds` |
| `4000 0000 0000 0069` | Card expired | `expired_card` |
| `4000 0000 0000 0127` | CVC check failed | `incorrect_cvc` |
| `4000 0000 0000 0119` | Processing error | `processing_error` |
| `4000 0000 0000 0341` | Blocked due to fraud risk | `fraudulent` |

### 3D Secure test cards

| Card number | Behavior |
|------|------|
| `4000 0025 0000 3155` | Always requires 3DS verification |
| `4000 0027 6000 3184` | 3DS verification succeeds |
| `4000 0082 6000 3178` | 3DS verification fails |

## Test scenarios

### Scenario 1: Standard payment success

```javascript
// Complete a normal payment using the Visa test card
const paymentIntent = await waffo.paymentIntents.create({
  amount: 2000,
  currency: 'usd',
  payment_method_types: ['card'],
});

// On the frontend, complete the payment using card number 4242 4242 4242 4242
// Expected result: status changes to succeeded, and you receive the payment_intent.succeeded webhook
```

### Scenario 2: Handling payment failures

```javascript
// Use the insufficient funds test card
// Card number: 4000 0000 0000 9995
// Expected result: receive a card_declined error, and status remains requires_payment_method
```

### Scenario 3: Refund testing

```javascript
// First complete a successful payment, then initiate a refund
const refund = await waffo.refunds.create({
  payment_intent: 'pi_test_xxx',  // PaymentIntent ID that has been successfully paid
  amount: 1000,  // Partial refund
});
// Expected result: status is succeeded, and the refunded field on the original charge is updated
```

### Scenario 4: Webhook testing

Use the Waffo CLI to forward Webhook events to your local environment:

```bash
# Install Waffo CLI
npm install -g @waffo/cli

# Log in
waffo login

# Forward Webhooks to the local development server
waffo listen --forward-to localhost:3000/webhook

# The CLI will output a temporary Webhook signing secret for local verification
```

### Scenario 5: Subscription testing

```javascript
// Create a subscription plan
const subscription = await waffo.subscriptions.create({
  customer: 'cus_test_xxx',
  items: [{ price: 'price_test_xxx' }],
  trial_period_days: 14,
});

// Use the following test card to simulate subscription renewal failures
// Card number: 4000 0000 0000 0341 (succeeds the first time, fails on subsequent attempts)
```

## Test data cleanup

Test environment data is cleaned up periodically, but you can also delete test data manually:

```javascript
// Cancel a test subscription
await waffo.subscriptions.cancel('sub_test_xxx');

// Delete a test customer (also deletes associated payment methods)
await waffo.customers.del('cus_test_xxx');
```

<Note>
Data created in the test environment (customers, payment methods, subscriptions, etc.) does not affect the production environment, so you can run all kinds of tests with confidence.
</Note>

## Switch to the production environment

After testing is complete, replace the keys with production keys and update the SDK initialization configuration:

```javascript
// Production environment configuration
const waffoPayment = new WaffoPayment({
  apiKey: process.env.WAFFO_PUBLIC_KEY,  // pk_live_xxx
  environment: 'production',
});
```

```javascript
// Server-side production secret key
const waffo = new Waffo(process.env.WAFFO_SECRET_KEY);  // sk_live_xxx
```

<Warning>
Before switching to the production environment, make sure:
1. All test scenarios have been validated
2. The Webhook endpoint has been configured and tested
3. Error handling logic is complete
4. Production keys are securely stored in environment variables and not hard-coded in the code
</Warning>