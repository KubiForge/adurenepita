// WizardProgress.jsx — Step progress indicator for the Guided Support Wizard
import React from 'react';
import { Check } from 'lucide-react';

/**
 * @param {number}   totalSteps   - total number of steps (may vary by branch)
 * @param {number}   currentStep  - 1-based index of the visible step
 * @param {number[]} stepSequence - ordered list of step numbers the user will visit
 */
export default function WizardProgress({ totalSteps = 10, currentStep = 1, stepSequence = [] }) {
  // Position of currentStep inside stepSequence
  const currentIdx = stepSequence.indexOf(currentStep);
  const visibleCount = stepSequence.length;

  return (
    <div style={{ width: '100%', marginBottom: 32 }}>
      {/* Step count label */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
      }}>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Your Journey
        </span>
        <span style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600 }}>
          {currentIdx + 1} / {visibleCount}
        </span>
      </div>

      {/* Dot / segment row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}>
        {stepSequence.map((stepNum, idx) => {
          const isCompleted = idx < currentIdx;
          const isCurrent   = idx === currentIdx;
          const isFuture    = idx > currentIdx;

          return (
            <React.Fragment key={stepNum}>
              {/* Connector line */}
              {idx > 0 && (
                <div style={{
                  flex: 1,
                  height: 2,
                  borderRadius: 2,
                  background: isCompleted
                    ? 'var(--gold)'
                    : 'rgba(216,190,130,0.15)',
                  transition: 'background 0.4s ease',
                }} />
              )}

              {/* Dot */}
              <div
                title={`Step ${idx + 1}`}
                style={{
                  width:  isCurrent ? 32 : 20,
                  height: isCurrent ? 32 : 20,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                  background: isCompleted
                    ? 'var(--gold)'
                    : isCurrent
                      ? 'transparent'
                      : 'rgba(216,190,130,0.08)',
                  border: isCurrent
                    ? '2px solid var(--gold)'
                    : isCompleted
                      ? '2px solid var(--gold)'
                      : '2px solid rgba(216,190,130,0.2)',
                  boxShadow: isCurrent ? '0 0 16px rgba(216,190,130,0.4)' : 'none',
                  cursor: 'default',
                }}
              >
                {isCompleted ? (
                  <Check size={12} color="#101113" strokeWidth={3} />
                ) : isCurrent ? (
                  <div style={{
                    width: 8, height: 8,
                    borderRadius: '50%',
                    background: 'var(--gold)',
                  }} />
                ) : null}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Animated fill bar underneath */}
      <div style={{ marginTop: 10, height: 2, borderRadius: 2, background: 'rgba(216,190,130,0.1)', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${visibleCount > 1 ? (currentIdx / (visibleCount - 1)) * 100 : 100}%`,
          background: 'linear-gradient(90deg, var(--gold-dark), var(--gold))',
          borderRadius: 2,
          transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
    </div>
  );
}
