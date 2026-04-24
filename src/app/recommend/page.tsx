'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import { MoodTag, MOOD_TAGS, RECOMMENDATION_REASONS } from '@/lib/types';
import PageHeader from '@/components/PageHeader';
import GlassCard from '@/components/GlassCard';
import ConfidenceSlider from '@/components/ConfidenceSlider';
import MoodTagChip from '@/components/MoodTagChip';
import UserAvatar from '@/components/UserAvatar';

function RecommendFlow() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { titles, getTitle, currentUser, groupMembers, getUser, groups, addRecommendation } = useApp();
  
  const initialTitleId = searchParams.get('titleId');
  const initialGroupId = searchParams.get('groupId');
  
  const [step, setStep] = useState(initialTitleId ? 2 : 1);
  const [selectedTitleId, setSelectedTitleId] = useState<string | null>(initialTitleId);
  const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>(null);
  const [isGroupRec, setIsGroupRec] = useState(!!initialGroupId);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(initialGroupId);
  
  const [reason, setReason] = useState('');
  const [confidence, setConfidence] = useState(80);
  const [selectedMoods, setSelectedMoods] = useState<MoodTag[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedTitle = selectedTitleId ? getTitle(selectedTitleId) : null;
  
  // Get all unique users from all groups the current user is in (excluding themselves)
  const myGroupIds = groupMembers.filter(gm => gm.user_id === currentUser?.id).map(gm => gm.group_id);
  const friendIds = [...new Set(groupMembers
    .filter(gm => myGroupIds.includes(gm.group_id) && gm.user_id !== currentUser?.id)
    .map(gm => gm.user_id)
  )];
  const friends = friendIds.map(id => getUser(id)).filter(Boolean);
  const myGroups = myGroupIds.map(id => groups.find(g => g.id === id)).filter(Boolean);

  const handleNextStep = () => {
    if (step === 1 && selectedTitleId) setStep(2);
    else if (step === 2 && (selectedRecipientId || isGroupRec)) setStep(3);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleMood = (tag: MoodTag) => {
    if (selectedMoods.includes(tag)) {
      setSelectedMoods(selectedMoods.filter(t => t !== tag));
    } else if (selectedMoods.length < 3) {
      setSelectedMoods([...selectedMoods, tag]);
    }
  };

  const handleSubmit = () => {
    if (!currentUser || !selectedTitleId) return;
    
    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      addRecommendation({
        id: `rec-${Date.now()}`,
        title_id: selectedTitleId,
        group_id: selectedGroupId || undefined,
        recommended_by: currentUser.id,
        recommended_to_user_id: isGroupRec ? undefined : selectedRecipientId!,
        recommended_to_group: isGroupRec,
        reason: reason || RECOMMENDATION_REASONS[Math.floor(Math.random() * RECOMMENDATION_REASONS.length)],
        confidence_score: confidence,
        mood_tags: selectedMoods,
        status: 'pending',
        created_at: new Date().toISOString(),
      });
      
      router.push('/home'); // Or a success screen
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <PageHeader 
        title="Send Recommendation" 
        subtitle="Put your taste on the line."
        backButton={step > 1}
      />
      
      {/* Progress Bar */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map(i => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${step >= i ? 'bg-electric' : 'bg-surface'} transition-colors`} />
        ))}
      </div>

      {step === 1 && (
        <div className="page-enter space-y-4">
          <h2 className="text-xl font-bold">1. What are you recommending?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {titles.map(title => (
              <GlassCard 
                key={title.id}
                hover
                onClick={() => setSelectedTitleId(title.id)}
                className={`p-3 cursor-pointer transition-all ${selectedTitleId === title.id ? 'ring-2 ring-electric bg-surface-hover' : ''}`}
              >
                <div className={`aspect-[2/3] rounded bg-surface mb-2 poster-gradient-${title.poster_gradient} overflow-hidden`}>
                  {title.poster_url && /* eslint-disable-next-line @next/next/no-img-element */ <img src={title.poster_url} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="text-xs font-bold truncate">{title.title}</div>
              </GlassCard>
            ))}
          </div>
          <div className="flex justify-end pt-4">
            <button 
              onClick={handleNextStep}
              disabled={!selectedTitleId}
              className="px-6 py-2.5 bg-electric text-white font-medium rounded-xl disabled:opacity-50 btn-press"
            >
              Next Step
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="page-enter space-y-6">
          <h2 className="text-xl font-bold">2. Who is this for?</h2>
          
          <div className="flex gap-2 p-1 bg-surface rounded-xl">
            <button 
              onClick={() => { setIsGroupRec(false); setSelectedGroupId(null); }}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${!isGroupRec ? 'bg-background text-soft-white shadow' : 'text-muted'}`}
            >
              A Friend
            </button>
            <button 
              onClick={() => { setIsGroupRec(true); setSelectedRecipientId(null); }}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${isGroupRec ? 'bg-background text-soft-white shadow' : 'text-muted'}`}
            >
              A Group
            </button>
          </div>

          {!isGroupRec ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {friends.map(friend => friend && (
                <GlassCard 
                  key={friend.id}
                  hover
                  onClick={() => setSelectedRecipientId(friend.id)}
                  className={`p-4 flex items-center gap-3 cursor-pointer transition-all ${selectedRecipientId === friend.id ? 'ring-2 ring-electric bg-surface-hover' : ''}`}
                >
                  <UserAvatar name={friend.display_name} size="sm" />
                  <div className="font-medium text-sm">{friend.display_name}</div>
                </GlassCard>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {myGroups.map(group => group && (
                <GlassCard 
                  key={group.id}
                  hover
                  onClick={() => setSelectedGroupId(group.id)}
                  className={`p-4 flex flex-col cursor-pointer transition-all ${selectedGroupId === group.id ? 'ring-2 ring-electric bg-surface-hover' : ''}`}
                >
                  <div className="font-bold">{group.name}</div>
                  <div className="text-xs text-muted mt-1">{group.vibe}</div>
                </GlassCard>
              ))}
            </div>
          )}

          <div className="flex justify-between pt-4">
            <button onClick={handlePrevStep} className="px-6 py-2.5 text-muted hover:text-soft-white transition-colors">
              Back
            </button>
            <button 
              onClick={handleNextStep}
              disabled={(!isGroupRec && !selectedRecipientId) || (isGroupRec && !selectedGroupId)}
              className="px-6 py-2.5 bg-electric text-white font-medium rounded-xl disabled:opacity-50 btn-press"
            >
              Next Step
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="page-enter space-y-6">
          <div className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border">
            <div className={`w-12 h-16 rounded bg-surface shrink-0 poster-gradient-${selectedTitle?.poster_gradient}`} />
            <div>
              <div className="text-xs text-muted mb-0.5">Recommending</div>
              <div className="font-bold leading-tight">{selectedTitle?.title}</div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block font-bold">Why should they watch this?</label>
            <textarea 
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="e.g. This feels painfully you."
              className="h-24 resize-none"
              maxLength={200}
            />
            <div className="text-right text-[10px] text-muted">{reason.length}/200</div>
          </div>

          <div className="space-y-4">
            <label className="block font-bold">Confidence Score</label>
            <ConfidenceSlider value={confidence} onChange={setConfidence} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label className="block font-bold">Mood Tags</label>
              <span className="text-xs text-muted">{selectedMoods.length}/3</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {MOOD_TAGS.map(tag => (
                <MoodTagChip 
                  key={tag} 
                  tag={tag} 
                  selected={selectedMoods.includes(tag)}
                  onClick={() => toggleMood(tag)}
                  className={selectedMoods.length >= 3 && !selectedMoods.includes(tag) ? 'opacity-50 cursor-not-allowed' : ''}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-6 border-t border-border">
            <button onClick={handlePrevStep} className="px-6 py-3 text-muted hover:text-soft-white transition-colors" disabled={isSubmitting}>
              Back
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting || selectedMoods.length === 0 || !reason.trim()}
              className="px-8 py-3 bg-gradient-to-r from-electric to-purple text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,255,0.3)] disabled:opacity-50 btn-press flex items-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : null}
              Send Recommendation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RecommendPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecommendFlow />
    </Suspense>
  );
}
