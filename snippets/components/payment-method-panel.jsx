/**
 * PaymentMethodPanel - Card showing a payment method category with supported logos
 * and a checklist of features.
 *
 * Props:
 *   title      - Payment method category name (e.g. "Bank Cards (Credit/Debit Cards)")
 *   logos      - Array of string labels for supported networks (e.g. ["JCB", "Visa", "Mastercard"])
 *   features   - Array of { title, description } objects
 *   wide       - Boolean, renders full-width style (default false = half-width)
 *
 * Usage:
 *   import { PaymentMethodPanel, PaymentMethodGrid } from '/snippets/components/payment-method-panel.jsx'
 *
 *   <PaymentMethodPanel
 *     title="Bank Cards (Credit/Debit Cards)"
 *     logos={["JCB", "Visa", "Mastercard"]}
 *     features={[
 *       { title: "Tokenization Security", description: "A Token is created on first payment..." },
 *       { title: "3DS Smart Verification", description: "Mandatory 3DS for initial signing..." },
 *     ]}
 *     wide
 *   />
 */
export function PaymentMethodPanel({ title, logos = [], features = [], wide = false }) {
  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '20px',
      backgroundColor: '#ffffff',
      ...(wide ? {} : {}),
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
      }}>
        <div style={{ fontSize: '15px', fontWeight: '600', color: '#1e293b' }}>{title}</div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          {logos.map((logo, i) => (
            <span key={i} style={{
              padding: '3px 8px',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: '700',
              color: '#374151',
              backgroundColor: '#f8fafc',
              letterSpacing: '0.02em',
            }}>
              {logo}
            </span>
          ))}
          {logos.length > 0 && (
            <span style={{ fontSize: '18px', color: '#94a3b8', lineHeight: 1 }}>···</span>
          )}
        </div>
      </div>

      {/* Feature checklist */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {features.map((feature, i) => (
          <div key={i} style={{
            border: '1px solid #f1f5f9',
            borderRadius: '8px',
            padding: '12px 14px',
            backgroundColor: '#fafafa',
          }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <span style={{
                color: '#16a34a',
                flexShrink: 0,
                marginTop: '1px',
                fontSize: '14px',
              }}>
                ✓
              </span>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>
                  {feature.title}
                </div>
                {feature.description && (
                  <div style={{
                    fontSize: '13px',
                    color: '#64748b',
                    marginTop: '3px',
                    lineHeight: '1.5',
                  }}>
                    {feature.description}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * PaymentMethodGrid - Responsive 2-column grid for PaymentMethodPanel.
 */
export function PaymentMethodGrid({ children }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
      margin: '16px 0',
    }}>
      {children}
    </div>
  )
}
