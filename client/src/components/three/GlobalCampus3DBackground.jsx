import React from 'react';
import CampusScene from './CampusScene';

/**
 * GlobalCampus3DBackground — Live 3D realistic campus building background
 * running continuously across the entire application with warm sunset depth.
 */
const GlobalCampus3DBackground = () => {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Live 3D WebGL Canvas */}
      <CampusScene className="w-full h-full" />

      {/* 
        Warm Sunset Contrast Balancer
        Lets the illuminated realistic campus building glow through while guaranteeing ultra-high contrast for text
      */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(18, 14, 11, 0.42) 0%, rgba(14, 11, 8, 0.75) 65%, rgba(10, 8, 6, 0.95) 100%)',
        }}
      />
    </div>
  );
};

export default GlobalCampus3DBackground;
