'use client';

interface TasteScoreCardProps {
  score: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeConfig = {
  sm: { width: 80, stroke: 6, fontSize: 'text-lg', labelSize: 'text-[10px]' },
  md: { width: 120, stroke: 8, fontSize: 'text-3xl', labelSize: 'text-xs' },
  lg: { width: 160, stroke: 10, fontSize: 'text-4xl', labelSize: 'text-sm' },
};

export default function TasteScoreCard({ score, label = 'Taste Score', size = 'md', className = '' }: TasteScoreCardProps) {
  const config = sizeConfig[size];
  const radius = (config.width - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 85) return { stroke: '#2563FF', glow: 'rgba(37, 99, 255, 0.3)' };
    if (score >= 70) return { stroke: '#7C3AED', glow: 'rgba(124, 58, 237, 0.3)' };
    if (score >= 50) return { stroke: '#FACC15', glow: 'rgba(250, 204, 21, 0.3)' };
    return { stroke: '#FF4D4D', glow: 'rgba(255, 77, 77, 0.3)' };
  };

  const color = getColor();

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className="relative" style={{ width: config.width, height: config.width }}>
        <svg width={config.width} height={config.width} className="-rotate-90">
          <circle
            cx={config.width / 2}
            cy={config.width / 2}
            r={radius}
            fill="none"
            stroke="var(--border)"
            strokeWidth={config.stroke}
          />
          <circle
            cx={config.width / 2}
            cy={config.width / 2}
            r={radius}
            fill="none"
            stroke={color.stroke}
            strokeWidth={config.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="animate-score"
            style={{ filter: `drop-shadow(0 0 6px ${color.glow})` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${config.fontSize} font-bold text-soft-white`}>{score}</span>
        </div>
      </div>
      <span className={`${config.labelSize} text-muted font-medium`}>{label}</span>
    </div>
  );
}
