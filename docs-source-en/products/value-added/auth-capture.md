---
title: "Auth & Capture | Authorization and capture"
description: "Two-step payment: freeze funds first (Authorization), then charge the actual amount (Capture). Suitable for scenarios such as AI usage-based billing, charging after e-commerce shipment, and travel deposits. / Two-phase payment: freeze funds first (Authorization), then charge actuals (Capture). Ideal for usage-based billing, e-commerce shipment models, and deposit-based services."
---
## Chinese version

### Product overview

Auth & Capture splits a payment into two independent steps:

- **Authorization (pre-authorization)**: Sends a hold request to the issuing bank, locking the specified amount in the user’s account, but funds have not actually been transferred.
- **Capture**: After the authorization succeeds, initiates the actual funds transfer and completes the final charge.

This differs from **Sale (instant charge)**—Sale completes authorization and charging in a single request, and funds transfer immediately. Auth & Capture leaves an operational window between the two.

<Note>
The authorization validity period is typically **7–30 days** (varies by card scheme and issuer rules). Authorizations that are not captured before expiry will automatically lapse, and the held amount will be released automatically.
</Note>

---

### Core value

<CardGroup cols={3}>
  <Card title="Fund security and anti-fraud" icon="shield-check">
    Ensure sufficient funds before delivering high-cost services. If fraud is detected, void the authorization directly (Void). **No funds actually move, zero loss**.
  </Card>
  <Card title="Accurate billing experience" icon="calculator">
    Supports the “hold the maximum, charge the actual” logic. Users only pay for actual usage, and the remaining held amount is automatically released, fitting **non-fixed pricing scenarios**.
  </Card>
  <Card title="Lower refund costs" icon="arrow-turn-down-left">
    Void (reversal) does not incur bank fees and restores the user’s available balance faster; it is better than Refund—Refund occurs after funds have been transferred and must be returned via the original route, which is more costly.
  </Card>
</CardGroup>

---

### Core use cases

<CardGroup cols={3}>
  <Card title="AI and usage-based services" icon="microchip-ai">
    Before the job starts, authorize and hold the maximum fee (e.g., $10). After the job completes, capture based on actual consumption (e.g., 5000 Tokens = $4.50), and automatically release the remaining $5.50. Applicable to GPU inference, cloud functions, API calls, etc.
  </Card>
  <Card title="Physical e-commerce: charge after shipment" icon="box">
    Authorize and hold $100 at checkout, then capture the actual amount upon shipment. Avoid refund-related financial mess caused by overselling, consistent with standard practices on major e-commerce platforms such as Amazon.
  </Card>
  <Card title="Travel and rental deposit guarantee" icon="building">
    Hold a deposit at check-in/pickup (e.g., $200). After checkout/return, capture based on actual charges and automatically release any excess. No after-the-fact refund operation is required.
  </Card>
</CardGroup>

---

### Payment flow

<Steps>
  <Step title="Create an authorization">
    The merchant calls `POST /payments`, sets `capture_method` to `manual`, and specifies the amount to hold. After issuer verification succeeds, it returns the `payment.authorized` status and the funds are held.
  </Step>
  <Step title="Execute business logic">
    Within the authorization validity period, the merchant completes service delivery, shipment confirmation, fee calculation, and other business operations to determine the final charge amount.
  </Step>
  <Step title="Initiate capture">
    Call `POST /payments/{id}/capture` and pass the actual charge amount (≤ the authorized amount). Funds are formally transferred and the order is completed. Any remaining held amount is automatically released.
  </Step>
  <Step title="(Optional) Void the authorization">
    If the transaction needs to be canceled, call `POST /payments/{id}/void`. The authorization is voided immediately, with no fees, and the user’s available balance recovers quickly.
  </Step>
</Steps>

---

### Key capabilities and operations

#### Partial capture

The captured amount can be less than the authorized amount, and the difference is automatically released back to the user’s account. No manual operation is needed; the system automatically handles the remaining hold.

**Example:**
- Authorized amount: $10.00
- Actual consumption (5000 Tokens): $4.50
- Automatically released: $5.50

#### Authorization void (Void) vs. refund (Refund)

| Dimension | Void (reversal) | Refund |
|---|---|---|
| When it occurs | **Before** Capture | **After** Capture |
| Funds movement | None (hold release only) | Yes (funds have been transferred and must be returned via the original route) |
| Bank fees | None | Usually incurred |
| User balance recovery | Fast (typically immediate or within hours) | Slower (typically 3–10 business days) |
| Merchant cost | Low | Higher |

<Note>
**Best practice**: If an issue is found before Capture (e.g., fraud, order cancellation), prioritize **Void** rather than waiting for settlement and then refunding.
</Note>

#### Auto-release on expiry

If the authorization expires (typically 7–30 days) and Capture is not initiated, the system automatically releases the held amount. Merchants should capture within the validity period or proactively void to avoid long-term fund holds that negatively impact user experience.

---

### Integration and configuration

#### API integration

**1. Create an authorization**

```http
POST /payments
Content-Type: application/json

{
  "amount": 1000,
  "currency": "USD",
  "capture_method": "manual",
  "payment_method": { ... }
}
```

**2. Initiate capture**

```http
POST /payments/{payment_id}/capture
Content-Type: application/json

{
  "amount": 450
}
```

**3. Void the authorization**

```http
POST /payments/{payment_id}/void
```

#### Webhook event notifications

| Event name | When it triggers |
|---|---|
| `payment.authorized` | Authorization succeeds; funds are held |
| `payment.captured` | Capture succeeds; funds transfer completed |
| `payment.voided` | Authorization void succeeds |
| `payment.authorization_expired` | Authorization expires and is automatically released |

