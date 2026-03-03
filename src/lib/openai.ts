import OpenAI from "openai";

let openai: OpenAI | null = null;

function getOpenAIClient() {
    if (!openai) {
        // Fallback for Next.js build step where env vars might be missing
        const apiKey = process.env.OPENAI_API_KEY || "dummy_key_to_prevent_build_error";
        openai = new OpenAI({ apiKey });
    }
    return openai;
}

export async function getAIHint(prompt: string, userCode: string, instructions: string[]) {
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your_openai_api_key") {
        // Return a mock hint if no key is provided
        return "MOCK HINT: Remember that Python expects consistent indentation. Check if your print statement is at the very beginning of the line.";
    }

    try {
        const client = getOpenAIClient();
        const response = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful Python mentor for beginners. Give short, encouraging hints without providing the full code solution. Focus on common mistakes like indentation, case-sensitivity, or missing quotes."
                },
                {
                    role: "user",
                    content: `Task Instructions: ${instructions.join("\n")}\n\nMy current code:\n${userCode}\n\nQuestion: ${prompt}`
                }
            ],
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI Error:", error);
        return "The AI Mentor is currently offline, but keep trying! You're doing great.";
    }
}

export async function explainError(errorOutput: string, userCode: string) {
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your_openai_api_key") {
        return "MOCK ERROR EXPLANATION: It looks like you have a 'SyntaxError'. This usually means there's a typo in your code, like a missing bracket or quote.";
    }

    try {
        const client = getOpenAIClient();
        const response = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a Python expert. A user got an error. Explain WHY it happened in simple terms and suggest how to fix it without giving the full solution code."
                },
                {
                    role: "user",
                    content: `Error Output: ${errorOutput}\n\nUser's Code:\n${userCode}`
                }
            ],
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI Error:", error);
        return "I couldn't analyze the error, but check your syntax and logic!";
    }
}
