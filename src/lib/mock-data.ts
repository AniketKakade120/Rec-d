import { User, Group, GroupMember, Title, Recommendation, Rating, Badge, ActivityItem, LeaderboardEntry } from './types';

// ============================================
// MOCK USERS
// ============================================
export const mockUsers: User[] = [
  {
    id: 'user-1',
    username: 'aniket',
    display_name: 'Aniket',
    avatar_url: '',
    taste_archetype: 'Emotional Damage Dealer',
    created_at: '2024-01-15T10:00:00Z',
  },
  {
    id: 'user-2',
    username: 'alex',
    display_name: 'Alex',
    avatar_url: '',
    taste_archetype: 'Prestige TV Snob',
    created_at: '2024-01-16T10:00:00Z',
  },
  {
    id: 'user-3',
    username: 'maya',
    display_name: 'Maya',
    avatar_url: '',
    taste_archetype: 'Plot Twist Addict',
    created_at: '2024-01-17T10:00:00Z',
  },
  {
    id: 'user-4',
    username: 'jordan',
    display_name: 'Jordan',
    avatar_url: '',
    taste_archetype: 'Horror Sicko',
    created_at: '2024-01-18T10:00:00Z',
  },
  {
    id: 'user-5',
    username: 'sam',
    display_name: 'Sam',
    avatar_url: '',
    taste_archetype: 'Comfort Watch Specialist',
    created_at: '2024-01-19T10:00:00Z',
  },
  {
    id: 'user-6',
    username: 'riley',
    display_name: 'Riley',
    avatar_url: '',
    taste_archetype: 'Anime Evangelist',
    created_at: '2024-01-20T10:00:00Z',
  },
];

// Current logged-in user (for demo)
export const currentUser = mockUsers[0];