---
## English Version

### Overview

Auth & Capture splits a payment into two distinct phases:

- **Authorization**: A hold request sent to the card issuer that locks a specified amount in the cardholder's account. No funds are transferred yet.
- **Capture**: The actual fund transfer that completes the payment, initiated after the authorization hold is in place.

This differs from a **Sale (instant debit)**, where authorization and capture happen in a single request with immediate fund transfer. Auth & Capture introduces a controlled window between the two events for business operations.

<Note>
Authorization holds typically expire after **7–30 days** depending on card network and issuer rules. Uncaptured authorizations are automatically released when they expire.
</Note>

---

### Core value

<CardGroup cols={3}>
  <Card title="Security & anti-fraud" icon="shield-check">
    Verify funds are available before delivering costly services. If fraud is detected, simply Void the authorization — **no funds move, zero financial loss**.
  </Card>
  <Card title="Precision billing" icon="calculator">
    Authorize the maximum expected amount, capture only the actual usage. Users are charged exactly what they consume. Ideal for **variable-cost pricing models**.
  </Card>
  <Card title="Lower reversal costs" icon="arrow-turn-down-left">
    Void has no bank fees and restores the customer's credit limit faster than a Refund — which requires funds to physically move back through the payment network.
  </Card>
</CardGroup>

---

### Use cases

<CardGroup cols={3}>
  <Card title="AI & usage-based services" icon="microchip-ai">
    Auth $10 max before a GPU task starts. Capture $4.50 actual cost (5,000 tokens). Release the remaining $5.50 automatically. Applicable to GPU inference, cloud functions, and metered APIs.
  </Card>
  <Card title="E-commerce shipment model" icon="box">
    Auth on order placement, Capture on shipment confirmation. Eliminates oversell-driven refund chaos. This is the standard practice for Amazon and major e-commerce platforms.
  </Card>
  <Card title="Travel & rental deposits" icon="building">
    Auth a deposit (e.g., $200) at check-in or vehicle pickup. Capture actual charges at checkout or return. No post-fact refund needed for unused deposit amounts.
  </Card>
</CardGroup>

---

### Payment flow

<Steps>
  <Step title="Create Authorization">
    Call `POST /payments` with `capture_method: manual` and the maximum amount to freeze. Once the issuer approves, the payment enters `payment.authorized` status and the funds are held.
  </Step>
  <Step title="Execute business logic">
    Within the authorization window, complete your business operations — service delivery, shipment confirmation, or usage metering — to determine the final charge amount.
  </Step>
  <Step title="Initiate Capture">
    Call `POST /payments/{id}/capture` with the actual amount to charge (must be ≤ the authorized amount). Funds transfer is completed and any remaining hold is automatically released.
  </Step>
  <Step title="(Optional) Void Authorization">
    To cancel the transaction before capture, call `POST /payments/{id}/void`. The authorization is immediately released with no fees charged and the customer's credit is restored promptly.
  </Step>
</Steps>

---

### Key capabilities

#### Partial capture

The capture amount can be less than the authorized amount. The difference is automatically released back to the cardholder — no manual intervention required.

**Example:**
- Authorized amount: $10.00
- Actual usage (5,000 tokens): $4.50
- Auto-released: $5.50

#### Void vs. Refund

| Dimension | Void | Refund |
|---|---|---|
| When | **Before** Capture | **After** Capture |
| Fund movement | None (hold released) | Funds move back to customer |
| Bank fees | None | Typically applicable |
| Credit restoration speed | Fast (often instant to hours) | Slow (typically 3–10 business days) |
| Merchant cost | Low | Higher |

<Note>
**Best practice**: If an issue (fraud, cancellation) is identified before Capture, always prefer **Void** over waiting to Refund after funds have settled.
</Note>

#### Auto-release

If an authorization is not captured within its validity window (typically 7–30 days), the system automatically releases the hold. Merchants should capture or void within the window to avoid prolonged holds that degrade customer experience.

---

### Integration

#### API endpoints

**1. Create Authorization**

```http
POST /payments
Content-Type: application/json

{
  "amount": 1000,
  "currency": "USD",
  "capture_method": "manual",
  "payment_method": { ... }
}
```

**2. Capture funds**

```http
POST /payments/{payment_id}/capture
Content-Type: application/json

{
  "amount": 450
}
```

**3. Void Authorization**

```http
POST /payments/{payment_id}/void
```

#### Webhook events

| Event | Trigger |
|---|---|
| `payment.authorized` | Authorization approved, funds held |
| `payment.captured` | Capture complete, funds transferred |
| `payment.voided` | Authorization successfully voided |
| `payment.authorization_expired` | Authorization expired, hold auto-released |

---

### FAQ

**Q: Can I capture more than the authorized amount?**

No. Capture amount must be ≤ the original authorized amount. To charge a higher amount, you must create a new authorization.

**Q: Can I perform multiple partial captures on one authorization?**

This depends on card network rules and Waffo configuration. Some networks support multi-capture; others require a new authorization per capture. Contact your Waffo account manager to enable this.

**Q: What happens if I forget to capture or void before expiry?**

The authorization expires automatically and the hold is released. No funds are transferred. You would need to create a new authorization to proceed with the payment.

**Q: Is Auth & Capture available for all payment methods?**

Auth & Capture is primarily supported for card-based payment methods (Visa, Mastercard, etc.). Availability for alternative payment methods (wallets, bank transfers) varies. Check with your Waffo integration team.