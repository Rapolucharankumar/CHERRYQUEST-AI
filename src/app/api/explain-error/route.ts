import { NextResponse } from "next/server";
import { explainError } from "@/lib/openai";

export async function POST(req: Request) {
    try {
        const { errorOutput, userCode } = await req.json();
        const explanation = await explainError(errorOutput, userCode);
        return NextResponse.json({ explanation });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch explanation" }, { status: 500 });
    }
}