// ============================================
// MOCK TITLES (Movies & Shows)
// ============================================
export const mockTitles: Title[] = [
  {
    id: 'title-1',
    title: 'The Bear',
    type: 'series',
    poster_gradient: 1,
    release_year: 2022,
    genres: ['Drama', 'Comedy'],
    overview: 'A young chef from the fine dining world returns to Chicago to run his family\'s Italian beef sandwich shop.',
    external_rating: 8.6,
  },
  {
    id: 'title-2',
    title: 'Aftersun',
    type: 'movie',
    poster_gradient: 2,
    release_year: 2022,
    genres: ['Drama'],
    overview: 'Sophie reflects on the shared joy and private melancholy of a holiday she took with her father twenty years earlier.',
    external_rating: 7.7,
  },
  {
    id: 'title-3',
    title: 'Everything Everywhere All At Once',
    type: 'movie',
    poster_gradient: 3,
    release_year: 2022,
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    overview: 'A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence.',
    external_rating: 8.0,
  },
  {
    id: 'title-4',
    title: 'Dune: Part Two',
    type: 'movie',
    poster_gradient: 4,
    release_year: 2024,
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    overview: 'Paul Atreides unites with the Fremen to seek revenge against the conspirators who destroyed his family.',
    external_rating: 8.5,
  },
  {
    id: 'title-5',
    title: 'The Worst Person in the World',
    type: 'movie',
    poster_gradient: 5,
    release_year: 2021,
    genres: ['Comedy', 'Drama', 'Romance'],
    overview: 'The chronicles of four years in the life of Julie, a young woman who navigates the troubled waters of her love life.',
    external_rating: 7.8,
  },
  {
    id: 'title-6',
    title: 'Severance',
    type: 'series',
    poster_gradient: 6,
    release_year: 2022,
    genres: ['Drama', 'Mystery', 'Sci-Fi'],
    overview: 'Mark leads a team of office workers whose memories have been surgically divided between work and personal lives.',
    external_rating: 8.7,
  },
  {
    id: 'title-7',
    title: 'Parasite',
    type: 'movie',
    poster_gradient: 7,
    release_year: 2019,
    genres: ['Comedy', 'Drama', 'Thriller'],
    overview: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    external_rating: 8.5,
  },
  {
    id: 'title-8',
    title: 'Past Lives',
    type: 'movie',
    poster_gradient: 8,
    release_year: 2023,
    genres: ['Drama', 'Romance'],
    overview: 'Nora and Hae Sung, two deeply connected childhood friends, are wrest apart after Nora\'s family emigrates from South Korea.',
    external_rating: 7.8,
  },
  {
    id: 'title-9',
    title: 'The Social Network',
    type: 'movie',
    poster_gradient: 9,
    release_year: 2010,
    genres: ['Biography', 'Drama'],
    overview: 'As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook.',
    external_rating: 7.8,
  },
  {
    id: 'title-10',
    title: 'La La Land',
    type: 'movie',
    poster_gradient: 10,
    release_year: 2016,
    genres: ['Comedy', 'Drama', 'Music'],
    overview: 'While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations.',
    external_rating: 8.0,
  },
  {
    id: 'title-11',
    title: 'Hereditary',
    type: 'movie',
    poster_gradient: 1,
    release_year: 2018,
    genres: ['Drama', 'Horror', 'Mystery'],
    overview: 'A grieving family is haunted by tragic and disturbing occurrences after the death of their secretive grandmother.',
    external_rating: 7.3,
  },
  {
    id: 'title-12',
    title: 'Fleabag',
    type: 'series',
    poster_gradient: 8,
    release_year: 2016,
    genres: ['Comedy', 'Drama'],
    overview: 'A dry-witted woman, known only as Fleabag, has no filter as she navigates life and love in London.',
    external_rating: 8.7,
  },
  {
    id: 'title-13',
    title: 'Succession',
    type: 'series',
    poster_gradient: 5,
    release_year: 2018,
    genres: ['Drama'],
    overview: 'The Roy family is known for controlling the biggest media and entertainment company in the world.',
    external_rating: 8.8,
  },
  {
    id: 'title-14',
    title: 'The Office',
    type: 'series',
    poster_gradient: 4,
    release_year: 2005,
    genres: ['Comedy'],
    overview: 'A mockumentary on a group of typical office workers, where the weights of the day are alleviated by humor.',
    external_rating: 9.0,
  },
  {
    id: 'title-15',
    title: 'Spider-Man: Into the Spider-Verse',
    type: 'movie',
    poster_gradient: 3,
    release_year: 2018,
    genres: ['Animation', 'Action', 'Adventure'],
    overview: 'Teen Miles Morales becomes the Spider-Man of his universe and must join with five spider-powered individuals from other dimensions.',
    external_rating: 8.4,
  },
];

// ============================================
// MOCK GROUPS
// ============================================
export const mockGroups: Group[] = [
  {
    id: 'group-1',
    name: 'Film Chaos Club',
    vibe: 'Movie chaos',
    invite_code: 'CHAOS2024',
    created_by: 'user-1',
    created_at: '2024-02-01T10:00:00Z',
    avatar_gradient: 3,
  },
  {
    id: 'group-2',
    name: 'Sunday Watchlist',
    vibe: 'Comfort watch club',
    invite_code: 'SUNDAY24',
    created_by: 'user-2',
    created_at: '2024-02-05T10:00:00Z',
    avatar_gradient: 6,
  },
  {
    id: 'group-3',
    name: 'Bad Taste Anonymous',
    vibe: 'Anything goes',
    invite_code: 'BADTASTE',
    created_by: 'user-3',
    created_at: '2024-02-10T10:00:00Z',
    avatar_gradient: 8,
  },
];

