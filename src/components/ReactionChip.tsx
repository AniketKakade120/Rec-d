'use client';

import { ReactionTag } from '@/lib/types';

interface ReactionChipProps {
  tag: ReactionTag;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const reactionEmojis: Record<ReactionTag, string> = {
  'You get me': '🫶',
  'Bro cooked': '🔥',
  'Taste confirmed': '✅',
  'This ruined me': '😭',
  'Mid but valid': '😐',
  'Overhyped': '📢',
  'You owe me 2 hours': '⏰',
  'No notes': '✨',
  'Never recommend again': '🚫',
  'Taste card revoked': '💀',
  'I see the vision': '👁️',
  'Peak recommendation': '👑',
};

export default function ReactionChip({ tag, selected = false, onClick, className = '' }: ReactionChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl border transition-all btn-press
        ${selected
          ? 'bg-electric/20 border-electric/40 text-soft-white ring-2 ring-electric/30'
          : 'bg-surface border-border text-muted hover:border-muted/40 hover:text-soft-white'
        } ${className}`}
    >
      <span>{reactionEmojis[tag]}</span>
      <span>{tag}</span>
    </button>
  );
}
