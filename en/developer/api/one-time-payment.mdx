---
title: "One-time payment API"
description: "Waffo one-time payment API documentation, including complete instructions for creating payments, retrieving payments, and confirming payments."
---

## Create a payment

`POST /v1/payments`

Create a new payment order. Supports both Hosted Checkout and API direct integration modes.

**Request parameters:**

| Parameter | Type | Required | Description |
|------|------|------|------|
| amount | integer | Yes | Payment amount, in the smallest currency unit (e.g., cents for USD) |
| currency | string | Yes | 3-letter ISO 4217 currency code, such as `USD`, `EUR`, `JPY` |
| order_id | string | Yes | Merchant-side unique order ID, length 1–64 characters |
| payment_method | object | No | Payment method information (required for API direct integration mode) |
| return_url | string | No | Redirect URL after payment completion (required for 3DS or redirect-based payments) |
| webhook_url | string | No | Webhook callback URL for payment results |
| customer | object | No | Customer information (email, name, phone, etc.) |
| metadata | object | No | Custom extension fields, returned as-is and not used in business logic |
| capture_method | string | No | `automatic` (default) or `manual` (pre-authorization mode) |
| description | string | No | Payment description, shown on the customer's statement |

**Response example:**

```json
{
  "id": "pay_abc123xyz",
  "object": "payment",
  "amount": 9900,
  "currency": "USD",
  "status": "succeeded",
  "order_id": "order-001",
  "created_at": "2025-01-15T10:30:00Z",
  "payment_method": {
    "type": "card",
    "card": {
      "brand": "visa",
      "last4": "4242",
      "exp_month": 12,
      "exp_year": 2026
    }
  }
}
```

## Retrieve a payment

`GET /v1/payments/{payment_id}`

Retrieve the details and current status of a single payment by payment ID.

**Path parameters:**

| Parameter | Description |
|------|------|
| payment_id | Payment ID, a string starting with `pay_` |

**Payment status reference:**

| Status | Description |
|------|------|
| pending | Payment created, awaiting customer action |
| processing | Payment processing |
| succeeded | Payment succeeded |
| failed | Payment failed |
| canceled | Payment canceled |
| requires_action | Additional customer action required (e.g., 3DS authentication) |

## Confirm a payment

`POST /v1/payments/{payment_id}/confirm`

Confirm/capture a payment that is in `requires_action` status or a pre-authorized payment.

**Request parameters:**

| Parameter | Type | Required | Description |
|------|------|------|------|
| payment_method | object | No | Update the payment method (for scenarios where the customer changes the payment method) |
| amount | integer | No | Capture amount (used for partial capture on pre-authorization; if omitted, captures the full amount) |

**Error code reference:**

For the complete list of error codes, see the error codes section in the [Common API](/developer/api/common) documentation, or use the [Error code lookup tool](/developer/tools/overview) in the Merchant Portal.