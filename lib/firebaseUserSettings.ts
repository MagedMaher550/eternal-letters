// lib/firebaseUserSettings.ts
import { ref, get, set, update } from "firebase/database";
import { database } from "@/lib/firebase";
import { UserSettings } from "./types";


/**
 * Fetch user settings from Firebase Realtime Database.
 * @param username - "maged" or "alyana"
 */
export async function getUserSettings(username: "maged" | "alyana"): Promise<UserSettings | null> {
    try {
        const settingsRef = ref(database, `UserSettings/${username}`);
        const snapshot = await get(settingsRef);
        const data = snapshot.val();

        if (!data) return null;
        return data as UserSettings;
    } catch (error: any) {
        console.error("Error fetching user settings:", error.message);
        throw new Error("Failed to fetch user settings.");
    }
}

/**
 * Update user settings in Firebase Realtime Database.
 * @param username - "maged" or "alyana"
 * @param newSettings - Partial settings object with updated fields
 */
export async function updateUserSettings(
    username: "maged" | "alyana",
    newSettings: Partial<UserSettings>
): Promise<void> {
    try {
        const settingsRef = ref(database, `UserSettings/${username}`);
        await update(settingsRef, newSettings);
        console.log(`Settings updated for ${username}`);
    } catch (error: any) {
        console.error("Error updating user settings:", error.message);
        throw new Error("Failed to update user settings.");
    }
}

/**
 * Initialize default settings if user settings do not exist.
 * (Optional helper)
 */
export async function initializeDefaultSettings(username: "maged" | "alyana"): Promise<void> {
    const defaultSettings: UserSettings = {
        font: "Pirata One, cursive",
        musicTrack: null,
        musicPlaying: false,
        volume: 50,
        muted: false,
        particleEffects: false,
        cursorTrail: false,
        soundEffects: false,
        candleFlicker: false,
        themeAccent: "amber",
        dynamicBackground: "none",
        cursorStyle: "orb",
        darkModeIntensity: 46,
        runeSeals: false,
        scrollAnimation: false,
        hapticFeedback: true,
        reducedMotion: true,
        themePreset: "performance",
        textSize: 110,
    };

    try {
        const settingsRef = ref(database, `UserSettings/${username}`);
        await set(settingsRef, defaultSettings);
        console.log(`Default settings initialized for ${username}`);
    } catch (error: any) {
        console.error("Error initializing user settings:", error.message);
    }
}
