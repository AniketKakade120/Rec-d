'use client';

import { getConfidenceLabel } from '@/lib/types';

interface ConfidenceSliderProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export default function ConfidenceSlider({ value, onChange, className = '' }: ConfidenceSliderProps) {
  const label = getConfidenceLabel(value);

  const getGradientColor = () => {
    if (value <= 30) return 'text-error';
    if (value <= 60) return 'text-yellow';
    if (value <= 85) return 'text-cyan';
    return 'text-electric';
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">Confidence level</span>
        <span className={`text-sm font-bold ${getGradientColor()}`}>{value}% — {label}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full"
        aria-label="Confidence score"
      />
      <div className="flex justify-between text-[10px] text-muted/60">
        <span>Risky take</span>
        <span>I see the vision</span>
        <span>Pretty confident</span>
        <span>Certified banger</span>
      </div>
    </div>
  );
}
