'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/context';
import PageHeader from '@/components/PageHeader';
import RecommendationCard from '@/components/RecommendationCard';
import UserAvatar from '@/components/UserAvatar';
import EmptyState from '@/components/EmptyState';

export default function GroupDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { getGroup, getGroupMembers, getGroupRecommendations } = useApp();
  const [filter, setFilter] = useState<'all' | 'pending' | 'watched'>('all');

  const group = getGroup(resolvedParams.id);
  const members = getGroupMembers(resolvedParams.id);
  const allRecommendations = getGroupRecommendations(resolvedParams.id);

  if (!group) {
    return <EmptyState title="Group not found" description="This group doesn't exist or you don't have access." />;
  }

  const recommendations = allRecommendations.filter(rec => {
    if (filter === 'pending') return rec.status === 'pending';
    if (filter === 'watched') return rec.status === 'watched' || rec.status === 'rated';
    return true;
  });

  return (
    <div className="space-y-8">
      <PageHeader 
        title={group.name} 
        subtitle={group.vibe}
        backButton
        action={
          <Link 
            href={`/recommend?groupId=${group.id}`}
            className="px-4 py-2 bg-electric text-white rounded-lg text-sm font-medium hover:bg-electric/90 transition-colors btn-press inline-block shadow-lg shadow-electric/20"
          >
            Recommend to Group
          </Link>
        }
      />

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Members ({members.length})</h2>
          <button className="text-sm text-electric hover:underline">Invite code: {group.invite_code}</button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {members.map(member => (
            <div key={member.id} className="flex flex-col items-center gap-1 shrink-0 w-16">
              <UserAvatar name={member.display_name} size="lg" />
              <span className="text-[10px] text-muted truncate w-full text-center">{member.display_name}</span>
            </div>
          ))}
          <button className="flex flex-col items-center gap-1 shrink-0 w-16 group">
            <div className="w-12 h-12 rounded-full border border-dashed border-border flex items-center justify-center text-muted group-hover:border-electric group-hover:text-electric transition-colors">
              +
            </div>
            <span className="text-[10px] text-muted group-hover:text-electric transition-colors">Add</span>
          </button>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-6 overflow-x-auto hide-scrollbar border-b border-border pb-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === 'all' ? 'bg-surface text-soft-white' : 'text-muted hover:text-soft-white'}`}
          >
            All Activity
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === 'pending' ? 'bg-surface text-soft-white' : 'text-muted hover:text-soft-white'}`}
          >
            Pending
          </button>
          <button 
            onClick={() => setFilter('watched')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === 'watched' ? 'bg-surface text-soft-white' : 'text-muted hover:text-soft-white'}`}
          >
            Watched & Rated
          </button>
        </div>

        {recommendations.length > 0 ? (
          <div className="space-y-4">
            {recommendations.map(rec => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center border border-dashed border-border rounded-2xl bg-surface/30">
            <p className="text-muted mb-4">No recommendations found for this filter.</p>
            {filter === 'all' && (
              <Link 
                href={`/recommend?groupId=${group.id}`}
                className="text-electric font-medium hover:underline"
              >
                Be the first to recommend something
              </Link>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
