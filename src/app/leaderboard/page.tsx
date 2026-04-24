'use client';

import { useState } from 'react';
import { useApp } from '@/lib/context';
import PageHeader from '@/components/PageHeader';
import LeaderboardRow from '@/components/LeaderboardRow';
import GlassCard from '@/components/GlassCard';

export default function LeaderboardPage() {
  const { leaderboard, currentUser, groups } = useApp();
  const [timeFilter, setTimeFilter] = useState<'overall' | 'week'>('overall');
  const [groupFilter, setGroupFilter] = useState<string>('all');

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Leaderboard" 
        subtitle="Taste standings. Friendships may be affected."
      />

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <GlassCard className="p-1 flex rounded-xl shrink-0 w-max">
          <button 
            onClick={() => setTimeFilter('overall')}
            className={`px-6 py-2 text-sm font-bold rounded-lg transition-colors ${timeFilter === 'overall' ? 'bg-background text-soft-white shadow' : 'text-muted'}`}
          >
            All Time
          </button>
          <button 
            onClick={() => setTimeFilter('week')}
            className={`px-6 py-2 text-sm font-bold rounded-lg transition-colors ${timeFilter === 'week' ? 'bg-background text-soft-white shadow' : 'text-muted'}`}
          >
            This Week
          </button>
        </GlassCard>

        <select 
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
          className="bg-surface border border-border text-soft-white text-sm rounded-xl px-4 py-2.5 outline-none focus:border-electric w-full sm:w-auto"
        >
          <option value="all">All My Groups</option>
          {groups.map(g => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        {leaderboard.map(entry => (
          <LeaderboardRow 
            key={entry.user.id} 
            entry={entry} 
            isCurrentUser={entry.user.id === currentUser?.id}
          />
        ))}
      </div>
      
      <div className="text-center pt-8 pb-4">
        <p className="text-xs text-muted">
          Scores are calculated based on how accurately you recommend content to others.<br/>
          Average rating out of 5 stars converted to percentage.
        </p>
      </div>
    </div>
  );
}
