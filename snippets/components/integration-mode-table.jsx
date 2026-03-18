/**
 * IntegrationModeTable - 3-column comparison table for integration modes.
 * Matches the Figma design: Hosted Checkout | Embedded Checkout | API Integration
 *
 * Usage in MDX:
 *   import { IntegrationModeTable } from '/snippets/components/integration-mode-table.jsx'
 *
 *   <IntegrationModeTable />
 *
 * Or with custom data:
 *   <IntegrationModeTable
 *     columns={[
 *       { key: 'hosted', label: 'Hosted Checkout' },
 *       { key: 'embedded', label: 'Embedded Checkout' },
 *       { key: 'api', label: 'API Integration' },
 *     ]}
 *     rows={[...]}
 *   />
 */

const DEFAULT_COLUMNS = [
  { key: 'hosted', label: 'Hosted Checkout' },
  { key: 'embedded', label: 'Embedded Checkout' },
  { key: 'api', label: 'API Integration' },
]

const COST_BADGE = {
  Low:    { bg: '#dcfce7', color: '#16a34a', border: '#bbf7d0' },
  Medium: { bg: '#fef9c3', color: '#ca8a04', border: '#fde68a' },
  High:   { bg: '#fee2e2', color: '#dc2626', border: '#fecaca' },
}

function CostBadge({ label }) {
  const style = COST_BADGE[label] || { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' }
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: '999px',
      fontSize: '13px',
      fontWeight: '600',
      backgroundColor: style.bg,
      color: style.color,
      border: `1px solid ${style.border}`,
    }}>
      {label}
    </span>
  )
}

function CellContent({ value }) {
  if (!value) return <span style={{ color: '#cbd5e1' }}>—</span>

  if (value.type === 'cost') {
    return <CostBadge label={value.label} />
  }

  if (value.type === 'link') {
    return (
      <a href={value.href} style={{ color: '#1855f1', textDecoration: 'underline', fontSize: '14px' }}>
        {value.text}
      </a>
    )
  }

  if (value.type === 'bullets') {
    return (
      <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {value.items.map((item, i) => (
          <li key={i} style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>{item}</li>
        ))}
      </ul>
    )
  }

  // Default: plain text
  return <span style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>{value}</span>
}

export function IntegrationModeTable({ columns = DEFAULT_COLUMNS, rows }) {
  const defaultRows = [
    {
      label: 'Introduction',
      hosted:   'Merchants call the API to create a payment session. Users are redirected to a secure checkout page hosted by Waffo to select their payment method and confirm the transaction.',
      embedded: 'Merchants use the Waffo SDK to embed the checkout component directly into their own website. Users select payment methods on the merchant\'s page while staying within the merchant\'s flow.',
      api:      'Merchants build a fully custom checkout UI and call Waffo\'s APIs directly for all payment steps. Full control over customization. Requires PCI DSS certification and must handle card data.',
    },
    {
      label: 'Key Features',
      hosted:   { type: 'bullets', items: ['No need to build a checkout UI', 'Flexibility to enable/disable features as required for everyone', 'Hosted and updated by Waffo'] },
      embedded: { type: 'bullets', items: ['No large redirection, payment completes on site', 'Waffo SDK handles complexity', 'No PCI DSS certification required for the merchant'] },
      api:      { type: 'bullets', items: ['Full control', 'Maximum flexibility', 'Customize all UI', 'Requires PCI Certification', 'Must handle card data'] },
    },
    {
      label: 'Integration Cost',
      hosted:   { type: 'cost', label: 'Low' },
      embedded: { type: 'cost', label: 'Medium' },
      api:      { type: 'cost', label: 'High' },
    },
    {
      label: 'Brand Customization',
      hosted:   'Supports Logo, Colors, Domains, etc.',
      embedded: 'Supported (Logo, Colors, Styles, etc.)',
      api:      'Fully Customizable',
    },
    {
      label: 'Demo',
      hosted:   { type: 'link', text: 'Hosted Checkout Demo', href: '#' },
      embedded: { type: 'link', text: 'Embedded Checkout Demo', href: '#' },
      api:      null,
    },
    {
      label: 'Documentation',
      hosted:   { type: 'link', text: 'Hosted Checkout Integration Guide', href: '#' },
      embedded: { type: 'link', text: 'Embedded Checkout Integration Guide', href: '#' },
      api:      { type: 'link', text: 'API Integ...', href: '#' },
    },
  ]

  const tableRows = rows || defaultRows

  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      overflow: 'hidden',
      margin: '16px 0',
      fontSize: '14px',
    }}>
      {/* Header row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '130px 1fr 1fr 1fr',
        borderBottom: '1px solid #e2e8f0',
      }}>
        <div style={{ padding: '16px', backgroundColor: '#ffffff' }} />
        {columns.map((col) => (
          <div key={col.key} style={{
            padding: '16px',
            borderLeft: '1px solid #e2e8f0',
            fontWeight: '600',
            fontSize: '16px',
            color: '#0f172a',
          }}>
            {col.label}
          </div>
        ))}
      </div>

      {/* Data rows */}
      {tableRows.map((row, i) => (
        <div key={i} style={{
          display: 'grid',
          gridTemplateColumns: '130px 1fr 1fr 1fr',
          borderBottom: i < tableRows.length - 1 ? '1px solid #e2e8f0' : 'none',
        }}>
          {/* Row label */}
          <div style={{
            padding: '16px',
            backgroundColor: '#f7f9fc',
            borderRight: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            fontWeight: '500',
            fontSize: '14px',
            color: '#0f172a',
          }}>
            {row.label}
          </div>

          {/* Cell values */}
          {columns.map((col) => (
            <div key={col.key} style={{
              padding: '16px',
              borderLeft: '1px solid #e2e8f0',
              backgroundColor: '#f7f9fc',
              display: 'flex',
              alignItems: 'flex-start',
            }}>
              <CellContent value={row[col.key]} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
