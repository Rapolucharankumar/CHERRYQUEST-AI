import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const getAIHint = async (userCode: string, instructions: string[]) => {
    if (!process.env.OPENAI_API_KEY) {
        return "MOCK: Remember that Python is indentation-sensitive. Check your spaces!";
    }

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a helpful Python mentor. Give a short, encouraging hint. Do not give the full solution.",
            },
            {
                role: "user",
                content: `Instructions: ${instructions.join("\n")}\nMy current code:\n${userCode}`,
            },
        ],
    });

    return response.choices[0].message.content;
};

export const explainError = async (errorOutput: string, userCode: string) => {
    if (!process.env.OPENAI_API_KEY) {
        return "MOCK: It looks like you have a SyntaxError. Check if you missed a colon after your 'if' statement.";
    }

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a Python expert. Explain this error output in simple terms for a beginner.",
            },
            {
                role: "user",
                content: `Error Output: ${errorOutput}\nMy current code:\n${userCode}`,
            },
        ],
    });

    return response.choices[0].message.content;
};
