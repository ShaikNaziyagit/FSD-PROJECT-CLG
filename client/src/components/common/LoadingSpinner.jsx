import React from 'react';

const LoadingSpinner = ({ size = 'md', label = 'Loading CampusOS...' }) => {
  const sizeMap = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  }[size] || 'w-10 h-10 border-3';

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-3">
      <div className="relative">
        <div
          className={`${sizeMap} rounded-full border-orange-500/20 border-t-orange-500 border-r-amber-400 animate-spin`}
        />
        <div className="absolute inset-0 rounded-full blur-sm bg-orange-500/20 animate-pulse" />
      </div>
      {label && <p className="text-xs text-orange-200/80 font-mono tracking-wider animate-pulse">{label}</p>}
    </div>
  );
};

export default LoadingSpinner;
