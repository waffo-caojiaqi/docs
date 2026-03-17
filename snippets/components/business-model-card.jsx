/**
 * BusinessModelCard - Comparison card for subscription business models (A/B layout).
 *
 * Props:
 *   label      - Single letter label displayed in circle (e.g. "A", "B")
 *   title      - Model name (e.g. "Service-First")
 *   tagline    - Short description under title
 *   mechanism  - Text explaining how it works on failure
 *   bestFor    - Text describing ideal use cases
 *
 * Usage:
 *   import { BusinessModelCard, BusinessModelGrid } from '/snippets/components/business-model-card.jsx'
 *
 *   <BusinessModelGrid>
 *     <BusinessModelCard
 *       label="A"
 *       title="Service-First"
 *       tagline="Prioritize service continuity; tolerate payment latency."
 *       mechanism="If deduction fails, service is not interrupted. Next deduction is created as planned..."
 *       bestFor="Video streaming, SaaS software, and services focused on user retention."
 *     />
 *   </BusinessModelGrid>
 */
export function BusinessModelCard({ label, title, tagline, mechanism, bestFor }) {
  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '24px',
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
    }}>
      {/* Header: label circle + title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: '#1e293b',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: '700',
          flexShrink: 0,
        }}>
          {label}
        </div>
        <div style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>{title}</div>
      </div>

      {/* Tagline */}
      <div style={{
        fontSize: '13px',
        color: '#64748b',
        marginBottom: '20px',
        lineHeight: '1.5',
      }}>
        {tagline}
      </div>

      {/* Mechanism */}
      <div style={{
        borderTop: '1px solid #f1f5f9',
        paddingTop: '16px',
        marginBottom: '16px',
      }}>
        <div style={{
          fontSize: '13px',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '6px',
        }}>
          Mechanism
        </div>
        <div style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>
          {mechanism}
        </div>
      </div>

      {/* Best For */}
      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
        <div style={{
          fontSize: '13px',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '6px',
        }}>
          Best For
        </div>
        <div style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>
          {bestFor}
        </div>
      </div>
    </div>
  )
}

/**
 * BusinessModelGrid - 2-column grid for side-by-side model comparison.
 */
export function BusinessModelGrid({ children }) {
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
