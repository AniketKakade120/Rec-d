'use client';

export default function GradientBlob({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`} aria-hidden="true">
      <div className="relative">
        <div className="absolute w-72 h-72 bg-electric/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute w-72 h-72 bg-purple/20 rounded-full blur-[120px] animate-blob animation-delay-2000 translate-x-12" />
        <div className="absolute w-72 h-72 bg-pink/15 rounded-full blur-[120px] animate-blob animation-delay-4000 -translate-x-8 translate-y-8" />
      </div>
    </div>
  );
}
