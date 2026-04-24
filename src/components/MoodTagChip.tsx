'use client';

import { MoodTag } from '@/lib/types';

interface MoodTagChipProps {
  tag: MoodTag;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const tagColors: Record<string, string> = {
  'Emotional damage': 'bg-pink/15 text-pink border-pink/20',
  'Comfort watch': 'bg-yellow/15 text-yellow border-yellow/20',
  'Mind-bending': 'bg-purple/15 text-purple border-purple/20',
  'Chaotic': 'bg-error/15 text-error border-error/20',
  'Prestige': 'bg-electric/15 text-electric border-electric/20',
  'Funny': 'bg-yellow/15 text-yellow border-yellow/20',
  'Slow burn': 'bg-cyan/15 text-cyan border-cyan/20',
  'Underrated': 'bg-purple/15 text-purple border-purple/20',
  'Date night': 'bg-pink/15 text-pink border-pink/20',
  'Weekend binge': 'bg-electric/15 text-electric border-electric/20',
  'Existential': 'bg-muted/15 text-muted border-muted/20',
  'Pure vibes': 'bg-cyan/15 text-cyan border-cyan/20',
};

export default function MoodTagChip({ tag, selected = false, onClick, className = '' }: MoodTagChipProps) {
  const baseColor = tagColors[tag] || 'bg-surface text-muted border-border';
  const selectedClass = selected
    ? 'ring-2 ring-electric/50 !bg-electric/20'
    : '';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full border transition-all btn-press ${baseColor} ${selectedClass} ${className}`}
    >
      {tag}
    </button>
  );
}
