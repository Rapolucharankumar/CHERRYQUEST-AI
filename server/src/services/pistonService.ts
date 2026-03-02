import axios from "axios";

const PISTON_URL = "https://emkc.org/api/v2/piston/execute";

export const executePython = async (code: string) => {
    try {
        const response = await axios.post(PISTON_URL, {
            language: "python",
            version: "3.10.0",
            files: [
                {
                    content: code,
                },
            ],
        });
        return response.data;
    } catch (error) {
        console.error("Piston API Error:", error);
        throw new Error("Failed to execute code");
    }
};
