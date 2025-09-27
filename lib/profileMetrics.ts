// /lib/profileMetrics.ts
import { ref, get } from "firebase/database";
import { database } from "./firebase";
import { Letter } from "./types";



/**
 * Represents aggregated metrics for a user's profile.
 */
export interface ProfileMetrics {
    /** Date the user joined, formatted as a string */
    joinedDate: string;
    /** Number of days the user has been active since their first letter */
    daysActive: number;
    /** Current streak of consecutive days with letters written */
    currentStreak: number;
    /** Longest streak of consecutive days with letters written */
    longestStreak: number;
    /** Total number of letters written by the user */
    totalLetters: number;
    /** Number of letters written in the current week */
    lettersThisWeek: number;
    /** Total number of weeks with at least one letter written */
    totalWeeks: number;
    /** Total number of weeks completed (same as totalWeeks here) */
    weeksCompleted: number;
    /** Total number of letters marked as selected */
    selectionsMade: number;
    /** Percentage progress of letters written this week (max 100) */
    weeklyProgress: number;
    /** Current week number for the user */
    currentWeek: number;
    /** Number of flame passes earned (currently placeholder) */
    flamePassesEarned: number;
    /** Number of flame passes used (currently placeholder) */
    flamePassesUsed: number;
}

/**
 * Fetches and computes profile metrics for a given username.
 *
 * @param username - The username of the user to fetch metrics for.
 * @returns A Promise resolving to the ProfileMetrics object.
 *
 * @description
 * This function:
 * 1. Retrieves all letters from the Firebase Realtime Database.
 * 2. Filters letters belonging to the specified user.
 * 3. Calculates metrics such as:
 *    - Total letters written
 *    - Days active
 *    - Current and longest streaks
 *    - Weekly statistics
 *    - Flame passes (placeholders)
 * 4. Returns default values if no letters exist or if an error occurs.
 */
export const fetchProfileMetrics = async (username: string): Promise<ProfileMetrics> => {
    try {
        // Fetch all letters from Firebase
        const snapshot = await get(ref(database, "letters"));
        const data = snapshot.val() || {};


        // Flatten *all* letters
        const letters: Letter[] = [];
        Object.values(data).forEach((usersObj: any) => {
            Object.values(usersObj).forEach((letter: any) => {
                if (letter) letters.push(letter);
            });
        });

        // Return default metrics if no letters exist
        if (!letters.length) {
            return {
                joinedDate: "",
                daysActive: 0,
                currentStreak: 0,
                longestStreak: 0,
                totalLetters: 0,
                lettersThisWeek: 0,
                totalWeeks: 0,
                weeksCompleted: 0,
                selectionsMade: 0,
                weeklyProgress: 0,
                currentWeek: 0,
                flamePassesEarned: 0,
                flamePassesUsed: 0
            };
        }


        // Sort letters chronologically
        const sortedLetters = letters.sort((a, b) => a.timestamp - b.timestamp);

        // Joined Date - formatted
        const firstLetter = sortedLetters[0];
        const joinedDate = new Date(firstLetter.timestamp).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        // Days Active
        const daysActive = Math.floor((Date.now() - firstLetter.timestamp) / (1000 * 60 * 60 * 24)) + 1;

        // Calculate streaks
        // user-specific letters (sorted ascending)
        const userLetters = sortedLetters
            .filter((l) => l.sender?.toLowerCase() === username.toLowerCase())
            .sort((a, b) => a.timestamp - b.timestamp);

        // extract unique day timestamps (midnight) in ascending order
        const days = Array.from(
            new Set(userLetters.map((l) => new Date(l.timestamp).setHours(0, 0, 0, 0)))
        ).sort((a, b) => a - b);

        let longestStreak = 0;
        let currentStreak = 0;

        if (days.length > 0) {
            // compute longest streak
            longestStreak = 1;
            let tempStreak = 1;
            for (let i = 1; i < days.length; i++) {
                const diffDays = Math.round((days[i] - days[i - 1]) / (1000 * 60 * 60 * 24));
                if (diffDays === 1) {
                    tempStreak++;
                } else {
                    tempStreak = 1;
                }
                if (tempStreak > longestStreak) longestStreak = tempStreak;
            }

            // compute current streak (valid if last letter was today or yesterday)
            const today = new Date().setHours(0, 0, 0, 0);
            const lastDay = days[days.length - 1];
            const diffToToday = Math.round((today - lastDay) / (1000 * 60 * 60 * 24));

            if (diffToToday <= 1) {
                currentStreak = 1;
                let expected = lastDay - 24 * 60 * 60 * 1000;
                for (let j = days.length - 2; j >= 0; j--) {
                    if (days[j] === expected) {
                        currentStreak++;
                        expected -= 24 * 60 * 60 * 1000;
                    } else {
                        break;
                    }
                }
            } else {
                currentStreak = 0;
            }
        }


        // Calculate week-related metrics
        const uniqueWeeks = Array.from(new Set(sortedLetters.map(l => l.week)));
        const totalWeeks = uniqueWeeks.length;
        const weeksCompleted = totalWeeks; // same as totalWeeks
        const currentWeek = Math.max(...uniqueWeeks);

        // Letters written this week and weekly progress
        const lettersThisWeek = sortedLetters.filter(l => l.week === currentWeek).length;
        const weeklyProgress = Math.min((lettersThisWeek / 7) * 100, 100);


        // Selections made
        const selectionsMade = sortedLetters.filter(l => username === 'maged' ? l.isSelectedByMaged : l.isSelectedByAlyana).length;

        // Flame passes (placeholders)
        const flamePassesEarned = 0;
        const flamePassesUsed = 0;

        return {
            joinedDate,
            daysActive,
            currentStreak,
            longestStreak,
            totalLetters: sortedLetters.length,
            lettersThisWeek,
            totalWeeks,
            weeksCompleted,
            selectionsMade,
            weeklyProgress,
            currentWeek,
            flamePassesEarned,
            flamePassesUsed
        };

    } catch (err) {
        console.error("Error fetching profile metrics:", err);

        // Return default metrics on error
        return {
            joinedDate: "",
            daysActive: 0,
            currentStreak: 0,
            longestStreak: 0,
            totalLetters: 0,
            lettersThisWeek: 0,
            totalWeeks: 0,
            weeksCompleted: 0,
            selectionsMade: 0,
            weeklyProgress: 0,
            currentWeek: 0,
            flamePassesEarned: 0,
            flamePassesUsed: 0
        };
    }
};
