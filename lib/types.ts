export type Letter = {
    id: string;                 // Optional unique ID if needed
    week: number;
    content: string;
    timestamp: number;
    sender: "maged" | "alyana";
    isSelected: boolean
};

export interface ProfileMetrics {
    joinedDate: string;            // Date the user wrote their first letter
    daysActive: number;            // Total days since first letter
    currentStreak: number;         // Current consecutive days streak
    longestStreak: number;         // Longest consecutive days streak
    totalLetters: number;          // Total letters written
    lettersThisWeek: number;       // Letters written in the current week
    totalWeeks: number;            // Total weeks with at least one letter
    weeksCompleted: number;        // Alias of totalWeeks (can be used interchangeably)
    selectionsMade: number;        // Letters marked as selected
    weeklyProgress: number;        // Percentage progress of current week
    currentWeek: number;           // Current week number based on letters
    flamePassesEarned: number;     // Total Flame Passes earned
    flamePassesUsed: number;       // Total Flame Passes used
}


export type User = "maged" | "alyana"
