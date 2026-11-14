import React from 'react';
import { ASSETS } from '../../config/assets';

export const CinematicBackground: React.FC = () => {
  return (
    <div className="cinematic-backdrop" aria-hidden="true">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={ASSETS.heroBg}
        className="cinematic-backdrop__video object-cover object-right md:object-center w-full h-full opacity-70"
      >
        <source src={ASSETS.heroVideo} type="video/mp4" />
      </video>
      <div className="cinematic-backdrop__glow" />
      <div className="cinematic-backdrop__dust" />
    </div>
  );
};
