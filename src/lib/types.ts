// Supabase-ready data model types

export interface User {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string;
  taste_archetype: TasteArchetype;
  created_at: string;
}

export type TasteArchetype =
  | 'Emotional Damage Dealer'
  | 'Plot Twist Addict'
  | 'Comfort Watch Specialist'
  | 'Horror Sicko'
  | 'Rom-Com Apologist'
  | 'Prestige TV Snob'
  | 'Anime Evangelist'
  | 'Slow-Burn Criminal'
  | 'Franchise Defender'
  | 'Documentary Goblin'
  | 'Sitcom Loyalist'
  | 'Thriller Merchant';

export const TASTE_ARCHETYPES: TasteArchetype[] = [
  'Emotional Damage Dealer',
  'Plot Twist Addict',
  'Comfort Watch Specialist',
  'Horror Sicko',
  'Rom-Com Apologist',
  'Prestige TV Snob',
  'Anime Evangelist',
  'Slow-Burn Criminal',
  'Franchise Defender',
  'Documentary Goblin',
  'Sitcom Loyalist',
  'Thriller Merchant',
];

export interface Group {
  id: string;
  name: string;
  vibe: GroupVibe;
  invite_code: string;
  created_by: string;
  created_at: string;
  avatar_gradient: number;
}

export type GroupVibe =
  | 'Movie chaos'
  | 'Prestige drama'
  | 'Comfort watch club'
  | 'Horror nights'
  | 'Sitcom people'
  | 'Anything goes';

export const GROUP_VIBES: GroupVibe[] = [
  'Movie chaos',
  'Prestige drama',
  'Comfort watch club',
  'Horror nights',
  'Sitcom people',
  'Anything goes',
];

export interface GroupMember {
  id: string;
  group_id: string;
  user_id: string;
  role: 'admin' | 'member';
  joined_at: string;
}

export interface Title {
  id: string;
  tmdb_id?: number;
  title: string;
  type: 'movie' | 'series';
  poster_url?: string;
  poster_gradient: number;
  release_year: number;
  genres: string[];
  overview: string;
  external_rating: number;
}

export type RecommendationStatus =
  | 'pending'
  | 'accepted'
  | 'watching'
  | 'watched'
  | 'rated'
  | 'rejected';

export interface Recommendation {
  id: string;
  title_id: string;
  group_id?: string;
  recommended_by: string;
  recommended_to_user_id?: string;
  recommended_to_group?: boolean;
  reason: string;
  confidence_score: number;
  mood_tags: MoodTag[];
  status: RecommendationStatus;
  created_at: string;
}

export type MoodTag =
  | 'Emotional damage'
  | 'Comfort watch'
  | 'Mind-bending'
  | 'Chaotic'
  | 'Prestige'
  | 'Funny'
  | 'Slow burn'
  | 'Underrated'
  | 'Date night'
  | 'Weekend binge'
  | 'Existential'
  | 'Pure vibes';

export const MOOD_TAGS: MoodTag[] = [
  'Emotional damage',
  'Comfort watch',
  'Mind-bending',
  'Chaotic',
  'Prestige',
  'Funny',
  'Slow burn',
  'Underrated',
  'Date night',
  'Weekend binge',
  'Existential',
  'Pure vibes',
];

export type ReactionTag =
  | 'You get me'
  | 'Bro cooked'
  | 'Taste confirmed'
  | 'This ruined me'
  | 'Mid but valid'
  | 'Overhyped'
  | 'You owe me 2 hours'
  | 'No notes'
  | 'Never recommend again'
  | 'Taste card revoked'
  | 'I see the vision'
  | 'Peak recommendation';

export const REACTION_TAGS: ReactionTag[] = [
  'You get me',
  'Bro cooked',
  'Taste confirmed',
  'This ruined me',
  'Mid but valid',
  'Overhyped',
  'You owe me 2 hours',
  'No notes',
  'Never recommend again',
  'Taste card revoked',
  'I see the vision',
  'Peak recommendation',
];

export interface Rating {
  id: string;
  recommendation_id: string;
  rated_by: string;
  movie_rating: number; // 1-5
  recommendation_accuracy: number; // 1-5
  reaction_tag: ReactionTag;
  comment?: string;
  created_at: string;
}

export type BadgeType =
  | 'Certified Taste'
  | 'Emotional Damage Dealer'
  | 'Comfort Watch Specialist'
  | 'Plot Twist Merchant'
  | 'Overhype Merchant'
  | 'Slow-Burn Criminal'
  | 'No Notes'
  | 'Taste Confirmed'
  | 'Risky Recommender'
  | 'Group Favorite';

export interface Badge {
  id: string;
  user_id: string;
  group_id?: string;
  badge_type: BadgeType;
  earned_at: string;
}

export interface TasteScore {
  score: number;
  total_sent: number;
  total_rated: number;
  avg_accuracy: number;
  best_reaction: ReactionTag;
  most_trusted_by: string;
  most_ignored_by: string;
}

export interface ActivityItem {
  id: string;
  type: 'recommendation_sent' | 'recommendation_accepted' | 'recommendation_rated' | 'taste_score_changed' | 'badge_earned' | 'member_joined' | 'movie_trending';
  user_id: string;
  target_user_id?: string;
  title_id?: string;
  group_id?: string;
  message: string;
  created_at: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  taste_score: number;
  badge?: BadgeType;
  label: string;
}

export const ACCURACY_LABELS: Record<number, string> = {
  1: 'Never recommend again',
  2: 'You tried',
  3: 'Mid but I see the vision',
  4: 'Solid read',
  5: 'You get me',
};

export const CONFIDENCE_LABELS = [
  { min: 0, max: 30, label: 'Risky take' },
  { min: 31, max: 60, label: 'I see the vision' },
  { min: 61, max: 85, label: 'Pretty confident' },
  { min: 86, max: 100, label: 'Certified banger' },
];

export function getConfidenceLabel(score: number): string {
  const match = CONFIDENCE_LABELS.find(c => score >= c.min && score <= c.max);
  return match?.label ?? 'Unknown';
}

export const RECOMMENDATION_REASONS = [
  "This feels painfully you.",
  "You'll either love this or block me.",
  "Trust me, this is your exact vibe.",
  "The ending will personally attack you.",
  "You need this for character development.",
];
