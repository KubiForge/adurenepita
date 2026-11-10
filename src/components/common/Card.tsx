import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = false,
  glow = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`charcoal-card p-6 ${hoverEffect ? 'charcoal-card-hover' : ''} ${
        glow ? 'gold-border-glow' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