export const mockGroupMembers: GroupMember[] = [
  { id: 'gm-1', group_id: 'group-1', user_id: 'user-1', role: 'admin', joined_at: '2024-02-01T10:00:00Z' },
  { id: 'gm-2', group_id: 'group-1', user_id: 'user-2', role: 'member', joined_at: '2024-02-01T12:00:00Z' },
  { id: 'gm-3', group_id: 'group-1', user_id: 'user-3', role: 'member', joined_at: '2024-02-02T10:00:00Z' },
  { id: 'gm-4', group_id: 'group-1', user_id: 'user-4', role: 'member', joined_at: '2024-02-03T10:00:00Z' },
  { id: 'gm-5', group_id: 'group-2', user_id: 'user-1', role: 'member', joined_at: '2024-02-05T12:00:00Z' },
  { id: 'gm-6', group_id: 'group-2', user_id: 'user-2', role: 'admin', joined_at: '2024-02-05T10:00:00Z' },
  { id: 'gm-7', group_id: 'group-2', user_id: 'user-5', role: 'member', joined_at: '2024-02-06T10:00:00Z' },
  { id: 'gm-8', group_id: 'group-3', user_id: 'user-1', role: 'member', joined_at: '2024-02-10T12:00:00Z' },
  { id: 'gm-9', group_id: 'group-3', user_id: 'user-3', role: 'admin', joined_at: '2024-02-10T10:00:00Z' },
  { id: 'gm-10', group_id: 'group-3', user_id: 'user-6', role: 'member', joined_at: '2024-02-11T10:00:00Z' },
  { id: 'gm-11', group_id: 'group-3', user_id: 'user-4', role: 'member', joined_at: '2024-02-12T10:00:00Z' },
];

// ============================================
// MOCK RECOMMENDATIONS
// ============================================
export const mockRecommendations: Recommendation[] = [
  {
    id: 'rec-1',
    title_id: 'title-1',
    group_id: 'group-1',
    recommended_by: 'user-3',
    recommended_to_user_id: 'user-1',
    reason: 'The kitchen chaos feels painfully you. You\'ll either cry or start cooking.',
    confidence_score: 92,
    mood_tags: ['Emotional damage', 'Prestige'],
    status: 'pending',
    created_at: '2024-03-15T14:00:00Z',
  },
  {
    id: 'rec-2',
    title_id: 'title-6',
    group_id: 'group-1',
    recommended_by: 'user-2',
    recommended_to_user_id: 'user-1',
    reason: 'Your brain needs this. The corporate dystopia is *chef\'s kiss*.',
    confidence_score: 88,
    mood_tags: ['Mind-bending', 'Slow burn', 'Prestige'],
    status: 'watching',
    created_at: '2024-03-10T10:00:00Z',
  },
  {
    id: 'rec-3',
    title_id: 'title-7',
    group_id: 'group-1',
    recommended_by: 'user-1',
    recommended_to_user_id: 'user-2',
    reason: 'Trust me, this is your exact vibe. The class commentary will personally attack you.',
    confidence_score: 95,
    mood_tags: ['Mind-bending', 'Chaotic', 'Prestige'],
    status: 'rated',
    created_at: '2024-02-20T10:00:00Z',
  },
  {
    id: 'rec-4',
    title_id: 'title-3',
    group_id: 'group-2',
    recommended_by: 'user-1',
    recommended_to_user_id: 'user-5',
    reason: 'You need this for character development. Bring tissues.',
    confidence_score: 85,
    mood_tags: ['Emotional damage', 'Chaotic', 'Pure vibes'],
    status: 'rated',
    created_at: '2024-02-25T10:00:00Z',
  },
  {
    id: 'rec-5',
    title_id: 'title-12',
    group_id: 'group-3',
    recommended_by: 'user-6',
    recommended_to_user_id: 'user-1',
    reason: 'Fleabag is literally you in a show. Don\'t fight it.',
    confidence_score: 78,
    mood_tags: ['Funny', 'Emotional damage', 'Comfort watch'],
    status: 'accepted',
    created_at: '2024-03-12T10:00:00Z',
  },
  {
    id: 'rec-6',
    title_id: 'title-13',
    group_id: 'group-1',
    recommended_by: 'user-1',
    recommended_to_group: true,
    reason: 'If you haven\'t watched this yet, your taste card is revoked.',
    confidence_score: 97,
    mood_tags: ['Prestige', 'Chaotic', 'Slow burn'],
    status: 'pending',
    created_at: '2024-03-18T10:00:00Z',
  },
  {
    id: 'rec-7',
    title_id: 'title-11',
    group_id: 'group-3',
    recommended_by: 'user-4',
    recommended_to_user_id: 'user-1',
    reason: 'You said you could handle horror. Prove it.',
    confidence_score: 45,
    mood_tags: ['Chaotic', 'Emotional damage'],
    status: 'pending',
    created_at: '2024-03-19T10:00:00Z',
  },
  {
    id: 'rec-8',
    title_id: 'title-8',
    group_id: 'group-2',
    recommended_by: 'user-1',
    recommended_to_user_id: 'user-2',
    reason: 'The ending will personally attack you. You\'re welcome.',
    confidence_score: 90,
    mood_tags: ['Emotional damage', 'Slow burn', 'Pure vibes'],
    status: 'watched',
    created_at: '2024-03-01T10:00:00Z',
  },
];

