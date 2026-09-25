import React from 'react';

const Badge = ({
  children,
  variant = 'orange', // orange, amber, white, emerald, rose, slate
  size = 'sm',
  className = '',
}) => {
  const variantStyles = {
    orange: 'bg-orange-500/20 text-orange-200 border-orange-400/40 shadow-[0_0_12px_rgba(249,115,22,0.25)]',
    amber: 'bg-amber-500/20 text-amber-200 border-amber-400/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]',
    white: 'bg-white/15 text-white border-white/30 shadow-[0_0_10px_rgba(255,255,255,0.2)]',
    emerald: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]',
    rose: 'bg-rose-500/20 text-rose-200 border-rose-400/40 shadow-[0_0_12px_rgba(244,63,94,0.2)]',
    slate: 'bg-stone-800/80 text-stone-200 border-stone-600/50',
    // Fallback aliases
    cyan: 'bg-orange-500/20 text-orange-200 border-orange-400/40 shadow-[0_0_12px_rgba(249,115,22,0.25)]',
    blue: 'bg-amber-500/20 text-amber-200 border-amber-400/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]',
    purple: 'bg-orange-500/20 text-orange-200 border-orange-400/40 shadow-[0_0_12px_rgba(249,115,22,0.25)]',
  }[variant] || 'bg-orange-500/20 text-orange-200 border-orange-400/40';

  const sizeStyles = {
    xs: 'px-2 py-0.5 text-[10px] font-bold tracking-wider',
    sm: 'px-2.5 py-1 text-xs font-bold tracking-wide',
    md: 'px-3 py-1.5 text-sm font-bold tracking-wide',
  }[size] || 'px-2.5 py-1 text-xs font-bold';

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full border backdrop-blur-md uppercase font-mono
        ${variantStyles}
        ${sizeStyles}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
