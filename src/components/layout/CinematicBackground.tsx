import React from 'react';
import { ASSETS } from '../../config/assets';

export const CinematicBackground: React.FC = () => {
  return (
    <div className="cinematic-backdrop" aria-hidden="true">
      <img
        src={ASSETS.heroBg}
        alt=""
        className="cinematic-backdrop__image object-cover object-right md:object-center w-full h-full opacity-70"
      />
      <div className="cinematic-backdrop__glow" />
      <div className="cinematic-backdrop__dust" />
    </div>
  );
};
