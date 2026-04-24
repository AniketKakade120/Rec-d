'use client';

import { LeaderboardEntry } from '@/lib/types';
import UserAvatar from './UserAvatar';
import BadgePill from './BadgePill';

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  isCurrentUser?: boolean;
}

export default function LeaderboardRow({ entry, isCurrentUser = false }: LeaderboardRowProps) {
  const isTop3 = entry.rank <= 3;
  
  const getRankColor = () => {
    if (entry.rank === 1) return 'text-yellow glow-yellow';
    if (entry.rank === 2) return 'text-muted'; // Silver-ish
    if (entry.rank === 3) return 'text-orange-400'; // Bronze-ish
    return 'text-muted/50';
  };

  return (
    <div className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${isCurrentUser ? 'bg-surface border border-electric/30' : 'hover:bg-surface/50 border border-transparent'}`}>
      <div className={`w-6 text-center font-bold text-lg ${getRankColor()}`}>
        {entry.rank}
      </div>
      
      <UserAvatar name={entry.user.display_name} size="md" />
      
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-soft-white truncate">{entry.user.display_name}</span>
          {isCurrentUser && <span className="text-[10px] uppercase tracking-wider bg-surface px-1.5 py-0.5 rounded text-muted">You</span>}
        </div>
        <div className="text-xs text-muted truncate">{entry.label}</div>
      </div>
      
      <div className="flex flex-col items-end shrink-0">
        <div className="font-bold text-xl gradient-text-cyan">{entry.taste_score}%</div>
        {entry.badge && (
          <div className="hidden sm:block mt-1">
            <BadgePill badge={entry.badge} className="scale-90 origin-right" />
          </div>
        )}
      </div>
    </div>
  );
}
