import React from 'react';

const GlassButton = ({
  children,
  variant = 'primary', // primary, secondary, outline, danger, ghost, accent
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
    sm: 'px-3.5 py-1.5 text-xs rounded-xl gap-1.5 font-semibold',
    md: 'px-5 py-2.5 text-sm rounded-xl gap-2 font-bold',
    lg: 'px-6 py-3.5 text-base rounded-2xl gap-2.5 font-extrabold',
  }[size] || 'px-5 py-2.5 text-sm rounded-xl gap-2 font-bold';

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:brightness-110 active:scale-[0.98] border border-orange-400/50',
    secondary:
      'bg-white/10 hover:bg-white/20 text-white border border-white/25 shadow-md active:scale-[0.98] backdrop-blur-md hover:border-white/40',
    outline:
      'bg-orange-500/10 hover:bg-orange-500/20 text-orange-200 border border-orange-400/40 hover:border-orange-400 shadow-sm active:scale-[0.98] backdrop-blur-md',
    danger:
      'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-md shadow-rose-500/30 hover:brightness-110 active:scale-[0.98] border border-rose-400/40',
    ghost:
      'bg-transparent hover:bg-white/10 text-white hover:text-orange-300 active:scale-[0.98]',
    accent:
      'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:brightness-110 active:scale-[0.98] border border-amber-300/50',
  }[variant] || '';

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center transition-all duration-200 select-none cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none tracking-wide
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
