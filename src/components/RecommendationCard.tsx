'use client';

import { Recommendation } from '@/lib/types';
import GlassCard from './GlassCard';
import StatusBadge from './StatusBadge';
import UserAvatar from './UserAvatar';
import MoodTagChip from './MoodTagChip';
import { useApp } from '@/lib/context';
import { useRouter } from 'next/navigation';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onClick?: () => void;
}

export default function RecommendationCard({ recommendation, onClick }: RecommendationCardProps) {
  const { getUser, getTitle, currentUser } = useApp();
  const router = useRouter();
  
  const sender = getUser(recommendation.recommended_by);
  const receiver = recommendation.recommended_to_user_id ? getUser(recommendation.recommended_to_user_id) : null;
  const title = getTitle(recommendation.title_id);
  
  const isReceiver = currentUser?.id === recommendation.recommended_to_user_id;
  const isSender = currentUser?.id === recommendation.recommended_by;

  if (!sender || !title) return null;

  const handleClick = () => {
    if (onClick) onClick();
    else router.push(`/recommend/${recommendation.id}`);
  };

  return (
    <GlassCard hover onClick={handleClick} className="relative overflow-hidden group">
      {/* Background hint of poster gradient */}
      <div className={`absolute -right-20 -top-20 w-40 h-40 blur-3xl opacity-20 rounded-full poster-gradient-${title.poster_gradient}`} />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <UserAvatar name={sender.display_name} size="sm" />
          <div className="text-sm">
            <span className="font-medium text-soft-white">{sender.display_name}</span>
            <span className="text-muted"> to </span>
            <span className="font-medium text-soft-white">
              {recommendation.recommended_to_group ? 'the group' : receiver?.display_name || 'someone'}
            </span>
          </div>
        </div>
        <StatusBadge status={recommendation.status} />
      </div>

      <div className="flex gap-4 relative z-10">
        <div className={`w-16 h-24 sm:w-20 sm:h-30 shrink-0 rounded-lg overflow-hidden poster-gradient-${title.poster_gradient}`}>
          {title.poster_url && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={title.poster_url} alt={title.title} className="w-full h-full object-cover" />
          )}
        </div>
        
        <div className="flex-grow flex flex-col min-w-0">
          <h3 className="font-bold text-lg leading-tight truncate mb-1">{title.title}</h3>
          <p className="text-xs text-muted mb-2">{title.release_year} • {title.type}</p>
          
          <div className="bg-surface/50 border border-border/50 rounded-lg p-3 text-sm italic text-soft-white/80 line-clamp-2 mt-auto relative">
            <span className="absolute -top-2 -left-1 text-2xl text-muted/30 leading-none">"</span>
            {recommendation.reason}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 relative z-10">
        {recommendation.mood_tags.slice(0, 3).map(tag => (
          <MoodTagChip key={tag} tag={tag} />
        ))}
      </div>
      
      {isReceiver && recommendation.status === 'pending' && (
        <div className="mt-4 grid grid-cols-2 gap-2 relative z-10">
          <button className="py-2 bg-electric text-white font-medium rounded-xl text-sm btn-press hover:bg-electric/90">
            Accept
          </button>
          <button className="py-2 bg-surface border border-border font-medium rounded-xl text-sm btn-press hover:bg-surface-hover">
            Not my vibe
          </button>
        </div>
      )}
      
      {isReceiver && recommendation.status === 'watched' && (
        <div className="mt-4 relative z-10">
          <button className="w-full py-2 bg-gradient-to-r from-pink to-purple text-white font-medium rounded-xl text-sm btn-press opacity-90 hover:opacity-100">
            Rate Recommendation
          </button>
        </div>
      )}
    </GlassCard>
  );
}
