'use client';

import { BadgeType } from '@/lib/types';

interface BadgePillProps {
  badge: BadgeType;
  className?: string;
}

const badgeEmojis: Record<BadgeType, string> = {
  'Certified Taste': '👑',
  'Emotional Damage Dealer': '💔',
  'Comfort Watch Specialist': '🧸',
  'Plot Twist Merchant': '🌀',
  'Overhype Merchant': '📢',
  'Slow-Burn Criminal': '🔥',
  'No Notes': '✨',
  'Taste Confirmed': '✅',
  'Risky Recommender': '🎲',
  'Group Favorite': '⭐',
};

export default function BadgePill({ badge, className = '' }: BadgePillProps) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-surface border border-border text-soft-white ${className}`}>
      <span>{badgeEmojis[badge]}</span>
      <span>{badge}</span>
    </span>
  );
}
