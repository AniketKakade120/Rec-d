'use client';

import { Group } from '@/lib/types';
import GlassCard from './GlassCard';
import { useApp } from '@/lib/context';
import { useRouter } from 'next/navigation';

interface GroupCardProps {
  group: Group;
}

export default function GroupCard({ group }: GroupCardProps) {
  const { getGroupMembers, getGroupRecommendations } = useApp();
  const router = useRouter();
  
  const members = getGroupMembers(group.id);
  const recommendations = getGroupRecommendations(group.id);
  const pendingCount = recommendations.filter(r => r.status === 'pending').length;

  return (
    <GlassCard hover onClick={() => router.push(`/groups/${group.id}`)} className="h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl poster-gradient-${group.avatar_gradient} flex items-center justify-center text-xl shadow-lg border border-white/10`}>
          {group.name.charAt(0).toUpperCase()}
        </div>
        {pendingCount > 0 && (
          <span className="bg-electric/20 text-electric text-xs font-bold px-2 py-1 rounded-lg border border-electric/30">
            {pendingCount} new
          </span>
        )}
      </div>
      
      <h3 className="font-bold text-xl mb-1">{group.name}</h3>
      <p className="text-muted text-sm mb-4">{group.vibe}</p>
      
      <div className="mt-auto pt-4 border-t border-border flex justify-between items-center">
        <div className="flex -space-x-2">
          {members.slice(0, 4).map((member, i) => (
            <div 
              key={member.id} 
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-[#1e1e22] z-${40 - i * 10} poster-gradient-${(i % 10) + 1}`}
              title={member.display_name}
            >
              {member.display_name.charAt(0)}
            </div>
          ))}
          {members.length > 4 && (
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-[#1e1e22] bg-surface z-0">
              +{members.length - 4}
            </div>
          )}
        </div>
        <span className="text-xs text-muted font-medium">{recommendations.length} recs</span>
      </div>
    </GlassCard>
  );
}
