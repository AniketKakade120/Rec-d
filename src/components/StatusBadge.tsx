'use client';

import { RecommendationStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: RecommendationStatus;
  className?: string;
}

const statusConfig: Record<RecommendationStatus, { label: string; classes: string }> = {
  pending: { label: '⏳ Pending', classes: 'bg-yellow/15 text-yellow border-yellow/20' },
  accepted: { label: '✓ Accepted', classes: 'bg-electric/15 text-electric border-electric/20' },
  watching: { label: '👀 Watching', classes: 'bg-purple/15 text-purple border-purple/20' },
  watched: { label: '✓ Watched', classes: 'bg-cyan/15 text-cyan border-cyan/20' },
  rated: { label: '⭐ Rated', classes: 'bg-pink/15 text-pink border-pink/20' },
  rejected: { label: '✗ Not my vibe', classes: 'bg-error/15 text-error border-error/20' },
};

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border ${config.classes} ${className}`}>
      {config.label}
    </span>
  );
}
