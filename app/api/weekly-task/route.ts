import { NextResponse } from "next/server";
import { database } from "@/lib/firebase";
import { ref, get, push, serverTimestamp } from "firebase/database";

export async function GET() {
    try {
        // Fetch all letters from Realtime DB
        const lettersRef = ref(database, "letters");
        const snapshot = await get(lettersRef);
        const lettersData = snapshot.val();

        if (!lettersData) {
            return NextResponse.json(
                { error: "No letters found." },
                { status: 404 }
            );
        }

        // --- Calculate the date range (past 7 calendar days) ---
        const today = new Date();
        today.setHours(0, 0, 0, 0); // normalize time
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 6);

        // --- Get keys (dates) within that range ---
        const recentDates = Object.keys(lettersData).filter((key) => {
            const date = new Date(key);
            date.setHours(0, 0, 0, 0);
            return date >= sevenDaysAgo && date <= today;
        });

        if (recentDates.length === 0) {
            return NextResponse.json(
                { message: "No letters within the last 7 days." },
                { status: 200 }
            );
        }

        // --- Track selection activity for each user ---
        let magedHasSelected = false;
        let alyanaHasSelected = false;

        recentDates.forEach((date) => {
            const dayData = lettersData[date];
            if (!dayData) return;

            Object.values(dayData).forEach((letter: any) => {
                if (letter.isSelectedByMaged) magedHasSelected = true;
                if (letter.isSelectedByAlyana) alyanaHasSelected = true;
            });
        });

        // --- Create flame passes accordingly ---
        const flamePassRef = ref(database, "flamePasses");
        const now = new Date();
        const expiresAt = new Date(now);
        expiresAt.setDate(now.getDate() + 14); // 2 weeks after creation

        if (!magedHasSelected) {
            await push(flamePassRef, {
                createdAt: serverTimestamp(),
                expiresAt: expiresAt.toISOString(),
                for: "maged",
                reason: "No selection in past 7 days",
            });
        }

        if (!alyanaHasSelected) {
            await push(flamePassRef, {
                createdAt: serverTimestamp(),
                expiresAt: expiresAt.toISOString(),
                for: "alyana",
                reason: "No selection in past 7 days",
            });
        }

        return NextResponse.json(
            {
                message: "Weekly task executed successfully.",
                createdFor: {
                    maged: !magedHasSelected,
                    alyana: !alyanaHasSelected,
                },
                recentDates,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error executing weekly task:", error.message, error.stack);
        return NextResponse.json(
            { error: error.message || "Failed to execute weekly task" },
            { status: 500 }
        );
    }
}

// Cron-compatible
export const POST = GET;
