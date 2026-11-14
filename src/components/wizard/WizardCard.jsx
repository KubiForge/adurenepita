// WizardCard.jsx — Selectable card used in wizard choice steps
import React from 'react';

/**
 * @param {string}   label      - Main label text
 * @param {string}   sublabel   - Optional descriptive text
 * @param {node}     icon       - Optional lucide-react icon element
 * @param {boolean}  selected   - Whether this card is currently selected
 * @param {function} onClick    - Click handler
 * @param {boolean}  multiSelect- Whether multiple cards can be selected simultaneously
 * @param {boolean}  compact    - Renders a smaller chip-style card
 * @param {string}   variant    - 'card' | 'chip' | 'option'
 */
export default function WizardCard({
  label,
  sublabel,
  icon,
  selected = false,
  onClick,
  multiSelect = false,
  compact = false,
  variant = 'card',
  disabled = false,
}) {
  if (variant === 'chip') {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 18px',
          borderRadius: 100,
          border: selected
            ? '1.5px solid var(--gold)'
            : '1.5px solid rgba(216,190,130,0.2)',
          background: selected
            ? 'rgba(216,190,130,0.15)'
            : 'rgba(255,255,255,0.03)',
          color: selected ? 'var(--gold)' : 'var(--ivory-dim)',
          fontSize: 14,
          fontWeight: selected ? 600 : 400,
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: selected ? '0 0 12px rgba(216,190,130,0.2)' : 'none',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}
        onMouseEnter={e => {
          if (!selected && !disabled) {
            e.currentTarget.style.borderColor = 'rgba(216,190,130,0.4)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
          }
        }}
        onMouseLeave={e => {
          if (!selected && !disabled) {
            e.currentTarget.style.borderColor = 'rgba(216,190,130,0.2)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
          }
        }}
        aria-pressed={selected}
      >
        {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
        {label}
        {multiSelect && selected && (
          <span style={{
            width: 16, height: 16, borderRadius: '50%',
            background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, color: '#101113', fontWeight: 700,
          }}>✓</span>
        )}
      </button>
    );
  }

  if (variant === 'option') {
    // Horizontal radio-style option row
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          width: '100%',
          padding: '14px 20px',
          borderRadius: 'var(--radius-md)',
          border: selected
            ? '1.5px solid var(--gold)'
            : '1.5px solid rgba(216,190,130,0.15)',
          background: selected
            ? 'rgba(216,190,130,0.1)'
            : 'rgba(255,255,255,0.02)',
          color: selected ? 'var(--gold)' : 'var(--ivory)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          textAlign: 'left',
          boxShadow: selected ? '0 0 20px rgba(216,190,130,0.1)' : 'none',
          userSelect: 'none',
        }}
        onMouseEnter={e => {
          if (!selected && !disabled) {
            e.currentTarget.style.borderColor = 'rgba(216,190,130,0.3)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
          }
        }}
        onMouseLeave={e => {
          if (!selected && !disabled) {
            e.currentTarget.style.borderColor = 'rgba(216,190,130,0.15)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
          }
        }}
        aria-pressed={selected}
      >
        {/* Radio dot */}
        <div style={{
          width: 20, height: 20, borderRadius: '50%',
          border: selected ? '2px solid var(--gold)' : '2px solid rgba(216,190,130,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          transition: 'border-color 0.2s',
        }}>
          {selected && (
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--gold)',
            }} />
          )}
        </div>
        <span style={{ fontSize: 15, fontWeight: selected ? 500 : 400 }}>{label}</span>
        {sublabel && <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--text-muted)' }}>{sublabel}</span>}
      </button>
    );
  }

  // Default: 'card' variant — large selection card
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: compact ? '14px 12px' : '22px 16px',
        borderRadius: 'var(--radius-lg)',
        border: selected
          ? '2px solid var(--gold)'
          : '1.5px solid rgba(216,190,130,0.15)',
        background: selected
          ? 'rgba(216,190,130,0.12)'
          : 'rgba(36,36,38,0.7)',
        color: selected ? 'var(--gold)' : 'var(--ivory-dim)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.25s ease',
        textAlign: 'center',
        boxShadow: selected ? '0 0 24px rgba(216,190,130,0.2), inset 0 0 20px rgba(216,190,130,0.05)' : 'var(--shadow-sm)',
        transform: selected ? 'translateY(-2px)' : 'translateY(0)',
        userSelect: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(-3px)';
          if (!selected) {
            e.currentTarget.style.borderColor = 'rgba(216,190,130,0.35)';
            e.currentTarget.style.background = 'rgba(36,36,38,0.9)';
          }
        }
      }}
      onMouseLeave={e => {
        if (!disabled) {
          e.currentTarget.style.transform = selected ? 'translateY(-2px)' : 'translateY(0)';
          if (!selected) {
            e.currentTarget.style.borderColor = 'rgba(216,190,130,0.15)';
            e.currentTarget.style.background = 'rgba(36,36,38,0.7)';
          }
        }
      }}
      aria-pressed={selected}
    >
      {/* Selected glow top-left corner */}
      {selected && (
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 24, height: 24,
          background: 'var(--gold)',
          clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end',
        }}>
          <span style={{ fontSize: 9, color: '#101113', fontWeight: 800, padding: '2px 3px 0 0' }}>✓</span>
        </div>
      )}

      {icon && (
        <div style={{
          color: selected ? 'var(--gold)' : 'var(--text-secondary)',
          transition: 'color 0.2s',
          fontSize: compact ? 20 : 28,
        }}>
          {icon}
        </div>
      )}
      <span style={{
        fontSize: compact ? 13 : 14,
        fontWeight: selected ? 600 : 500,
        lineHeight: 1.3,
        color: selected ? 'var(--gold)' : 'var(--ivory)',
      }}>
        {label}
      </span>
      {sublabel && (
        <span style={{
          fontSize: 12,
          color: selected ? 'rgba(216,190,130,0.7)' : 'var(--text-muted)',
          lineHeight: 1.4,
        }}>
          {sublabel}
        </span>
      )}
    </button>
  );
}
