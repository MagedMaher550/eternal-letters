import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

// Core function to create a new weekly task
async function createWeeklyTask() {
    const docRef = await addDoc(collection(db, "weeklyTasks"), {
        createdAt: Timestamp.now(),
        status: "created - test",
    });
    return docRef.id;
}

// Allow GET (for cron job trigger)
export async function GET() {
    try {
        const id = await createWeeklyTask();
        return NextResponse.json(
            { message: "Weekly task executed successfully", id },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error executing weekly task:", error);
        return NextResponse.json(
            { error: "Failed to execute weekly task" },
            { status: 500 }
        );
    }
}

// Allow POST (same logic)
export const POST = GET;
