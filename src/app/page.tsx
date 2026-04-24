'use client';

import Link from 'next/link';
import GradientBlob from '@/components/GradientBlob';
import GlassCard from '@/components/GlassCard';
import TasteScoreCard from '@/components/TasteScoreCard';
import ReactionChip from '@/components/ReactionChip';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col pt-10">
      <GradientBlob className="top-20 left-1/2 -translate-x-1/2" />
      
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 pt-10 pb-20 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-sm mb-8 animate-float">
          <span className="text-pink">🔥</span> 
          <span className="text-muted">Put your taste on the line.</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          Recommend movies.<br />
          <span className="gradient-text">Get judged.</span>
        </h1>
        
        <p className="text-xl text-muted mb-10 max-w-2xl">
          Rec'd is where your friends rate your taste — not just the movie.
          Stop claiming good taste. Prove it.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/login" className="px-8 py-4 bg-electric text-white rounded-xl font-bold hover:bg-electric/90 transition-colors shadow-lg shadow-electric/20 btn-press text-lg">
            Start recommending
          </Link>
          <Link href="/login" className="px-8 py-4 bg-surface text-soft-white border border-border rounded-xl font-bold hover:bg-surface-hover transition-colors btn-press text-lg">
            View demo group
          </Link>
        </div>

        {/* Hero Visual */}
        <div className="mt-20 w-full max-w-3xl relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20 pointer-events-none h-[120%]" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-90 transform -rotate-2 scale-95 md:scale-100">
            <GlassCard glow="blue" className="text-left animate-float">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-pink flex items-center justify-center font-bold text-white text-xs">M</div>
                  <div className="text-sm">
                    <span className="font-medium text-soft-white">Maya</span> recommended
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-16 h-24 shrink-0 rounded-lg poster-gradient-1" />
                <div>
                  <h3 className="font-bold">The Bear</h3>
                  <div className="bg-surface border border-border rounded-lg p-2 text-xs italic mt-2 text-muted">
                    "The kitchen chaos feels painfully you."
                  </div>
                </div>
              </div>
            </GlassCard>

            <div className="flex flex-col gap-6 transform translate-y-8">
              <GlassCard glow="purple" className="flex items-center justify-center py-8">
                <TasteScoreCard score={84} />
              </GlassCard>

              <GlassCard className="flex flex-wrap gap-2 justify-center">
                <ReactionChip tag="You get me" selected />
                <ReactionChip tag="Bro cooked" />
                <ReactionChip tag="Mid but valid" />
              </GlassCard>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-32 w-full text-left relative z-30">
          <h2 className="text-3xl font-bold mb-10 text-center">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">1. Send a rec</h3>
              <p className="text-muted">Recommend a movie or show to a friend and tell them exactly why.</p>
            </div>
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="text-4xl mb-4">👀</div>
              <h3 className="text-xl font-bold mb-2">2. They watch it</h3>
              <p className="text-muted">They accept your recommendation, watch it, and prepare their verdict.</p>
            </div>
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-xl font-bold mb-2">3. Face judgment</h3>
              <p className="text-muted">They rate how well you understood their taste. Your Taste Score updates.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
