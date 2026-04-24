# Rec'd MVP

**"Recommend movies. Get judged."**

Rec'd is a social movie and series recommendation platform where friends recommend movies/shows to each other, watch them, and then rate not just the content, but also how good the recommendation was. The core product idea is: "Your friends rate your taste."

## Running Locally

To run the application locally in development mode:

1. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

### Supabase Setup
To enable actual database and authentication features, create a `.env.local` file in the root directory and add your Supabase keys:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### TMDB Integration
To enable real movie and show search, add your TMDB API key to the `.env.local` file:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
```

## Mock Data Mode

If no environment variables are provided, the app runs entirely in **Mock Data Mode**.
- Authentication is simulated (click "Demo Login" or "Continue with Google" to log in as a mock user).
- Data is pulled from `src/lib/mock-data.ts`.
- Actions (like sending recommendations, rating, creating groups) will update the local React state but won't persist across page reloads.

## Database Schema (Supabase)

When setting up Supabase, you will need the following tables (refer to `src/lib/types.ts` for full field definitions):
- `users`: id, username, display_name, avatar_url, taste_archetype, created_at
- `groups`: id, name, vibe, invite_code, created_by, created_at, avatar_gradient
- `group_members`: id, group_id, user_id, role, joined_at
- `titles`: id, tmdb_id, title, type, poster_url, release_year, genres, overview, external_rating
- `recommendations`: id, title_id, group_id, recommended_by, recommended_to_user_id, recommended_to_group, reason, confidence_score, mood_tags, status, created_at
- `ratings`: id, recommendation_id, rated_by, movie_rating, recommendation_accuracy, reaction_tag, comment, created_at
- `badges`: id, user_id, group_id, badge_type, earned_at

## Future Roadmap (Next Steps)

1. **Connect Supabase Auth & DB**: Replace the mock React Context (`src/lib/context.tsx`) with real Supabase queries and mutations.
2. **TMDB Integration**: Update `src/app/discover/page.tsx` to fetch search results from the TMDB API.
3. **Taste Trial / Court Mode**: Introduce a feature where disputed recommendations can be brought to the group for a vote.
4. **Push Notifications**: Notify users when they receive a recommendation or when their recommendation is rated.
5. **Real-time Updates**: Use Supabase real-time subscriptions to update the feed and leaderboard instantly without refreshing.
