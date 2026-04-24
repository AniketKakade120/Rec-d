'use client';

import { useState } from 'react';
import { useApp } from '@/lib/context';
import { ALL_GENRES } from '@/lib/mock-data';
import MovieCard from '@/components/MovieCard';
import PageHeader from '@/components/PageHeader';
import GlassCard from '@/components/GlassCard';

export default function DiscoverPage() {
  const { titles } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const filteredTitles = titles.filter(title => {
    const matchesSearch = title.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          title.overview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre ? title.genres.includes(selectedGenre) : true;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Discover" 
        subtitle="Find something to put your taste on the line for."
      />

      {/* TODO: Implement TMDB search here when API key is available */}
      <GlassCard className="p-2 flex items-center bg-surface-hover/50">
        <span className="text-xl mx-3 opacity-50">🔍</span>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search movies or shows..." 
          className="flex-1 bg-transparent border-none p-2 outline-none text-soft-white placeholder:text-muted/60"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="w-8 h-8 flex items-center justify-center text-muted hover:text-soft-white rounded-full hover:bg-surface"
          >
            ✕
          </button>
        )}
      </GlassCard>

      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        <button
          onClick={() => setSelectedGenre(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors btn-press ${
            selectedGenre === null 
              ? 'bg-electric text-white' 
              : 'bg-surface border border-border text-muted hover:text-soft-white'
          }`}
        >
          All
        </button>
        {ALL_GENRES.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors btn-press ${
              selectedGenre === genre 
                ? 'bg-electric text-white' 
                : 'bg-surface border border-border text-muted hover:text-soft-white'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {filteredTitles.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredTitles.map(title => (
            <MovieCard 
              key={title.id} 
              title={title} 
              showRecommendAction 
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="text-4xl mb-4 opacity-50">🍿</div>
          <h3 className="text-lg font-bold mb-2">No titles found</h3>
          <p className="text-muted text-sm">Try a different search or genre.</p>
        </div>
      )}
    </div>
  );
}
