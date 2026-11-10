import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'charcoal' | 'danger' | 'success' | 'bronze';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  className = '',
}) => {
  const styles = {
    gold: 'bg-gold/15 text-gold border-gold/30',
    charcoal: 'bg-charcoal text-ivory/80 border-charcoal-lighter',
    danger: 'bg-red-500/15 text-red-400 border-red-500/30',
    success: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    bronze: 'bg-bronze/15 text-champagne border-bronze/30',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
