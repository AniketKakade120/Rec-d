'use client';

import { useApp } from '@/lib/context';
import PageHeader from '@/components/PageHeader';
import UserAvatar from '@/components/UserAvatar';
import TasteScoreCard from '@/components/TasteScoreCard';
import GlassCard from '@/components/GlassCard';
import BadgePill from '@/components/BadgePill';
import ReactionChip from '@/components/ReactionChip';

export default function ProfilePage() {
  const { currentUser, tasteScore, getUserBadges, logout } = useApp();

  if (!currentUser) return null;

  const badges = getUserBadges(currentUser.id);

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Profile" 
        action={
          <button 
            onClick={logout}
            className="px-4 py-2 bg-surface hover:bg-error/20 border border-border hover:border-error/50 text-error rounded-lg text-sm font-medium transition-colors btn-press"
          >
            Logout
          </button>
        }
      />

      <div className="flex flex-col md:flex-row gap-6">
        <GlassCard className="flex-1 flex flex-col items-center justify-center text-center py-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple/20 rounded-full blur-[60px] pointer-events-none" />
          
          <UserAvatar name={currentUser.display_name} size="xl" className="mb-4 text-3xl shadow-xl border-4 border-surface" />
          <h2 className="text-2xl font-bold text-soft-white">{currentUser.display_name}</h2>
          <p className="text-muted text-sm mb-4">@{currentUser.username}</p>
          
          <div className="inline-block bg-surface-hover border border-border px-3 py-1.5 rounded-full text-xs font-medium text-soft-white/80">
            {currentUser.taste_archetype}
          </div>
        </GlassCard>

        <GlassCard glow="blue" className="shrink-0 flex items-center justify-center py-8 md:px-12">
          <TasteScoreCard score={tasteScore.score} size="lg" label="Lifetime Taste Score" />
        </GlassCard>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <GlassCard className="text-center p-4">
          <div className="text-3xl font-bold text-soft-white mb-1">{tasteScore.total_sent}</div>
          <div className="text-xs text-muted font-medium uppercase tracking-wider">Recs Sent</div>
        </GlassCard>
        <GlassCard className="text-center p-4">
          <div className="text-3xl font-bold text-soft-white mb-1">{tasteScore.total_rated}</div>
          <div className="text-xs text-muted font-medium uppercase tracking-wider">Verdicts Given</div>
        </GlassCard>
        <GlassCard className="text-center p-4">
          <div className="text-3xl font-bold text-electric mb-1">{tasteScore.avg_accuracy.toFixed(1)}</div>
          <div className="text-xs text-muted font-medium uppercase tracking-wider">Avg Accuracy</div>
        </GlassCard>
        <GlassCard className="text-center p-4 flex flex-col items-center justify-center">
          <ReactionChip tag={tasteScore.best_reaction} selected className="mb-1 bg-transparent border-none p-0 ring-0 text-xl pointer-events-none" />
          <div className="text-xs text-muted font-medium uppercase tracking-wider mt-2">Best Reaction</div>
        </GlassCard>
      </div>

      <section>
        <h3 className="text-xl font-bold mb-4">Taste Cabinet</h3>
        <GlassCard className="p-6">
          <div className="flex flex-wrap gap-3">
            {badges.map(badge => (
              <BadgePill key={badge.id} badge={badge.badge_type} className="text-sm px-3 py-1.5" />
            ))}
          </div>
          {badges.length === 0 && (
            <p className="text-muted text-sm">No badges earned yet. Start recommending to build your cabinet.</p>
          )}
        </GlassCard>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">Top Genres</h3>
        <GlassCard className="p-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-bold">Drama</span>
                <span className="text-muted">42%</span>
              </div>
              <div className="w-full bg-surface rounded-full h-2">
                <div className="bg-electric h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-bold">Comedy</span>
                <span className="text-muted">28%</span>
              </div>
              <div className="w-full bg-surface rounded-full h-2">
                <div className="bg-purple h-2 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-bold">Sci-Fi</span>
                <span className="text-muted">15%</span>
              </div>
              <div className="w-full bg-surface rounded-full h-2">
                <div className="bg-cyan h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
