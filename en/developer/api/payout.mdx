---
title: "Payout API"
description: "Waffo Payout API documentation, supporting single and batch payouts, covering major global markets."
---

## Service overview

The Waffo Payout API enables you to send payments to recipients worldwide. Through a unified REST API, merchants can initiate single or batch payouts, supporting multiple payment methods such as bank transfers and digital wallets, covering 100+ countries and regions. All payout requests go through AML compliance screening to ensure fund flows meet local regulatory requirements.

## Create a payout

**Single payout** `POST /v1/payouts`

| Parameter | Type | Required | Description |
|------|------|------|------|
| amount | integer | Yes | Payout amount, in the smallest currency unit |
| currency | string | Yes | Payout currency ISO code |
| recipient | object | Yes | Recipient information (see below) |
| reference_id | string | Yes | Merchant-side unique payout reference number |
| description | string | No | Payout description (shown on the recipient’s bank statement) |
| metadata | object | No | Custom extension fields |

**Recipient fields (`recipient`):**

Bank transfer scenario:
```json
{
  "type": "bank_account",
  "name": "John Doe",
  "bank_code": "021000021",
  "account_number": "1234567890",
  "routing_number": "021000021",
  "country": "US",
  "email": "john@example.com"
}
```

Digital wallet scenario:
```json
{
  "type": "wallet",
  "wallet_type": "gcash",
  "account_number": "+639123456789",
  "name": "Maria Santos"
}
```

**Batch payout** `POST /v1/payouts/batch`

Up to 1000 payouts are supported per request. The request body includes a `payouts` array, where each element has the same structure as a single payout. Batch requests are processed asynchronously, and the processing result of each payout is returned via webhook.

## Retrieve a payout

**Retrieve a single payout** `GET /v1/payouts/{payout_id}`

Returns the current status and full details of the payout.

**Payout statuses:**

| Status | Description |
|------|------|
| pending | Waiting to be processed |
| processing | Processing; submitted to the payment network |
| succeeded | Payout successful; funds have been received |
| failed | Payout failed (see the `failure_reason` field) |
| reversed | Reversed/returned (e.g., due to incorrect recipient information) |

**List payouts** `GET /v1/payouts`

Supports filtering by `reference_id`, status, time range, and more.

**Payout webhook events:**

| Event | Description |
|------|------|
| payout.succeeded | Payout successful; funds received |
| payout.failed | Payout failed |
| payout.reversed | Payout was reversed/returned |