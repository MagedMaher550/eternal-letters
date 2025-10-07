import { ref, get, update } from "firebase/database";
import { database } from "@/lib/firebase";

export async function getActiveFlamePasses() {
    try {
        const flamePassesRef = ref(database, "flamePasses");
        const snapshot = await get(flamePassesRef);
        const data = snapshot.val();

        if (!data) return [];

        const now = new Date();

        // Filter passes that have not yet expired
        const activePasses = Object.entries(data)
            .filter(([_, pass]: any) => {
                if (!pass.expiresAt) return false;
                const expiryDate = new Date(pass.expiresAt);
                return expiryDate > now;
            })
            .map(([id, pass]: any) => ({
                id,
                ...pass,
            }));

        return activePasses;
    } catch (error: any) {
        console.error("Error fetching active flame passes:", error.message);
        throw new Error("Failed to fetch active flame passes.");
    }
}




/**
 * Marks a flame pass as used in Firebase
 * @param flamePassId - the Firebase key of the flame pass
 */
export const useFlamePassFirebase = async (flamePassId: string) => {
    try {
        const flamePassRef = ref(database, `flamePasses/${flamePassId}`);
        await update(flamePassRef, { used: true });
        console.log(`Flame pass ${flamePassId} marked as used`);
    } catch (error: any) {
        console.error("Error marking flame pass as used:", error.message);
        throw error;
    }
};
