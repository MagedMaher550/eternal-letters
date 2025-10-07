"use client";

import { Navigation } from "@/components/navigation";
import { UserProfile } from "@/components/user-profile";
import { UserStats } from "@/components/user-stats";
import { FlamePassHistory } from "@/components/flame-pass-history";
import { useEffect, useState } from "react";
import { ProfileMetrics } from "@/lib/types";
import { fetchProfileMetrics } from "@/lib/profileMetrics";
import { useAuth } from "@/contexts/auth-context";
import GlowingFlameLoader from "@/components/glowingFlameLoader";

// const dummyUserStats = {
//   totalLetters: 12,
//   currentStreak: 5,
//   longestStreak: 8,
//   lettersThisWeek: 3,
//   totalWeeks: 2,
//   selectionsUsed: 1,
//   flamePassesEarned: 3,
//   flamePassesUsed: 1,
//   joinDate: "2024-01-01T00:00:00Z",
// };

export default function ProfilePage() {
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState<boolean>(true);
  const [metrics, setMetrics] = useState<ProfileMetrics | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchProfileMetrics(currentUser || "maged")
      .then((s) => setMetrics(s))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [currentUser]);

  console.log(metrics)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="gothic-title text-4xl md:text-6xl text-primary mb-4">
            Soul Profile
          </h1>
          <p className="text-muted-foreground text-lg">
            Your journey through the realm of Eternal Letters
          </p>
        </div>

        {!loading ? (
          <div className="space-y-8">
            <UserProfile currentUser={currentUser || "Maged"} stats={metrics} />
            <div className="burned-scroll"></div>
            <UserStats stats={metrics} />
            <div className="burned-scroll"></div>
            <FlamePassHistory flamePasses={metrics?.userFlames || []} />
          </div>
        ) : (
          <GlowingFlameLoader />
        )}
      </main>
    </div>
  );
}
