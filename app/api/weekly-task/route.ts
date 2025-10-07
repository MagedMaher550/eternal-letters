import { NextResponse } from "next/server";
import { database } from "@/lib/firebase";
import { ref, push, serverTimestamp } from "firebase/database";

export async function GET() {
    try {
        const weeklyTasksRef = ref(database, "flamePasses");
        const newTaskRef = await push(weeklyTasksRef, {
            createdAt: serverTimestamp(),
            status: "created - test",
        });

        return NextResponse.json(
            { message: "Weekly task executed successfully", id: newTaskRef.key },
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
