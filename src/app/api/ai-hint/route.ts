import { NextResponse } from "next/server";
import { getAIHint } from "@/lib/openai";

export async function POST(req: Request) {
    try {
        const { prompt, userCode, instructions } = await req.json();
        const hint = await getAIHint(prompt, userCode, instructions);
        return NextResponse.json({ hint });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch hint" }, { status: 500 });
    }
}
