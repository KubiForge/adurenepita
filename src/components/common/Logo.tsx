import React from 'react';
import { Link } from 'react-router-dom';
import { ASSETS } from '../../config/assets';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showSubtitle = true, className = '' }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  return (
    <Link to="/" className={`flex items-center gap-3 group text-left ${className}`} aria-label="Beyond the Darkness Home">
      {/* Official Symbol / Emblem */}
      <div className={`relative rounded-full overflow-hidden flex-shrink-0 border border-gold/40 shadow-gold-subtle group-hover:border-gold transition-colors ${iconSizes[size]}`}>
        <img
          src={ASSETS.logoIcon}
          alt="Beyond the Darkness Emblem"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col">
        <span className={`font-heading font-bold tracking-tight text-ivory group-hover:text-champagne transition-colors leading-tight ${textSizes[size]}`}>
          BEYOND THE DARKNESS
          <span className="block font-sinhalaSerif text-gold text-[0.85em] font-semibold">
            අඳුරෙන් එළියට
          </span>
        </span>
        {showSubtitle && (
          <span className="text-[10px] uppercase tracking-wider text-ivory/60 font-sans hidden sm:block">
            Leo Club of University of Sri Jayewardenepura
          </span>
        )}
      </div>
    </Link>
  );
};
