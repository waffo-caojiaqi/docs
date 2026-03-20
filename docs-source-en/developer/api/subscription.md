---
title: "Subscription payments API"
description: "Waffo subscription payments API documentation, including complete instructions for creating, managing, and querying subscriptions."
---

## Create a subscription

`POST /v1/subscriptions`

Create a new subscription for a specified user and automatically initiate recurring charges based on the billing cycle.

**Request parameters:**

| Parameter | Type | Required | Description |
|------|------|------|------|
| plan_id | string | Yes | Subscription plan ID (created in advance in the Merchant Portal) |
| customer_id | string | Yes | User ID (a Customer object must be created first) |
| payment_method_id | string | Yes | Payment method token used for charging |
| trial_days | integer | No | Trial days; no charges during the trial period |
| start_date | string | No | Subscription start date (ISO 8601 format); starts immediately by default |
| metadata | object | No | Custom extension fields |
| coupon_id | string | No | Coupon ID to apply a discount |

**Response example:**

```json
{
  "id": "sub_def456abc",
  "object": "subscription",
  "status": "active",
  "customer_id": "cus_xyz789",
  "plan": {
    "id": "plan_monthly_basic",
    "amount": 999,
    "currency": "USD",
    "interval": "month",
    "interval_count": 1
  },
  "current_period_start": "2025-01-15T00:00:00Z",
  "current_period_end": "2025-02-15T00:00:00Z",
  "created_at": "2025-01-15T10:30:00Z"
}
```

## Manage subscriptions

**Update a subscription** `PATCH /v1/subscriptions/{subscription_id}`

| Action | Parameter | Description |
|------|------|------|
| Upgrade/downgrade plan | `plan_id` | Switch to another subscription plan; effective immediately or in the next period |
| Change payment method | `payment_method_id` | Update the payment method used for renewals |
| Pause subscription | `pause_collection` | Pause automatic charges while keeping the subscription relationship |
| Resume subscription | Clear `pause_collection` | Resume automatic renewals |

**Cancel a subscription** `DELETE /v1/subscriptions/{subscription_id}`

| Parameter | Type | Description |
|------|------|------|
| cancel_at_period_end | boolean | `true` cancels after the current period ends; `false` cancels immediately |
| cancellation_reason | string | Cancellation reason (optional, for analytics) |

## Subscription queries

**Retrieve a subscription** `GET /v1/subscriptions/{subscription_id}`

Returns full subscription details, including current status, plan information, and the next charge time.

**List subscriptions** `GET /v1/subscriptions`

Supports the following filter parameters:

| Parameter | Description |
|------|------|
| customer_id | Filter by user ID |
| status | Filter by status (active/canceled/past_due/trialing) |
| plan_id | Filter by subscription plan ID |
| created_after | Created time lower bound (Unix timestamp) |
| limit | Number of records to return (1-100, default 20) |
| starting_after | Pagination cursor |

**Subscription-related webhook events:**

| Event | Description |
|------|------|
| subscription.created | Subscription created successfully |
| subscription.updated | Subscription information updated |
| subscription.deleted | Subscription canceled |
| invoice.payment_succeeded | Subscription renewal succeeded |
| invoice.payment_failed | Subscription renewal failed |