/**
 * CapabilityCard - Feature highlight card with icon, title, and description.
 *
 * Usage in MDX:
 *   import { CapabilityCard } from '/snippets/components/capability-card.jsx'
 *
 *   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
 *     <CapabilityCard icon="🗓" title="Flexible Billing Cycles" description="Weekly, monthly, yearly..." />
 *   </div>
 */
export function CapabilityCard({ icon, title, description }) {
  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      backgroundColor: '#ffffff',
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        backgroundColor: '#eff6ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
        {title}
      </div>
      <div style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
        {description}
      </div>
    </div>
  )
}

/**
 * CapabilityGrid - Wraps CapabilityCard items in a responsive 2-column grid.
 *
 * Usage:
 *   <CapabilityGrid>
 *     <CapabilityCard ... />
 *     <CapabilityCard ... />
 *   </CapabilityGrid>
 */
export function CapabilityGrid({ children }) {
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
