import React from 'react';
import { ASSETS } from '../../config/assets';

export const CinematicBackground: React.FC = () => {
  return (
    <div className="cinematic-backdrop" aria-hidden="true">
      {/* Official Hero Image: Helping Hand / Glowing Doorway */}
      <img
        src={ASSETS.heroBg}
        alt="Beyond the Darkness Hero - Helping hand at glowing doorway"
        className="cinematic-backdrop__video object-cover object-right md:object-center w-full h-full opacity-70"
      />
      <div className="cinematic-backdrop__glow" />
      <div className="cinematic-backdrop__dust" />
    </div>
  );
};
