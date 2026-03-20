---
title: "Subscription & Recurring"
description: "Automated, high-success-rate billing solutions for recurring payment scenarios — flexible billing cycles, smart retries, and full lifecycle management."
---

export function CapabilityCard({ icon, title, description }) {
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#ffffff' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{icon}</div>
      <div style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', margin: 0 }}>{title}</div>
      <div style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>{description}</div>
    </div>
  )
}
export function CapabilityGrid({ children }) {
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', margin: '16px 0' }}>{children}</div>
}
export function PaymentMethodPanel({ title, logos = [], features = [] }) {
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', backgroundColor: '#ffffff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ fontSize: '15px', fontWeight: '600', color: '#1e293b' }}>{title}</div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          {logos.map((logo, i) => <span key={i} style={{ padding: '3px 8px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '11px', fontWeight: '700', color: '#374151', backgroundColor: '#f8fafc' }}>{logo}</span>)}
          {logos.length > 0 && <span style={{ fontSize: '18px', color: '#94a3b8', lineHeight: 1 }}>···</span>}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {features.map((feature, i) => (
          <div key={i} style={{ border: '1px solid #f1f5f9', borderRadius: '8px', padding: '12px 14px', backgroundColor: '#fafafa' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <span style={{ color: '#16a34a', flexShrink: 0, marginTop: '1px', fontSize: '14px' }}>✓</span>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>{feature.title}</div>
                {feature.description && <div style={{ fontSize: '13px', color: '#64748b', marginTop: '3px', lineHeight: '1.5' }}>{feature.description}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export function PaymentMethodGrid({ children }) {
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', margin: '16px 0' }}>{children}</div>
}
export function BusinessModelCard({ label, title, tagline, mechanism, bestFor }) {
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', backgroundColor: '#ffffff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#1e293b', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', flexShrink: 0 }}>{label}</div>
        <div style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>{title}</div>
      </div>
      <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px', lineHeight: '1.5' }}>{tagline}</div>
      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', marginBottom: '16px' }}>
        <div style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Mechanism</div>
        <div style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>{mechanism}</div>
      </div>
      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
        <div style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Best For</div>
        <div style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>{bestFor}</div>
      </div>
    </div>
  )
}
export function BusinessModelGrid({ children }) {
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', margin: '16px 0' }}>{children}</div>
}
export function BillingFlowStepper({ title, steps = [], alert }) {
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', backgroundColor: '#ffffff' }}>
      {title && <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '20px' }}>{title}</div>}
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        {steps.map((step, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: i === 0 ? '#1e3a8a' : '#cbd5e1', flexShrink: 0, zIndex: 1 }} />
              {i < steps.length - 1 && <div style={{ flex: 1, height: '1px', backgroundColor: '#cbd5e1' }} />}
            </div>
            <div style={{ marginTop: '10px', paddingRight: '8px', fontSize: '13px', color: '#374151', fontWeight: i === 0 ? '500' : '400', lineHeight: '1.4' }}>{step}</div>
          </div>
        ))}
      </div>
      {alert && (
        <div style={{ marginTop: '20px', border: '1px solid #fca5a5', borderLeft: '4px solid #ef4444', borderRadius: '8px', padding: '16px 16px 16px 20px', backgroundColor: '#fff5f5', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '18px', flexShrink: 0, marginTop: '1px' }}>🛡</span>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#991b1b', marginBottom: '8px' }}>{alert.title}</div>
            {alert.lines.map((line, i) => <div key={i} style={{ fontSize: '13px', color: '#7f1d1d', lineHeight: '1.6', marginBottom: i < alert.lines.length - 1 ? '6px' : 0 }}>{line}</div>)}
          </div>
        </div>
      )}
    </div>
  )
}

## Overview

Providing automated, high-success-rate billing solutions for recurring payment scenarios. Through a mechanism of "one-time authorization, multiple automated deductions," we support flexible billing cycle configurations and smart retries. This helps merchants achieve sustained growth in subscription revenue while optimizing the user experience.

## What is Subscription Payment?

**Subscription Payment**, also known as automatic billing or recurring billing, is a payment model where users sign an agreement/authorization during the initial payment, and the system automatically initiates deductions based on an agreed cycle (weekly/monthly/yearly).

By automating the "payment action," it significantly reduces the friction of renewal operations, serving as the core infrastructure for SaaS services, streaming memberships, and content monetization businesses.

## Core Capabilities

<CapabilityGrid>
  <CapabilityCard
    icon="🗓"
    title="Flexible Billing Cycles"
    description="Supports standard weekly, monthly, quarterly, yearly and a custom day intervals to meet diverse business needs."
  />
  <CapabilityCard
    icon="⚙️"
    title="Smart Retry Mechanism"
    description="Built-in configurable retry strategies (e.g., 24h/48h intervals) that optimize success rates through detailed failure code analysis."
  />
  <CapabilityCard
    icon="🕐"
    title="Full Lifecycle Management"
    description="Provides complete management capabilities from subscription creation, trial periods (free/discounted), automatic deductions, and upgrades/downgrades, to cancellation."
  />
  <CapabilityCard
    icon="🔄"
    title="Account Updater"
    description="Integrated with VAU/ABU services. When a user's card expires or is replaced, card information is automatically updated to maintain subscription continuity."
  />
</CapabilityGrid>

## Use Cases

<CapabilityGrid>
  <CapabilityCard
    icon="📱"
    title="Streaming Services"
    description="Monthly/Annual auto-renewal for video and music platforms."
  />
  <CapabilityCard
    icon="💼"
    title="SaaS Software"
    description="Periodic subscription billing for office tools."
  />
  <CapabilityCard
    icon="📝"
    title="Content Monetization"
    description="Membership services for knowledge columnists."
  />
  <CapabilityCard
    icon="⚡"
    title="Gaming Subscriptions"
    description="Auto-renewal for monthly passes and season game items."
  />
</CapabilityGrid>

---

## Supported Payment Methods

Through Waffo, you can access mainstream payment methods including "Credentials on File" and "Merchant Transactions (MIT)."

<PaymentMethodPanel
  title="Bank Cards (Credit/Debit Cards)"
  logos={["JCB", "Visa", "Mastercard"]}
  features={[
    {
      title: "Tokenization Security",
      description: "A Token is created upon the first payment. Subsequent deductions use the MIT (Merchant Initiated Transaction) mode, requiring no CVV re-entry.",
    },
    {
      title: "3DS Smart Verification",
      description: "Mandatory 3DS verification for the initial signing ensures legal authorization, while subsequent auto-debits are exempted to balance security and experience.",
    },
    {
      title: "Auto-Update",
      description: "Supports VAU (Visa Account Updater) and ABU (Automatic Billing Updater).",
    },
  ]}
/>

<PaymentMethodGrid>
  <PaymentMethodPanel
    title="Digital Wallets"
    logos={["Apple Pay", "Google Pay"]}
    features={[
      {
        title: "Native Experience",
        description: "Utilize device biometrics for the initial authorization.",
      },
      {
        title: "Token Status Awareness",
        description: "Receive real-time notifications on Token status changes (e.g., suspensions, restorations), such as Apple.",
      },
    ]}
  />
  <PaymentMethodPanel
    title="Local Payment Methods"
    logos={["PayPay", "Paidy", "ZaloPay", "DANA"]}
    features={[
      {
        title: "Supports subscription bind-to-debit capabilities, aligning with local user habits.",
      },
    ]}
  />
</PaymentMethodGrid>

[View full list of supported payment methods →](/products/payment-methods)

---

## Subscription Models & Experience

Waffo Subscription Payment offers flexible business model configurations to adapt to different commercial strategies.

### Core Business Models

You can select the subscription model via the Dashboard or API:

<BusinessModelGrid>
  <BusinessModelCard
    label="A"
    title="Service-First"
    tagline="Prioritize service continuity; tolerate payment latency."
    mechanism="If the current deduction fails, the service is not interrupted. The next deduction is created as planned; 'concurrent billing cycles' (accumulated bills) are allowed."
    bestFor="Video streaming, SaaS software, and services focused on user retention."
  />
  <BusinessModelCard
    label="B"
    title="Payment-First"
    tagline="Strictly 'pay before service'; zero tolerance for arrears."
    mechanism="If the current deduction fails, the service is immediately suspended, and the creation of future billing tasks halts until payment is successful."
    bestFor="Physical subscription boxes, game items, and cost-sensitive businesses."
  />
</BusinessModelGrid>

---

## Deduction & Retry Logic

The system automatically handles the billing flow to maximize success and minimize manual intervention:

<BillingFlowStepper
  title="Billing Flow"
  steps={[
    "Expiry Detection",
    "Generate MIT Order",
    "Initiate Deduction",
    "Success Notification / Failure Retry",
  ]}
  alert={{
    title: "Failure Handling",
    lines: [
      "Default strategy retries 24 hours after failure, and again 48 hours later (parameters configurable).",
      "Supports triggering automatic payment failure notifications via email to guide users to update their payment method.",
    ],
  }}
/>

---

## Integration

We provide multiple integration methods to help you seamlessly embed subscription capabilities into your business system.

### Hosted Checkout

**Scenario:** Limited development resources; need to launch subscription features quickly.

Users are redirected to Waffo's secure hosted checkout page to complete the initial signing payment.

<CardGroup cols={2}>
  <Card title="Seamless flow" icon="mobile">
    The page automatically handles 0-amount pre-auth or first-period payment logic.
  </Card>
  <Card title="Brand customization" icon="paintbrush">
    Supports customizing logo, colors, and UI to match your brand identity.
  </Card>
</CardGroup>

### API Integration

**Scenario:** Full control over the frontend interaction flow; use Webhooks to handle subsequent logic.

**Core endpoints overview:**

| Endpoint | Description |
|---|---|
| `POST /subscription/create` | Create subscription order, initiate signing |
| `POST /subscription/cancel` | Cancel subscription |
| `POST /subscription/change` | Support plan upgrades/downgrades |

**Flexibility:** Complete control over the frontend interaction flow; use Webhooks to handle subsequent logic.

[View Subscription Payment API Documentation →](/api-reference/subscription)
