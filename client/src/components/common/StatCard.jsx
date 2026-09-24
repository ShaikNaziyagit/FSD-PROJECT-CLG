import React from 'react';
import GlassCard from './GlassCard';

const StatCard = ({
  icon: Icon,
  label,
  value,
  change,
  changeType = 'positive', // positive, negative, neutral
  color = 'cyan', // cyan, purple, blue, emerald
}) => {
  const colorGradients = {
    cyan: 'from-cyan-500/20 to-blue-500/5 text-cyan-400 border-cyan-500/30',
    purple: 'from-purple-500/20 to-indigo-500/5 text-purple-400 border-purple-500/30',
    blue: 'from-blue-500/20 to-cyan-500/5 text-blue-400 border-blue-500/30',
    emerald: 'from-emerald-500/20 to-teal-500/5 text-emerald-400 border-emerald-500/30',
  }[color] || 'from-cyan-500/20 to-blue-500/5 text-cyan-400 border-cyan-500/30';

  return (
    <GlassCard hoverEffect className="p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</span>
        {Icon && (
          <div className={`w-9 h-9 rounded-xl border bg-gradient-to-br ${colorGradients} flex items-center justify-center shrink-0`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between">
        <div className="text-2xl lg:text-3xl font-bold tracking-tight text-white">{value}</div>
        {change && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              changeType === 'positive'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : changeType === 'negative'
                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                : 'bg-slate-700/30 text-slate-400'
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
