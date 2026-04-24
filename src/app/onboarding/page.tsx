'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import { TASTE_ARCHETYPES, TasteArchetype } from '@/lib/types';
import GlassCard from '@/components/GlassCard';
import PageHeader from '@/components/PageHeader';

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding, currentUser } = useApp();
  const [step, setStep] = useState(1);
  const [archetype, setArchetype] = useState<TasteArchetype | null>(null);

  const handleNext = () => {
    if (step === 1) setStep(2);
    else {
      completeOnboarding();
      router.push('/home');
    }
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen flex flex-col max-w-2xl mx-auto pt-10 pb-20">
      <div className="mb-8 flex gap-2">
        <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-electric' : 'bg-surface'}`} />
        <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-electric' : 'bg-surface'}`} />
      </div>

      {step === 1 && (
        <div className="page-enter">
          <PageHeader 
            title={`Welcome, ${currentUser.display_name}!`} 
            subtitle="Let's set up your profile."
          />
          
          <GlassCard className="mb-8">
            <h3 className="font-bold text-lg mb-4">Choose your taste archetype</h3>
            <p className="text-muted text-sm mb-6">
              This tells people what to expect from your recommendations. Choose wisely.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TASTE_ARCHETYPES.map(type => (
                <button
                  key={type}
                  onClick={() => setArchetype(type)}
                  className={`p-4 rounded-xl border text-left transition-all btn-press ${
                    archetype === type 
                      ? 'bg-electric/20 border-electric text-soft-white ring-2 ring-electric/30' 
                      : 'bg-surface border-border text-muted hover:border-muted/50 hover:text-soft-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </GlassCard>

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              disabled={!archetype}
              className="px-8 py-3 bg-electric text-white font-bold rounded-xl disabled:opacity-50 hover:bg-electric/90 btn-press"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="page-enter">
          <PageHeader 
            title="Join your friends" 
            subtitle="Rec'd is better with a group."
          />
          
          <div className="space-y-6 mb-8">
            <GlassCard hover glow="blue" onClick={handleNext}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-electric/20 text-electric flex items-center justify-center text-2xl">
                  ➕
                </div>
                <div>
                  <h3 className="font-bold text-lg text-soft-white">Create a new group</h3>
                  <p className="text-muted text-sm">Start fresh and invite your friends.</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard hover onClick={handleNext}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-2xl">
                  🔑
                </div>
                <div>
                  <h3 className="font-bold text-lg text-soft-white">Join with invite code</h3>
                  <p className="text-muted text-sm">Enter a code a friend sent you.</p>
                </div>
              </div>
            </GlassCard>
            
            <div className="text-center">
              <button onClick={handleNext} className="text-muted text-sm hover:text-soft-white underline underline-offset-4">
                Skip for now, show me the demo data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
