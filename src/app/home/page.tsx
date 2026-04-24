'use client';

import Link from 'next/link';
import { useApp } from '@/lib/context';
import TasteScoreCard from '@/components/TasteScoreCard';
import RecommendationCard from '@/components/RecommendationCard';
import GlassCard from '@/components/GlassCard';
import EmptyState from '@/components/EmptyState';
import MovieCard from '@/components/MovieCard';
import PageHeader from '@/components/PageHeader';

export default function HomePage() {
  const { currentUser, tasteScore, getPendingForUser, activity, titles } = useApp();

  if (!currentUser) return null;

  const pendingRecs = getPendingForUser();
  
  return (
    <div className="space-y-10">
      <PageHeader 
        title="Home" 
        subtitle={pendingRecs.length > 0 ? `${pendingRecs.length} friends are waiting for your verdict.` : 'Your taste is currently safe.'}
      />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="col-span-1 md:col-span-2 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-electric/20 rounded-full blur-[80px] pointer-events-none transition-all group-hover:bg-electric/30" />
          
          <h2 className="text-xl font-bold mb-2 text-soft-white relative z-10">Welcome back, {currentUser.display_name}</h2>
          <p className="text-muted mb-6 relative z-10">Ready to put your taste on the line?</p>
          
          <div className="flex gap-4 relative z-10 mt-auto">
            <Link href="/discover" className="px-6 py-3 bg-electric text-white font-medium rounded-xl hover:bg-electric/90 transition-colors btn-press inline-block">
              Recommend something
            </Link>
          </div>
        </GlassCard>

        <GlassCard className="col-span-1 flex items-center justify-center py-6" glow="blue">
          <TasteScoreCard score={tasteScore.score} />
        </GlassCard>
      </section>

      {/* Pending Recommendations */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Needs Your Verdict</h2>
          <Link href="/profile" className="text-sm text-electric hover:underline">View all</Link>
        </div>
        
        {pendingRecs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {pendingRecs.slice(0, 2).map(rec => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        ) : (
          <EmptyState 
            title="Suspiciously peaceful" 
            description="No one has recommended anything to you recently. Time to send one first?"
            icon="🕊️"
          />
        )}
      </section>

      {/* Discovery Carousel */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Trending in your groups</h2>
          <Link href="/discover" className="text-sm text-electric hover:underline">Discover more</Link>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
          {titles.slice(0, 5).map(title => (
            <div key={title.id} className="w-[160px] sm:w-[180px] shrink-0 snap-start">
              <MovieCard title={title} showRecommendAction />
            </div>
          ))}
        </div>
      </section>

      {/* Activity Feed */}
      <section>
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {activity.slice(0, 5).map(act => (
            <div key={act.id} className="p-4 rounded-xl bg-surface border border-border flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center shrink-0">
                {act.type === 'recommendation_rated' ? '⭐' : 
                 act.type === 'recommendation_sent' ? '📨' : 
                 act.type === 'taste_score_changed' ? '📈' : 
                 act.type === 'badge_earned' ? '🏅' : '👋'}
              </div>
              <div>
                <p className="text-sm text-soft-white">{act.message}</p>
                <p className="text-[10px] text-muted mt-1">
                  {new Date(act.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
