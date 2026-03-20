---
title: "Status code reference"
description: "A complete status reference for transactions, orders, and Webhook events in the Waffo payment system, helping you accurately handle various business states."
---

## Transaction statuses

### PaymentIntent status transitions

PaymentIntent (payment intent) is the core object in Waffo that represents a single payment request. Its status transitions follow this flow:

```
created → requires_payment_method → requires_confirmation → requires_action → processing → succeeded
                                                                                         ↘ canceled
```

| Status | Description | Next step |
|------|------|-----------|
| `requires_payment_method` | Waiting to attach a payment method | Guide the user to enter or select a payment method |
| `requires_confirmation` | Payment method attached, awaiting confirmation | Call the `confirm` API to initiate the payment |
| `requires_action` | Additional user action required (e.g., 3DS authentication) | Display the 3DS authentication UI and wait for the user to complete it |
| `processing` | Payment is processing (e.g., bank async processing) | Listen for Webhooks and wait for the final status |
| `succeeded` | Payment succeeded | Complete the order, ship goods / activate the service |
| `canceled` | Payment canceled | Notify the user that the payment was canceled; allow retry as appropriate |

### Payment status

| Status | Description |
|------|------|
| `pending` | Payment is processing |
| `succeeded` | Payment succeeded |
| `failed` | Payment failed |
| `refunded` | Fully refunded |
| `partially_refunded` | Partially refunded |
| `disputed` | Dispute / Chargeback occurred |

## Order statuses

### Checkout Session status

| Status | Description |
|------|------|
| `open` | Session created, waiting for the user to complete payment |
| `complete` | User completed payment |
| `expired` | Session expired (default 24 hours) |

### Refund status

| Status | Description |
|------|------|
| `pending` | Refund processing |
| `succeeded` | Refund succeeded; funds will be returned within 5–10 business days |
| `failed` | Refund failed; manual intervention required |
| `canceled` | Refund canceled |
| `requires_action` | Additional action required by the merchant or user |

### Subscription status

| Status | Description |
|------|------|
| `incomplete` | Initial payment not completed |
| `incomplete_expired` | Initial payment timed out; subscription invalidated |
| `trialing` | In trial period |
| `active` | Subscription active; renews normally on schedule |
| `past_due` | Renewal failed; in dunning period |
| `canceled` | Subscription canceled |
| `unpaid` | Renewal failed and dunning unsuccessful; subscription paused |
| `paused` | Subscription paused (manual action) |

## Webhook event statuses

Waffo pushes payment events to your server in real time via Webhooks. Below is the complete list of event types:

### Payment events

| Event type | Trigger |
|---------|---------|
| `payment_intent.created` | When a PaymentIntent is created |
| `payment_intent.processing` | When the payment starts processing |
| `payment_intent.succeeded` | When the payment succeeds |
| `payment_intent.payment_failed` | When the payment fails |
| `payment_intent.canceled` | When the PaymentIntent is canceled |
| `payment_intent.requires_action` | When user action is required (3DS, etc.) |

### Refund events

| Event type | Trigger |
|---------|---------|
| `charge.refunded` | When the refund succeeds |
| `refund.created` | When a refund request is created |
| `refund.updated` | When the refund status changes |
| `refund.failed` | When the refund fails |

### Subscription events

| Event type | Trigger |
|---------|---------|
| `customer.subscription.created` | When a subscription is created |
| `customer.subscription.updated` | When subscription information changes |
| `customer.subscription.deleted` | When a subscription is canceled |
| `customer.subscription.trial_will_end` | When the trial is about to end (3 days in advance) |
| `invoice.payment_succeeded` | When a subscription renewal succeeds |
| `invoice.payment_failed` | When a subscription renewal fails |

### Dispute events

| Event type | Trigger |
|---------|---------|
| `charge.dispute.created` | When a user initiates a dispute |
| `charge.dispute.updated` | When the dispute status changes |
| `charge.dispute.closed` | When dispute processing ends |

### Payout events

| Event type | Trigger |
|---------|---------|
| `payout.created` | When a Payout is created |
| `payout.paid` | When Payout funds have been credited |
| `payout.failed` | When a Payout fails |
| `payout.canceled` | When a Payout is canceled |

## Example: receiving and handling Webhooks

```javascript
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['waffo-signature'];
  
  let event;
  try {
    event = waffo.webhooks.constructEvent(req.body, signature, process.env.WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // 根据事件类型处理
  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSuccess(event.data.object);
      break;
    case 'payment_intent.payment_failed':
      await handlePaymentFailed(event.data.object);
      break;
    case 'customer.subscription.deleted':
      await handleSubscriptionCanceled(event.data.object);
      break;
    case 'invoice.payment_failed':
      await handleRenewalFailed(event.data.object);
      break;
    default:
      console.log(`未处理的事件类型: ${event.type}`);
  }
  
  res.json({ received: true });
});
```

<Note>
Webhook handling should be idempotent, because Waffo will retry sending the same event in cases such as network timeouts. We recommend checking whether an event has already been processed before handling it.
</Note>