'use client';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'blue' | 'pink' | 'purple' | 'none';
  onClick?: () => void;
}

export default function GlassCard({ children, className = '', hover = false, glow = 'none', onClick }: GlassCardProps) {
  const glowClass = glow !== 'none' ? `glow-${glow}` : '';
  const hoverClass = hover ? 'card-hover cursor-pointer' : '';

  return (
    <div
      className={`glass rounded-2xl p-5 ${glowClass} ${hoverClass} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </div>
  );
}
