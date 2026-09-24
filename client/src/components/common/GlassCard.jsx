import React from 'react';

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
        relative rounded-2xl border transition-all duration-300
        ${glow ? 'shadow-glass-glow border-indigo-500/30' : 'shadow-glass border-white/10'}
        ${
          hoverEffect
            ? 'glass-panel-interactive cursor-pointer hover:border-indigo-400/40 hover:-translate-y-1'
            : 'glass-panel'
        }
        ${className}
      `}
      {...props}
    >
      {/* Subtle top rim light */}
      <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};

export default GlassCard;
