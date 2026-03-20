---
title: "Tokenization | Tokenized payments"
description: "Replace sensitive card numbers with a secure random string (Waffo Token), enabling one-click checkout and recurring billing without merchants ever handling raw card data."
---
## Chinese version

### Product overview

Tokenization technology replaces sensitive card information with a non-sensitive random string (**Waffo Token**), enabling merchants to securely store users’ payment details without ever handling the original card number.

Waffo provides a standardized Token solution. Merchants only need to integrate a unified Token API to enable “one-click payment” and “recurring charges”, without dealing with the complex underlying card network rules and security encryption details.

<Note>
Tokens are not stored on the merchant’s servers. All credentials are securely hosted in Waffo’s PCI-DSS Level 1 vault. The merchant system only stores the non-payable `token_id`, significantly reducing the scope of compliance audits.
</Note>

---

### Core value

<CardGroup cols={3}>
  <Card title="Ultimate payment experience" icon="bolt">
    Users only need to enter their card details once. Subsequent purchases require no repeated input, significantly reducing checkout friction and improving conversion rates.
  </Card>
  <Card title="Lower compliance costs" icon="shield-check">
    Sensitive data is hosted in Waffo’s PCI-DSS Level 1 vault. Merchant systems do not need to process plaintext card numbers, substantially reducing the compliance audit scope and ongoing maintenance costs.
  </Card>
  <Card title="Universal across channels" icon="globe">
    Generated Tokens can be used across all channels, including your app, web, and mobile web, helping you build a unified user payment account system.
  </Card>
</CardGroup>

---

### Why choose Waffo Tokenization

<CardGroup cols={2}>
  <Card title="Smart payment optimization (Smart Optimization)" icon="microchip-ai">
    Waffo leverages multiple industry-leading optimization technologies at the underlying layer. When you initiate a charge with a Waffo Token, the smart engine automatically selects the optimal message format and routing strategy based on issuer preferences, transaction type, and risk characteristics.

    - **Higher authorization approval rates**: Compared to traditional PAN-based payments, Token transactions can receive better issuer responses.
    - **Zero-configuration and seamless**: All optimizations are completed automatically within milliseconds, requiring no additional merchant configuration.
  </Card>
  <Card title="Automatic card updates (Account Updater)" icon="arrows-rotate">
    Waffo is deeply integrated with major card network rails and supports automated card lifecycle management.

    - **Automatic continuity**: When a user’s physical card expires, is replaced after being reported lost, or the card number changes, the system automatically retrieves the latest card information.
    - **Zero business interruption**: Waffo silently updates the mapping in the background. Your `token_id` string remains unchanged but now points to the new card, ensuring Subscription charges do not fail due to card replacement.
  </Card>
</CardGroup>

---

### Key use cases

<CardGroup cols={3}>
  <Card title="One-click checkout (One-Click Checkout)" icon="cursor-arrow-rays">
    **Scenario**: A returning customer shops again with the merchant.

    The user completes Tokenization during the first checkout, and the Token is saved to the merchant system. On subsequent purchases, the user only needs to confirm, and the system automatically charges using the Token—no need to re-enter the card number.
  </Card>
  <Card title="Subscriptions and auto-renewals (Recurring)" icon="calendar-check">
    Suitable for SaaS Subscriptions, membership renewals, and similar scenarios.

    Obtain a Token on the first payment. At each billing cycle, the system automatically initiates an MIT (Merchant Initiated Transaction) charge using the Token, with no user involvement.
  </Card>
  <Card title="Bookings and delayed capture (Booking)" icon="hotel">
    Suitable for hotel bookings, car rentals, and ticket booking services.

    Create a Token at booking time and verify card validity (zero-amount or small-amount verification). Initiate the actual charge after the service is completed (e.g., after checkout).
  </Card>
</CardGroup>

---

### Lifecycle management flow

