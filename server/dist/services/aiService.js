"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.explainError = exports.getAIHint = void 0;
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
const getAIHint = async (userCode, instructions) => {
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
exports.getAIHint = getAIHint;
const explainError = async (errorOutput, userCode) => {
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
exports.explainError = explainError;
