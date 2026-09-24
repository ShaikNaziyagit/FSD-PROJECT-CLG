import React from 'react';

const GlassButton = ({
  children,
  variant = 'primary', // primary, secondary, outline, danger, ghost
  size = 'md', // sm, md, lg
  icon: Icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-xl gap-1.5',
    md: 'px-4 py-2.5 text-sm rounded-xl gap-2 font-medium',
    lg: 'px-6 py-3.5 text-base rounded-2xl gap-2.5 font-semibold',
  }[size] || 'px-4 py-2.5 text-sm rounded-xl gap-2';

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:brightness-110 active:scale-[0.98]',
    secondary:
      'bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-white/10 hover:border-white/20 active:scale-[0.98]',
    outline:
      'bg-transparent hover:bg-white/5 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 active:scale-[0.98]',
    danger:
      'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg shadow-rose-500/20 hover:brightness-110 active:scale-[0.98]',
    ghost:
      'bg-transparent hover:bg-white/5 text-slate-300 hover:text-white',
  }[variant] || '';

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center transition-all duration-200 select-none
        disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
        ${sizeClasses}
        ${variantClasses}
        ${className}
      `}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
};

export default GlassButton;