// ============================================
// MOCK RATINGS
// ============================================
export const mockRatings: Rating[] = [
  {
    id: 'rating-1',
    recommendation_id: 'rec-3',
    rated_by: 'user-2',
    movie_rating: 5,
    recommendation_accuracy: 5,
    reaction_tag: 'You get me',
    comment: 'Okay you actually cooked. The twist destroyed me.',
    created_at: '2024-03-05T10:00:00Z',
  },
  {
    id: 'rating-2',
    recommendation_id: 'rec-4',
    rated_by: 'user-5',
    movie_rating: 4,
    recommendation_accuracy: 4,
    reaction_tag: 'Bro cooked',
    comment: 'I cried three times. Thanks for that.',
    created_at: '2024-03-10T10:00:00Z',
  },
];

// ============================================
// MOCK BADGES
// ============================================
export const mockBadges: Badge[] = [
  { id: 'badge-1', user_id: 'user-1', badge_type: 'Certified Taste', earned_at: '2024-03-10T10:00:00Z' },
  { id: 'badge-2', user_id: 'user-1', badge_type: 'Emotional Damage Dealer', earned_at: '2024-03-12T10:00:00Z' },
  { id: 'badge-3', user_id: 'user-2', badge_type: 'Taste Confirmed', earned_at: '2024-03-08T10:00:00Z' },
  { id: 'badge-4', user_id: 'user-3', badge_type: 'Plot Twist Merchant', earned_at: '2024-03-05T10:00:00Z' },
  { id: 'badge-5', user_id: 'user-4', badge_type: 'Risky Recommender', earned_at: '2024-03-15T10:00:00Z' },
  { id: 'badge-6', user_id: 'user-5', badge_type: 'Comfort Watch Specialist', earned_at: '2024-03-07T10:00:00Z' },
  { id: 'badge-7', user_id: 'user-6', badge_type: 'No Notes', earned_at: '2024-03-09T10:00:00Z' },
  { id: 'badge-8', user_id: 'user-1', badge_type: 'Group Favorite', group_id: 'group-1', earned_at: '2024-03-14T10:00:00Z' },
];

