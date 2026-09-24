import React from 'react';
import { Sparkles } from 'lucide-react';
import GlassCard from './GlassCard';
import GlassButton from './GlassButton';

const EmptyState = ({
  icon: Icon = Sparkles,
  title = 'No Data Found',
  description = 'There are no active records in this section yet.',
  actionLabel,
  onAction,
}) => {
  return (
    <GlassCard className="flex flex-col items-center justify-center text-center p-10 max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 shadow-lg shadow-indigo-500/10">
        <Icon className="w-8 h-8 text-cyan-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-100 mb-1.5">{title}</h3>
      <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <GlassButton variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </GlassButton>
      )}
    </GlassCard>
  );
};

export default EmptyState;
