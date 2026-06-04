"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { fetchContributorProfile, contributorToScoreInputs } from "@/lib/github";
import { mapRepos, fetchLiveStats } from "@/lib/profile-data";
import { calculateScore } from "@/lib/score";
import type { ContributorStats, Repo } from "@/types";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    async function syncAndRedirect() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const username = session?.user?.user_metadata?.user_name as
        | string
        | undefined;
      const userId = session?.user?.id;
      // GitHub OAuth access token. Supabase only exposes this right after the
      // OAuth redirect (it isn't persisted or refreshed), which is why the score
      // sync runs here, at the callback, while the token is still in hand.
      const providerToken = session?.provider_token ?? undefined;

      if (username && userId) {
        try {
          let stats: ContributorStats;
          let repos: Repo[];

          if (providerToken) {
            // Authenticated GraphQL path — includes review counts, so the stored
            // score reflects every signal in the formula.
            const contributor = await fetchContributorProfile(
              username,
              providerToken
            );
            ({ stats, repos } = contributorToScoreInputs(contributor));
          } else {
            // Fallback: the same unauthenticated REST pipeline the public profile
            // page uses. Reviews aren't available here (totalReviews stays 0), but
            // the score is still stored so sign-in never depends on the GraphQL
            // call succeeding.
            const reposRes = await fetch(
              `https://api.github.com/users/${username}/repos?sort=stars&per_page=12&type=owner`,
              { headers: { Accept: "application/vnd.github.v3+json" } }
            );
            const rawRepos = reposRes.ok ? await reposRes.json() : [];
            const filtered = Array.isArray(rawRepos)
              ? rawRepos
                  .filter((r: { fork: boolean }) => !r.fork)
                  .slice(0, 6)
              : [];
            repos = mapRepos(filtered);
            stats = await fetchLiveStats(username);
          }

          const score = calculateScore(stats, repos);

          // Upsert the user's own row. RLS ("Users can update own profile" /
          // "Users can insert own profile", both auth.uid() = id) permits this
          // with the regular anon client — no service-role key needed.
          await supabase.from("profiles").upsert(
            {
              id: userId,
              username,
              score,
              total_commits: stats.totalCommits,
              total_prs: stats.totalPRs,
              total_issues: stats.totalIssues,
              total_reviews: stats.totalReviews,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "id" }
          );
        } catch {
          // Non-fatal: a failed score sync must never block sign-in.
        }
      }

      if (!cancelled) {
        router.replace(username ? `/${username}` : "/");
      }
    }

    syncAndRedirect();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      <p style={{ color: "#707070", fontSize: "14px" }}>Signing you in…</p>
    </div>
  );
}
