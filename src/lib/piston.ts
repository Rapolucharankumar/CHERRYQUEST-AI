import axios from "axios";

export async function executePython(code: string) {
    try {
        const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
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
        console.error("Execution error:", error);
        throw new Error("Failed to execute code");
    }
}