<Steps>
  <Step title="Create token (Create Token)">
    The user enters card details for the first time and authorizes storage. After Waffo encrypts and processes the data, it generates a Waffo Token and returns the `token_id` to the merchant. The merchant stores the `token_id` in its own system for subsequent charges.

    ```http
    POST /tokens
    ```
  </Step>
  <Step title="Verify & charge (Verify & Charge)">
    Initiate an MIT charge using the `token_id` without requiring the user to re-enter card details. Waffo automatically handles 3DS exemption and routing optimization logic.

    ```http
    POST /payments
    {
      "token_id": "tok_xxxxxxxx",
      "amount": 2000,
      "currency": "USD"
    }
    ```
  </Step>
  <Step title="Manage (Manage)">
    Merchants can query the user’s saved card list (`token_id` + last four digits + brand) and allow users to delete a specific card. The automatic card update mechanism silently maintains Token validity in the background without merchant intervention.

    ```http
    GET  /tokens              # 查询卡片列表
    DELETE /tokens/{token_id} # 删除指定卡片
    ```
  </Step>
</Steps>

---

### Integration and migration

#### Integration options

| Method | Description | Applicable scenarios |
|---|---|---|
| **Frontend SDK** | Embedded Token authorization UI in the checkout; Waffo hosts the card input form | Fast integration, minimal PCI compliance scope |
| **API-only** | Merchant builds a custom UI and submits card details via API to create Tokens | Custom checkout experience required; PCI SAQ-D required |

#### Data migration (Data Migration)

Supports migrating existing Tokens from other PSPs to Waffo to protect your existing user assets without requiring users to re-link cards. Please contact your Customer Success Manager for a dedicated migration plan.

---

### FAQ

**Q: Do Tokens expire?**

Waffo Tokens themselves do not have an expiration date. When the underlying card expires, the Account Updater mechanism automatically retrieves the new card information and updates the mapping, so the `token_id` you hold remains valid.

**Q: Can one card generate multiple Tokens?**

Yes. The same card can generate multiple independent `token_id` values across different merchants or different business scenarios. Each Token is isolated and does not affect others.

**Q: Can a Token be restored after a user deletes it?**

No. Once a Token is deleted, it is permanently deactivated and cannot be restored. To use it again, the user must re-authorize card linking and generate a new `token_id`.

**Q: Which card networks does Tokenization support?**

Waffo Tokenization supports major international card networks such as Visa, Mastercard, and American Express, as well as some local card networks. For specific coverage, please consult your Waffo integration team.

---
## English Version

### Overview

Tokenization replaces sensitive card data with a secure, non-sensitive random string — the **Waffo Token** — enabling merchants to store payment credentials safely without ever touching raw card numbers.

Waffo provides a unified Token API so merchants can implement one-click checkout and recurring billing through a single integration, without worrying about the underlying complexities of card network protocols or encryption standards.

<Note>
Tokens are never stored on the merchant's servers. All credentials are secured in Waffo's PCI-DSS Level 1 vault. Merchants retain only a non-chargeable `token_id`, significantly reducing compliance audit scope.
</Note>

---

### Core Value

<CardGroup cols={3}>
  <Card title="Frictionless UX" icon="bolt">
    Cardholders enter their card details once and pay forever after. Eliminating re-entry at checkout dramatically reduces abandonment and increases conversion.
  </Card>
  <Card title="Reduced Compliance Scope" icon="shield-check">
    Sensitive card data is vaulted in Waffo's PCI-DSS Level 1 environment. Merchant systems never handle plaintext card numbers, shrinking PCI audit scope and ongoing compliance overhead.
  </Card>
  <Card title="Omnichannel Ready" icon="globe">
    A single Token works across your iOS app, web storefront, and mobile browser — building a unified payment identity for every customer across all channels.
  </Card>
</CardGroup>

---

### Why Choose Waffo Tokenization

