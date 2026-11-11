import React, { useEffect, useRef, useState } from 'react';
import { ASSETS } from '../../config/assets';

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

export const CinematicBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia(reducedMotionQuery).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(reducedMotionQuery);
    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleMotionPreferenceChange);
    return () => mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) {
      video?.pause();
      return;
    }

    void video.play().catch((error: unknown) => {
      console.error('The cinematic background video could not start playback.', error);
    });
  }, [prefersReducedMotion]);

  return (
    <div className="cinematic-backdrop" aria-hidden="true">
      <video
        ref={videoRef}
        className="cinematic-backdrop__video"
        autoPlay={!prefersReducedMotion}
        muted
        loop
        playsInline
        preload="auto"
        tabIndex={-1}
        onError={(event) => {
          console.error('The cinematic background video could not be loaded.', event.currentTarget.error);
        }}
      >
        <source src={ASSETS.heroVideo} type="video/mp4" />
      </video>
      <div className="cinematic-backdrop__glow" />
      <div className="cinematic-backdrop__dust" />
    </div>
  );
};
