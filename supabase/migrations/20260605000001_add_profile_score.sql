-- Add contributor score + component stats to profiles (issue #15)
-- Additive and idempotent: safe to run on an existing profiles table.
-- The score is computed from the documented weights in src/lib/score.ts and
-- synced into profiles on login (see src/app/auth/callback/page.tsx).

alter table public.profiles
  add column if not exists score          integer not null default 0,
  add column if not exists total_commits  integer not null default 0,
  add column if not exists total_prs      integer not null default 0,
  add column if not exists total_issues   integer not null default 0,
  add column if not exists total_reviews  integer not null default 0;