<CardGroup cols={2}>
  <Card title="Smart Payment Optimization" icon="microchip-ai">
    Waffo applies industry-leading optimization techniques under the hood. When a charge is initiated with a Waffo Token, the intelligent routing engine selects the optimal message format and route based on issuer preferences, transaction type, and risk profile.

    - **Higher authorization rates**: Token-based transactions consistently outperform raw card number payments with issuers.
    - **Zero configuration**: All optimizations complete in milliseconds with no additional setup required from merchants.
  </Card>
  <Card title="Account Updater" icon="arrows-rotate">
    Waffo is deeply integrated with major card network update services, automating the full card lifecycle.

    - **Automatic re-linkage**: When a physical card expires, is reported lost, or has its number changed, the system automatically retrieves the updated card details.
    - **Zero business disruption**: Waffo silently updates the internal mapping. Your `token_id` string stays the same but now points to the new card, ensuring subscription charges never fail due to a card replacement.
  </Card>
</CardGroup>

---

### Use Cases

<CardGroup cols={3}>
  <Card title="One-Click Checkout" icon="cursor-arrow-rays">
    **Scenario**: A returning customer makes another purchase.

    Tokenize at first checkout and store the `token_id`. On the next visit, the customer confirms and the charge completes automatically — no card re-entry required.
  </Card>
  <Card title="Recurring & Subscription" icon="calendar-check">
    Ideal for SaaS subscriptions, membership renewals, and any periodic billing model.

    Acquire the Token on the first payment. On each billing cycle, the system automatically initiates an MIT (Merchant Initiated Transaction) charge — no cardholder interaction needed.
  </Card>
  <Card title="Booking & Delayed Charge" icon="hotel">
    Ideal for hotel reservations, car rentals, and ticketing services.

    Tokenize and verify the card at booking time (via a zero-amount or micro-authorization), then initiate the actual charge when the service is delivered (e.g., at checkout).
  </Card>
</CardGroup>

---

### Token Lifecycle

<Steps>
  <Step title="Create Token">
    The cardholder enters their card details and authorizes storage. Waffo encrypts the data and returns a `token_id` to the merchant. The merchant stores only the `token_id` for future use.

    ```http
    POST /tokens
    ```
  </Step>
  <Step title="Verify & Charge">
    Use the `token_id` to initiate an MIT charge. No cardholder input is required. Waffo automatically handles 3DS exemption logic and intelligent routing.

    ```http
    POST /payments
    {
      "token_id": "tok_xxxxxxxx",
      "amount": 2000,
      "currency": "USD"
    }
    ```
  </Step>
  <Step title="Manage & Display">
    Merchants can retrieve a customer's saved card list (`token_id` + last four digits + brand), and allow users to delete specific cards. The Account Updater silently maintains Token validity in the background — no merchant action required.

    ```http
    GET    /tokens              # List saved cards
    DELETE /tokens/{token_id}   # Remove a card
    ```
  </Step>
</Steps>

---

### Integration & Migration

#### Integration Methods

| Method | Description | Best For |
|---|---|---|
| **Frontend SDK** | Waffo-hosted card input form embedded in checkout UI | Fast integration, minimal PCI scope |
| **Pure API** | Merchant-built UI submits card data via API to create a Token | Custom checkout experience; requires PCI SAQ-D |

#### Data Migration

Existing tokens from other PSPs can be migrated to Waffo, preserving your customers' saved payment methods without requiring them to re-enter card details. Contact your Waffo Customer Success Manager for a dedicated migration plan.

---

### FAQ

**Q: Do Waffo Tokens expire?**

Waffo Tokens themselves do not have an expiry date. When the underlying physical card expires, the Account Updater mechanism automatically retrieves the new card details and updates the internal mapping. Your `token_id` remains valid continuously.

**Q: Can a single card generate multiple Tokens?**

Yes. The same card can be tokenized multiple times across different merchants or business contexts, generating independent `token_id` values. Each Token is isolated and does not affect others.

**Q: Can a deleted Token be restored?**

No. Once a Token is deleted it is permanently invalidated and cannot be recovered. To resume using that card, the customer must re-authorize and a new `token_id` will be issued.

**Q: Which card networks does Waffo Tokenization support?**

Waffo Tokenization supports all major international card networks including Visa, Mastercard, and American Express, as well as select local card schemes. Contact your Waffo integration team for the full list of supported networks in your target markets.