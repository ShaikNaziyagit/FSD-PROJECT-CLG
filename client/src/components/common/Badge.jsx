import React from 'react';

const Badge = ({
  children,
  variant = 'cyan', // cyan, purple, blue, emerald, amber, rose, slate
  size = 'sm',
  className = '',
}) => {
  const variantStyles = {
    cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    purple: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    blue: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    rose: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    slate: 'bg-slate-700/40 text-slate-300 border-slate-600/40',
  }[variant] || 'bg-slate-700/40 text-slate-300 border-slate-600/40';

  const sizeStyles = {
    xs: 'px-2 py-0.5 text-[10px] font-medium tracking-wide',
    sm: 'px-2.5 py-1 text-xs font-medium',
    md: 'px-3 py-1.5 text-sm font-medium',
  }[size] || 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full border backdrop-blur-md uppercase tracking-wider
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
