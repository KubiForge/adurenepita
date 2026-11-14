// WizardStep.jsx — Animated step wrapper
import React, { useEffect, useRef } from 'react';

/**
 * @param {string}   title       - Step heading
 * @param {string}   subtitle    - Optional descriptive subheading
 * @param {boolean}  optional    - Show "(Optional)" badge
 * @param {node}     children    - Step content
 * @param {string}   direction   - 'forward' | 'back' — animation direction
 * @param {boolean}  visible     - Whether the step is currently shown
 */
export default function WizardStep({ title, subtitle, optional = false, children, visible = true, direction = 'forward' }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    // Reset
    el.style.opacity = '0';
    el.style.transform = direction === 'back' ? 'translateX(-40px)' : 'translateX(40px)';

    const raf = requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)';
      el.style.opacity = '1';
      el.style.transform = 'translateX(0)';
    });

    return () => cancelAnimationFrame(raf);
  }, [title, direction]);

  if (!visible) return null;

  return (
    <div ref={ref} style={{ width: '100%' }}>
      {/* Title */}
      <div style={{ marginBottom: 28, textAlign: 'center' }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
          fontWeight: 600,
          color: 'var(--ivory)',
          lineHeight: 1.25,
          marginBottom: 8,
        }}>
          {title}
          {optional && (
            <span style={{
              marginLeft: 10,
              fontSize: '0.55em',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              verticalAlign: 'middle',
              background: 'rgba(255,255,255,0.06)',
              padding: '2px 10px',
              borderRadius: 100,
              letterSpacing: '0.05em',
            }}>
              Optional
            </span>
          )}
        </h2>
        {subtitle && (
          <p style={{
            fontSize: 15,
            color: 'var(--text-secondary)',
            maxWidth: 500,
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Content */}
      {children}
    </div>
  );
}
