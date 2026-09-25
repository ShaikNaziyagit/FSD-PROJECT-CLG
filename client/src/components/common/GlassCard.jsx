import React from 'react';

/**
 * GlassCard — Deep Warm Glassmorphic Container with Crystal Contrast
 * White & Orange theme with maximum text visibility on top of the 3D realistic campus background.
 */
const GlassCard = ({
  children,
  className = '',
  hoverEffect = false,
  glow = false,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-2xl transition-all duration-300 overflow-hidden
        ${
          hoverEffect
            ? 'glass-panel-interactive cursor-pointer hover:border-orange-400/50 hover:shadow-[0_12px_36px_rgba(249,115,22,0.2)]'
            : 'glass-panel'
        }
        ${
          glow
            ? 'border-orange-400/50 shadow-[0_0_25px_rgba(249,115,22,0.25)]'
            : 'border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.55)]'
        }
        ${className}
      `}
      {...props}
    >
      {/* Specular top rim light for frosted glass depth */}
      <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};

export default GlassCard;
