import { NextResponse } from "next/server";

const SECRET = process.env.WEEKLY_JOB_TOKEN;

export async function GET(request: Request) {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    if (SECRET && token !== SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("weekly task executed securely");
    return NextResponse.json({ status: "ok", executedAt: new Date().toISOString() });
}
