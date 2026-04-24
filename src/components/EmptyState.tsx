'use client';

import { ReactNode } from 'react';
import GlassCard from './GlassCard';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string | ReactNode;
  action?: ReactNode;
  className?: string;
}

export default function EmptyState({ title, description, icon = '👻', action, className = '' }: EmptyStateProps) {
  return (
    <GlassCard className={`flex flex-col items-center justify-center text-center py-12 px-6 ${className}`}>
      <div className="text-5xl mb-4 opacity-80 animate-float">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-soft-white">{title}</h3>
      <p className="text-muted text-sm max-w-sm mb-6">
        {description}
      </p>
      {action && (
        <div>{action}</div>
      )}
    </GlassCard>
  );
}
