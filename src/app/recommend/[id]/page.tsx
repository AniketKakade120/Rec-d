'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import { REACTION_TAGS, ReactionTag } from '@/lib/types';
import PageHeader from '@/components/PageHeader';
import GlassCard from '@/components/GlassCard';
import RatingStars from '@/components/RatingStars';
import ReactionChip from '@/components/ReactionChip';
import RecommendationCard from '@/components/RecommendationCard';
import EmptyState from '@/components/EmptyState';

export default function RecommendationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { recommendations, updateRecommendationStatus, addRating, currentUser } = useApp();
  
  const [ratingStep, setRatingStep] = useState(0); // 0 = not rating, 1 = star rating, 2 = reaction & submit
  const [movieRating, setMovieRating] = useState(0);
  const [accuracyRating, setAccuracyRating] = useState(0);
  const [reaction, setReaction] = useState<ReactionTag | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const rec = recommendations.find(r => r.id === resolvedParams.id);

  if (!rec) {
    return <EmptyState title="Not Found" description="This recommendation could not be found." />;
  }

  const isReceiver = currentUser?.id === rec.recommended_to_user_id;
  const isSender = currentUser?.id === rec.recommended_by;
  
  const handleUpdateStatus = (status: any) => {
    updateRecommendationStatus(rec.id, status);
  };

  const handleSubmitRating = () => {
    if (!currentUser || !reaction || movieRating === 0 || accuracyRating === 0) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      addRating({
        id: `rating-${Date.now()}`,
        recommendation_id: rec.id,
        rated_by: currentUser.id,
        movie_rating: movieRating,
        recommendation_accuracy: accuracyRating,
        reaction_tag: reaction,
        comment: comment.trim() || undefined,
        created_at: new Date().toISOString(),
      });
      router.push('/home');
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <PageHeader title="Recommendation Detail" backButton />
      
      {ratingStep === 0 && (
        <div className="page-enter">
          <RecommendationCard recommendation={rec} />
          
          {isReceiver && rec.status === 'pending' && (
            <GlassCard className="mt-6 flex flex-col gap-3">
              <h3 className="font-bold">What's your verdict?</h3>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleUpdateStatus('accepted')}
                  className="py-3 bg-electric text-white font-medium rounded-xl btn-press"
                >
                  Accept Challenge
                </button>
                <button 
                  onClick={() => handleUpdateStatus('rejected')}
                  className="py-3 bg-surface border border-border text-soft-white font-medium rounded-xl btn-press"
                >
                  Not my vibe
                </button>
              </div>
            </GlassCard>
          )}

          {isReceiver && rec.status === 'accepted' && (
            <div className="mt-6">
              <button 
                onClick={() => handleUpdateStatus('watching')}
                className="w-full py-4 bg-purple text-white font-bold rounded-xl btn-press text-lg"
              >
                Mark as Watching 👀
              </button>
            </div>
          )}

          {isReceiver && rec.status === 'watching' && (
            <div className="mt-6">
              <button 
                onClick={() => handleUpdateStatus('watched')}
                className="w-full py-4 bg-cyan text-ink font-bold rounded-xl btn-press text-lg shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              >
                I've Watched It! ✓
              </button>
            </div>
          )}

          {isReceiver && rec.status === 'watched' && (
            <div className="mt-6">
              <button 
                onClick={() => setRatingStep(1)}
                className="w-full py-4 bg-gradient-to-r from-pink to-purple text-white font-bold rounded-xl btn-press text-lg shadow-lg shadow-pink/20"
              >
                Rate Recommendation Now
              </button>
            </div>
          )}
          
          {isSender && (
            <GlassCard className="mt-6">
              <h3 className="font-bold mb-2">Recommendation Evidence</h3>
              <p className="text-sm text-muted">You sent this. Wait for their verdict to see how your Taste Score changes.</p>
            </GlassCard>
          )}
        </div>
      )}

      {ratingStep === 1 && (
        <div className="page-enter space-y-8">
          <GlassCard glow="blue">
            <h3 className="text-xl font-bold mb-6 text-center">Rate the Content</h3>
            <div className="flex flex-col items-center gap-4">
              <RatingStars value={movieRating} onChange={setMovieRating} size="lg" />
              <p className="text-muted text-sm text-center max-w-xs">
                How good was the movie/show itself, regardless of whether it fit your taste?
              </p>
            </div>
          </GlassCard>

          <GlassCard glow="purple">
            <h3 className="text-xl font-bold mb-6 text-center">Rate the Accuracy</h3>
            <div className="flex flex-col items-center gap-4">
              <RatingStars value={accuracyRating} onChange={setAccuracyRating} size="lg" />
              <p className="text-muted text-sm text-center max-w-xs">
                Did they cook? How well did this recommendation match your actual taste?
              </p>
              <div className="w-full max-w-xs mt-2 text-center h-6 text-sm font-bold text-electric">
                {accuracyRating === 1 && 'Never recommend again'}
                {accuracyRating === 2 && 'You tried'}
                {accuracyRating === 3 && 'Mid but I see the vision'}
                {accuracyRating === 4 && 'Solid read'}
                {accuracyRating === 5 && 'You get me'}
              </div>
            </div>
          </GlassCard>

          <div className="flex justify-end pt-4">
            <button 
              onClick={() => setRatingStep(2)}
              disabled={movieRating === 0 || accuracyRating === 0}
              className="px-8 py-3 bg-electric text-white font-bold rounded-xl disabled:opacity-50 btn-press"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {ratingStep === 2 && (
        <div className="page-enter space-y-8">
          <GlassCard glow="pink">
            <h3 className="text-xl font-bold mb-4">Choose a Verdict Tag</h3>
            <div className="flex flex-wrap gap-2">
              {REACTION_TAGS.map(tag => (
                <ReactionChip 
                  key={tag} 
                  tag={tag} 
                  selected={reaction === tag}
                  onClick={() => setReaction(tag)}
                />
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-lg font-bold mb-4">Final Remarks (Optional)</h3>
            <textarea 
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Leave a final verdict. Be honest, but don't end the friendship."
              className="h-24 resize-none"
            />
          </GlassCard>

          <div className="flex justify-between pt-4">
            <button 
              onClick={() => setRatingStep(1)}
              className="px-6 py-3 text-muted hover:text-soft-white transition-colors"
            >
              Back
            </button>
            <button 
              onClick={handleSubmitRating}
              disabled={!reaction || isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-pink to-purple text-white font-bold rounded-xl disabled:opacity-50 btn-press flex items-center gap-2 shadow-lg shadow-pink/20"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : null}
              Submit Verdict
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
