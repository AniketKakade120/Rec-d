'use client';

import { Title } from '@/lib/types';
import GlassCard from './GlassCard';
import { useRouter } from 'next/navigation';

interface MovieCardProps {
  title: Title;
  onClick?: () => void;
  showRecommendAction?: boolean;
}

export default function MovieCard({ title, onClick, showRecommendAction = false }: MovieCardProps) {
  const router = useRouter();

  const handleRecommend = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/recommend?titleId=${title.id}`);
  };

  return (
    <GlassCard 
      className="flex flex-col h-full overflow-hidden p-0" 
      hover 
      onClick={onClick}
    >
      <div className={`aspect-[2/3] w-full relative poster-gradient-${title.poster_gradient}`}>
        {title.poster_url ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img 
            src={title.poster_url} 
            alt={title.title} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
            <span className="text-xl font-bold text-white/80 drop-shadow-md">{title.title}</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-xs font-medium border border-white/10">
          ★ {title.external_rating.toFixed(1)}
        </div>
        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-white/10 text-muted">
          {title.type}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg leading-tight mb-1 line-clamp-1">{title.title}</h3>
        <p className="text-muted text-sm mb-3">{title.release_year}</p>
        
        <div className="flex flex-wrap gap-1 mb-4 mt-auto">
          {title.genres.slice(0, 2).map(genre => (
            <span key={genre} className="text-[10px] px-2 py-0.5 rounded-full bg-surface border border-border text-muted">
              {genre}
            </span>
          ))}
          {title.genres.length > 2 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface border border-border text-muted">
              +{title.genres.length - 2}
            </span>
          )}
        </div>
        
        {showRecommendAction && (
          <button 
            onClick={handleRecommend}
            className="w-full py-2 rounded-xl bg-surface hover:bg-surface-hover border border-border transition-colors text-sm font-medium btn-press mt-auto"
          >
            Recommend
          </button>
        )}
      </div>
    </GlassCard>
  );
}
