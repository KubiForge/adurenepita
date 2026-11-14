import React from 'react';

interface LogoPlaceholderProps {
  label: string;
  category?: string;
  src?: string;
  className?: string;
  compact?: boolean;
  showcase?: boolean;
}

export const LogoPlaceholder: React.FC<LogoPlaceholderProps> = ({
  label,
  category = 'Official logo',
  src,
  className = '',
  compact = false,
  showcase = false,
}) => (
  <div
    className={`flex ${compact ? 'min-h-16 p-2' : showcase ? 'min-h-24 p-2.5' : 'min-h-36 p-5'} flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-gold/30 bg-midnight/75 text-center transition-colors duration-300 hover:border-gold/60 ${className}`}
    role={src ? undefined : 'img'}
    aria-label={src ? undefined : `${label} logo placeholder`}
  >
    {src ? (
      <img src={src} alt={`${label} logo`} className={`${compact ? 'h-8' : showcase ? 'h-14' : 'h-24'} w-full object-contain`} />
    ) : (
      <>
        <span className={`font-semibold uppercase tracking-[0.16em] text-gold/70 ${compact ? 'text-[6px]' : showcase ? 'text-[7px]' : 'text-[9px]'}`}>{category}</span>
        <span className={`font-heading font-semibold leading-tight text-ivory ${compact ? 'mt-1 text-[9px]' : showcase ? 'mt-1.5 text-[10px]' : 'mt-2 text-lg'}`}>{label}</span>
        {!compact && <span className={`mt-1.5 uppercase tracking-wider text-ivory/35 ${showcase ? 'text-[6px]' : 'text-[9px]'}`}>Placeholder · official artwork pending</span>}
      </>
    )}
  </div>
);
