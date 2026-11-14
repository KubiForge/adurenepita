import React from 'react';

interface LogoPlaceholderProps {
  label: string;
  category?: string;
  src?: string;
  className?: string;
  compact?: boolean;
}

export const LogoPlaceholder: React.FC<LogoPlaceholderProps> = ({
  label,
  category = 'Official logo',
  src,
  className = '',
  compact = false,
}) => (
  <div
    className={`flex ${compact ? 'min-h-16' : 'min-h-36'} flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-gold/30 bg-midnight/75 ${compact ? 'p-2' : 'p-5'} text-center transition-colors duration-300 hover:border-gold/60 ${className}`}
    role={src ? undefined : 'img'}
    aria-label={src ? undefined : `${label} logo placeholder`}
  >
    {src ? (
      <img src={src} alt={`${label} logo`} className="h-24 w-full object-contain" />
    ) : (
      <>
        <span className={`font-semibold uppercase tracking-[0.2em] text-gold/70 ${compact ? 'text-[6px]' : 'text-[9px]'}`}>{category}</span>
        <span className={`font-heading font-semibold leading-tight text-ivory ${compact ? 'mt-1 text-[9px]' : 'mt-2 text-lg'}`}>{label}</span>
        {!compact && <span className="mt-2 text-[9px] uppercase tracking-wider text-ivory/35">Placeholder · official artwork pending</span>}
      </>
    )}
  </div>
);