// ============================================
// MOCK ACTIVITY FEED
// ============================================
export const mockActivity: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'recommendation_sent',
    user_id: 'user-3',
    target_user_id: 'user-1',
    title_id: 'title-1',
    group_id: 'group-1',
    message: 'Maya recommended The Bear to you',
    created_at: '2024-03-15T14:00:00Z',
  },
  {
    id: 'act-2',
    type: 'recommendation_rated',
    user_id: 'user-2',
    target_user_id: 'user-1',
    title_id: 'title-7',
    message: 'Alex rated your recommendation 5/5 ⭐',
    created_at: '2024-03-14T10:00:00Z',
  },
  {
    id: 'act-3',
    type: 'taste_score_changed',
    user_id: 'user-1',
    message: 'Your Taste Score is up 8% this week',
    created_at: '2024-03-13T10:00:00Z',
  },
  {
    id: 'act-4',
    type: 'badge_earned',
    user_id: 'user-1',
    message: 'You earned the "Certified Taste" badge',
    created_at: '2024-03-12T10:00:00Z',
  },
  {
    id: 'act-5',
    type: 'recommendation_accepted',
    user_id: 'user-1',
    target_user_id: 'user-6',
    title_id: 'title-12',
    message: 'You accepted Riley\'s recommendation of Fleabag',
    created_at: '2024-03-12T08:00:00Z',
  },
  {
    id: 'act-6',
    type: 'member_joined',
    user_id: 'user-4',
    group_id: 'group-3',
    message: 'Jordan joined Bad Taste Anonymous',
    created_at: '2024-03-11T10:00:00Z',
  },
  {
    id: 'act-7',
    type: 'recommendation_sent',
    user_id: 'user-2',
    target_user_id: 'user-1',
    title_id: 'title-6',
    group_id: 'group-1',
    message: 'Alex trusted you with Severance (88% confidence)',
    created_at: '2024-03-10T10:00:00Z',
  },
];

// ============================================
// MOCK LEADERBOARD
// ============================================
export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, user: mockUsers[0], taste_score: 90, badge: 'Certified Taste', label: 'Currently cooking' },
  { rank: 2, user: mockUsers[1], taste_score: 85, badge: 'Taste Confirmed', label: 'Actually reliable' },
  { rank: 3, user: mockUsers[2], taste_score: 78, badge: 'Plot Twist Merchant', label: 'Under investigation' },
  { rank: 4, user: mockUsers[5], taste_score: 72, badge: 'No Notes', label: 'Taste confirmed' },
  { rank: 5, user: mockUsers[4], taste_score: 68, badge: 'Comfort Watch Specialist', label: 'Playing it safe' },
  { rank: 6, user: mockUsers[3], taste_score: 55, badge: 'Risky Recommender', label: 'Dangerous confidence' },
];

// ============================================
// MOCK TASTE SCORE (for current user)
// ============================================
export const mockTasteScore: import('./types').TasteScore = {
  score: 90,
  total_sent: 12,
  total_rated: 8,
  avg_accuracy: 4.5,
  best_reaction: 'You get me',
  most_trusted_by: 'Alex',
  most_ignored_by: 'Jordan',
};

// ============================================
// HELPER FUNCTIONS
// ============================================
export function getUserById(id: string): User | undefined {
  return mockUsers.find(u => u.id === id);
}

export function getTitleById(id: string): Title | undefined {
  return mockTitles.find(t => t.id === id);
}

export function getGroupById(id: string): Group | undefined {
  return mockGroups.find(g => g.id === id);
}

export function getGroupMembers(groupId: string): User[] {
  const memberIds = mockGroupMembers.filter(gm => gm.group_id === groupId).map(gm => gm.user_id);
  return mockUsers.filter(u => memberIds.includes(u.id));
}

export function getGroupRecommendations(groupId: string): Recommendation[] {
  return mockRecommendations.filter(r => r.group_id === groupId);
}

export function getUserRecommendations(userId: string): Recommendation[] {
  return mockRecommendations.filter(r => r.recommended_to_user_id === userId || r.recommended_by === userId);
}

export function getPendingForUser(userId: string): Recommendation[] {
  return mockRecommendations.filter(
    r => r.recommended_to_user_id === userId && (r.status === 'pending' || r.status === 'accepted')
  );
}

export function getRatingForRecommendation(recId: string): Rating | undefined {
  return mockRatings.find(r => r.recommendation_id === recId);
}

export function getUserBadges(userId: string): Badge[] {
  return mockBadges.filter(b => b.user_id === userId);
}

export const ALL_GENRES = [
  'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Drama',
  'Horror', 'Music', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller',
];
