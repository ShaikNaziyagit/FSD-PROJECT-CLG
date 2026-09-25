import React from 'react';
import GlassCard from './GlassCard';

const StatCard = ({
  icon: Icon,
  label,
  value,
  change,
  changeType = 'positive', // positive, negative, neutral
  color = 'orange', // orange, amber, rose, emerald
}) => {
  const colorGradients = {
    orange: 'from-orange-500/30 to-amber-500/10 text-orange-300 border-orange-400/40',
    amber: 'from-amber-500/30 to-yellow-500/10 text-amber-300 border-amber-400/40',
    rose: 'from-rose-500/30 to-red-500/10 text-rose-300 border-rose-400/40',
    emerald: 'from-emerald-500/30 to-teal-500/10 text-emerald-300 border-emerald-400/40',
    // Fallback aliases (NO blue)
    cyan: 'from-orange-500/30 to-amber-500/10 text-orange-300 border-orange-400/40',
    blue: 'from-amber-500/30 to-orange-500/10 text-amber-300 border-amber-400/40',
    purple: 'from-orange-500/30 to-amber-500/10 text-orange-300 border-orange-400/40',
  }[color] || 'from-orange-500/30 to-amber-500/10 text-orange-300 border-orange-400/40';

  return (
    <GlassCard hoverEffect className="p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
          {label}
        </span>
        {Icon && (
          <div className={`w-9 h-9 rounded-xl border bg-gradient-to-br ${colorGradients} flex items-center justify-center shrink-0 shadow-sm`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <div className="text-2xl lg:text-3xl font-black tracking-tight text-white">
          {value}
        </div>
        {change && (
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full border font-mono ${
              changeType === 'positive'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                : changeType === 'negative'
                ? 'bg-rose-500/20 text-rose-300 border-rose-400/40'
                : 'bg-stone-700/50 text-stone-200 border-stone-500/40'
            }`}
          >
            {change}
          </span>
        )}
      </div>
    </GlassCard>
  );
};

export default StatCard;
