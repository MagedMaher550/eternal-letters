import { NextResponse } from "next/server";
import { database as db } from "../../../lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export async function POST() {
    try {
        const docRef = await addDoc(collection(db, "weeklyTasks"), {
            createdAt: Timestamp.now(),
            status: "created",
        });

        return NextResponse.json(
            { message: "Weekly task executed successfully", id: docRef.id },
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

// Optional safety net if someone sends GET manually
export async function GET() {
    return NextResponse.json(
        { message: "Method Not Allowed. Use POST instead." },
        { status: 405 }
    );
}
