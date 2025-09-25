// interface UserStats {
//   totalLetters: number
//   currentStreak: number
//   longestStreak: number
//   lettersThisWeek: number
//   totalWeeks: number
//   selectionsUsed: number
//   flamePassesEarned: number
//   flamePassesUsed: number
//   joinDate: string
// }

import { ProfileMetrics } from "@/lib/types";

interface UserStatsProps {
  stats: ProfileMetrics;
}

export function UserStats({ stats }: UserStatsProps) {
  const {
    longestStreak,
    selectionsMade,
    currentStreak,
    lettersThisWeek,
    totalLetters,
    totalWeeks
  } = stats;

  const statCards = [
    {
      title: "Letters Written",
      value: totalLetters,
      subtitle: `${lettersThisWeek} this week`,
      icon: "📜",
      color: "text-primary",
    },
    {
      title: "Current Streak",
      value: `${currentStreak} days`,
      subtitle: `Best: ${longestStreak} days`,
      icon: "🔥",
      color: "text-ember ember-glow",
    },
    {
      title: "Weeks Completed",
      value: totalWeeks,
      subtitle: `${selectionsMade} selections made`,
      icon: "⚡",
      color: "text-accent",
    },
    {
      title: "Flame Passes",
      value: `${stats.flamePassesEarned - stats.flamePassesUsed}`,
      subtitle: `${stats.flamePassesUsed} used of ${stats.flamePassesEarned} earned`,
      icon: "🔥",
      color: "text-ember",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="gothic-title text-3xl text-primary mb-4">
          Mystical Statistics
        </h2>
        <p className="text-muted-foreground text-lg">
          The numbers that chronicle your spiritual journey
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="parchment p-6 text-center">
            <div className="text-3xl mb-3">{stat.icon}</div>
            <div className={`gothic-title text-2xl mb-2 ${stat.color}`}>
              {stat.value}
            </div>
            <h3 className="font-medium text-accent mb-1">{stat.title}</h3>
            <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="parchment p-6 bg-accent/5">
        <div className="text-center">
          <h3 className="gothic-title text-xl text-accent mb-4">
            Weekly Progress
          </h3>
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {Math.round((stats.lettersThisWeek / 7) * 100)}%
              </div>
              <p className="text-sm text-muted-foreground">Week Completion</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-ember mb-1">
                {stats.currentStreak > 0 ? "🔥" : "💤"}
              </div>
              <p className="text-sm text-muted-foreground">
                {stats.currentStreak > 0 ? "Active" : "Dormant"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
