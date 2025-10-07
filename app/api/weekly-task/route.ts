import { NextResponse } from "next/server";
import { database as db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export async function GET() {
    try {
        console.log("Step 1: Entered API route");

        if (!db) throw new Error("Firestore instance not initialized");
        console.log("Step 2: Firestore connected");

        const docRef = await addDoc(collection(db, "weeklyTasks"), {
            createdAt: Timestamp.now(),
            status: "created - test",
        });

        console.log("Step 3: Document added", docRef.id);

        return NextResponse.json(
            { message: "Weekly task executed successfully", id: docRef.id },
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

export const POST = GET;
