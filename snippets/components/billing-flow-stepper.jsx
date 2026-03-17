/**
 * BillingFlowStepper - Horizontal step-by-step flow diagram.
 *
 * Props:
 *   title  - Optional card title (e.g. "Billing Flow")
 *   steps  - Array of strings, one per step
 *   alert  - Optional { title, lines: string[] } for a warning box below the steps
 *
 * Usage:
 *   import { BillingFlowStepper } from '/snippets/components/billing-flow-stepper.jsx'
 *
 *   <BillingFlowStepper
 *     title="Billing Flow"
 *     steps={["Expiry Detection", "Generate MIT Order", "Initiate Deduction", "Success Notification / Failure Retry"]}
 *     alert={{
 *       title: "Failure Handling",
 *       lines: [
 *         "Default strategy retries 24 hours after failure, and again 48 hours later (parameters configurable).",
 *         "Supports triggering automatic payment failure notifications via email...",
 *       ]
 *     }}
 *   />
 */
export function BillingFlowStepper({ title, steps = [], alert }) {
  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '24px',
      backgroundColor: '#ffffff',
    }}>
      {/* Card title */}
      {title && (
        <div style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '20px',
        }}>
          {title}
        </div>
      )}

      {/* Step indicators */}
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        {steps.map((step, i) => (
          <div key={i} style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            position: 'relative',
          }}>
            {/* Dot + connector line */}
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <div style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: i === 0 ? '#1e3a8a' : '#cbd5e1',
                flexShrink: 0,
                zIndex: 1,
              }} />
              {i < steps.length - 1 && (
                <div style={{
                  flex: 1,
                  height: '1px',
                  backgroundColor: '#cbd5e1',
                }} />
              )}
            </div>
            {/* Step label */}
            <div style={{
              marginTop: '10px',
              paddingRight: '8px',
              fontSize: '13px',
              color: '#374151',
              fontWeight: i === 0 ? '500' : '400',
              lineHeight: '1.4',
            }}>
              {step}
            </div>
          </div>
        ))}
      </div>

      {/* Optional alert/warning box */}
      {alert && (
        <div style={{
          marginTop: '20px',
          border: '1px solid #fca5a5',
          borderLeft: '4px solid #ef4444',
          borderRadius: '8px',
          padding: '16px 16px 16px 20px',
          backgroundColor: '#fff5f5',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
        }}>
          <span style={{
            fontSize: '18px',
            flexShrink: 0,
            marginTop: '1px',
          }}>
            🛡
          </span>
          <div>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#991b1b',
              marginBottom: '8px',
            }}>
              {alert.title}
            </div>
            {alert.lines.map((line, i) => (
              <div key={i} style={{
                fontSize: '13px',
                color: '#7f1d1d',
                lineHeight: '1.6',
                marginBottom: i < alert.lines.length - 1 ? '6px' : 0,
              }}>
                {line}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
