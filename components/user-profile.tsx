import { ProfileMetrics } from "@/lib/types";

interface UserStats {
  totalLetters: number;
  currentStreak: number;
  longestStreak: number;
  lettersThisWeek: number;
  totalWeeks: number;
  selectionsUsed: number;
  flamePassesEarned: number;
  flamePassesUsed: number;
  joinDate: string;
}

interface UserProfileProps {
  currentUser: string;
  stats: ProfileMetrics;
}

export function UserProfile({ currentUser, stats }: UserProfileProps) {
  const {
    currentStreak,
    daysActive,
    joinedDate,
    longestStreak,
    selectionsMade,
    totalLetters,
    totalWeeks,
  } = stats;

  return (
    <section className="space-y-6">
      <div className="parchment torn-edges p-8 md:p-12">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="gothic-title text-3xl text-primary mb-2">
              {currentUser === "alyana" ? "Alyana" : "Maged"}
            </h2>
            <p className="text-muted-foreground">Keeper of Eternal Letters</p>
          </div>
          <div className="wax-seal scale-150"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="gothic-title text-xl text-accent mb-4">
              Soul's Journey
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Joined the Realm:</span>
                <span className="font-medium">{joinedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Days Active:</span>
                <span className="font-medium">{daysActive} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current Streak:</span>
                <span className="font-medium ember-glow">
                  {currentStreak} days
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Longest Streak:</span>
                <span className="font-medium">{longestStreak} days</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="gothic-title text-xl text-accent mb-4">
              Mystical Achievements
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Letters:</span>
                <span className="font-medium">{totalLetters}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Weeks Completed:</span>
                <span className="font-medium">{totalWeeks}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Flame Passes Earned:
                </span>
                <span className="font-medium ember-glow">
                  {stats.flamePassesEarned}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Selections Made:</span>
                <span className="font-medium">{selectionsMade}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-accent/30">
          <div className="text-center">
            <div className="rune-glow text-2xl mb-3">✨</div>
            <p className="text-sm text-muted-foreground italic">
              "Through dedication and reverence, the soul finds its voice in the
              eternal dance of words."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
