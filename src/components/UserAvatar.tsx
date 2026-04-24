'use client';

interface UserAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const AVATAR_COLORS = [
  'from-electric to-purple',
  'from-pink to-purple',
  'from-cyan to-electric',
  'from-yellow to-pink',
  'from-purple to-pink',
  'from-electric to-cyan',
];

function getColorForName(name: string): string {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

const sizes = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

export default function UserAvatar({ name, size = 'md', className = '' }: UserAvatarProps) {
  const color = getColorForName(name);
  const initials = name.charAt(0).toUpperCase();

  return (
    <div
      className={`bg-gradient-to-br ${color} rounded-full flex items-center justify-center font-semibold text-white shrink-0 ${sizes[size]} ${className}`}
      aria-label={`${name}'s avatar`}
    >
      {initials}
    </div>
  );
}
