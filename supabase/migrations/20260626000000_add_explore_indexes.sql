-- Migration: Add indexes for performance-critical profile search and sort operations
-- Add database indexes on fields queried heavily by the Explore leaderboard page.

create index if not exists idx_profiles_score on public.profiles (score desc);
create index if not exists idx_profiles_total_prs on public.profiles (total_prs desc);
create index if not exists idx_profiles_total_commits on public.profiles (total_commits desc);
create index if not exists idx_profiles_total_issues on public.profiles (total_issues desc);
create index if not exists idx_profiles_username_name_trgm on public.profiles (username, name);
