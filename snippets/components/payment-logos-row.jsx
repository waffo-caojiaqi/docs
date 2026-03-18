/**
 * PaymentLogosRow - Displays a row of payment method logos as styled badges.
 * Matches the Figma "Supported Payment Methods" section design.
 *
 * Usage in MDX:
 *   import { PaymentLogosRow, PaymentMethodsSection } from '/snippets/components/payment-logos-row.jsx'
 *
 *   <PaymentMethodsSection
 *     groups={[
 *       {
 *         label: 'Credit Cards',
 *         methods: ['Visa', 'Mastercard', 'Amex', 'JCB', 'UnionPay'],
 *       },
 *       {
 *         label: 'E-wallets',
 *         methods: ['Alipay', 'Apple Pay', 'Google Pay', 'PayPal', 'WeChat Pay'],
 *       },
 *       {
 *         label: 'Bank Transfers & Local Payment Methods',
 *         methods: ['SEPA', 'ACH', 'FPX', 'PromptPay', 'PIX', 'iDEAL'],
 *         fullWidth: true,
 *       },
 *     ]}
 *     viewAllHref="#"
 *     viewAllLabel="View Full List of Supported Payment Methods →"
 *   />
 */

// Brand color map for well-known payment methods
const BRAND_STYLES = {
  'Visa':         { bg: '#1a1f71', color: '#fff', text: 'VISA' },
  'Mastercard':   { bg: '#eb001b', color: '#fff', text: 'MC' },
  'Amex':         { bg: '#007bc1', color: '#fff', text: 'AMEX' },
  'JCB':          { bg: '#003087', color: '#fff', text: 'JCB' },
  'UnionPay':     { bg: '#e21836', color: '#fff', text: 'UP' },
  'Alipay':       { bg: '#1677ff', color: '#fff', text: 'Alipay' },
  'Apple Pay':    { bg: '#000000', color: '#fff', text: '⎆ Pay' },
  'Google Pay':   { bg: '#ffffff', color: '#333', text: 'G Pay', border: '#dadce0' },
  'PayPal':       { bg: '#003087', color: '#fff', text: 'PayPal' },
  'WeChat Pay':   { bg: '#07c160', color: '#fff', text: 'WeChat' },
  'SEPA':         { bg: '#0052b4', color: '#fff', text: 'SEPA' },
  'ACH':          { bg: '#374151', color: '#fff', text: 'ACH' },
  'FPX':          { bg: '#e9242a', color: '#fff', text: 'FPX' },
  'PromptPay':    { bg: '#1a56db', color: '#fff', text: 'PromptPay' },
  'PIX':          { bg: '#32bcad', color: '#fff', text: 'PIX' },
  'iDEAL':        { bg: '#cc0066', color: '#fff', text: 'iDEAL' },
  'Bancontact':   { bg: '#005499', color: '#fff', text: 'Bancontact' },
  'OXXO':         { bg: '#e31837', color: '#fff', text: 'OXXO' },
  'GoPay':        { bg: '#00aed6', color: '#fff', text: 'GoPay' },
  'TrueMoney':    { bg: '#f68920', color: '#fff', text: 'TrueMoney' },
}

function PaymentBadge({ name }) {
  const brand = BRAND_STYLES[name] || { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0', text: name }
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5px 10px',
      borderRadius: '6px',
      backgroundColor: brand.bg,
      color: brand.color,
      border: `1px solid ${brand.border || brand.bg}`,
      fontSize: '12px',
      fontWeight: '700',
      letterSpacing: '0.02em',
      whiteSpace: 'nowrap',
      minWidth: '48px',
      textAlign: 'center',
    }}>
      {brand.text || name}
    </span>
  )
}

export function PaymentLogosRow({ methods = [], showMore = true }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
      {methods.map((m, i) => <PaymentBadge key={i} name={m} />)}
      {showMore && (
        <span style={{ fontSize: '18px', color: '#94a3b8', fontWeight: '700', letterSpacing: '0.1em' }}>···</span>
      )}
    </div>
  )
}

export function PaymentMethodsSection({ groups = [], viewAllHref, viewAllLabel }) {
  // Split groups: first two side by side, rest full width
  const topGroups = groups.filter(g => !g.fullWidth).slice(0, 2)
  const fullWidthGroups = groups.filter(g => g.fullWidth)
  const remainingGroups = groups.filter(g => !g.fullWidth).slice(2)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '16px 0' }}>
      {/* Top row: two side-by-side panels */}
      {topGroups.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${topGroups.length}, 1fr)`,
          border: '1px solid #e2e8f0',
          borderRadius: remainingGroups.length === 0 && fullWidthGroups.length === 0 ? '12px' : '12px 12px 0 0',
          overflow: 'hidden',
        }}>
          {topGroups.map((group, i) => (
            <div key={i} style={{
              padding: '20px 24px',
              borderRight: i < topGroups.length - 1 ? '1px solid #e2e8f0' : 'none',
            }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', marginBottom: '12px' }}>
                {group.label}
              </div>
              <PaymentLogosRow methods={group.methods} showMore={group.showMore !== false} />
            </div>
          ))}
        </div>
      )}

      {/* Full-width panels */}
      {fullWidthGroups.map((group, i) => (
        <div key={i} style={{
          padding: '20px 24px',
          border: '1px solid #e2e8f0',
          borderTop: topGroups.length > 0 ? 'none' : '1px solid #e2e8f0',
          borderRadius: i === fullWidthGroups.length - 1 && remainingGroups.length === 0 ? '0 0 12px 12px' : '0',
        }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', marginBottom: '12px' }}>
            {group.label}
          </div>
          <PaymentLogosRow methods={group.methods} showMore={group.showMore !== false} />
        </div>
      ))}

      {/* Remaining pairs */}
      {remainingGroups.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(remainingGroups.length, 2)}, 1fr)`,
          border: '1px solid #e2e8f0',
          borderTop: 'none',
          borderRadius: '0 0 12px 12px',
          overflow: 'hidden',
        }}>
          {remainingGroups.map((group, i) => (
            <div key={i} style={{
              padding: '20px 24px',
              borderRight: i < remainingGroups.length - 1 ? '1px solid #e2e8f0' : 'none',
            }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', marginBottom: '12px' }}>
                {group.label}
              </div>
              <PaymentLogosRow methods={group.methods} showMore={group.showMore !== false} />
            </div>
          ))}
        </div>
      )}

      {/* View all link */}
      {viewAllHref && (
        <div style={{ marginTop: '12px' }}>
          <a href={viewAllHref} style={{
            color: '#1855f1',
            fontSize: '14px',
            fontWeight: '500',
            textDecoration: 'none',
          }}>
            {viewAllLabel || 'View Full List of Supported Payment Methods →'}
          </a>
        </div>
      )}
    </div>
  )
}
