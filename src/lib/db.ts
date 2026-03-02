import api from "./api";

export async function updateQuestCompletion(questId: string, status: "SUCCESS" | "FAIL" | "ERROR", code: string, output?: string) {
    try {
        const res = await api.post(`/problems/${questId}/submit`, {
            code,
            status,
            output,
        });
        return res.data;
    } catch (error) {
        console.error("Failed to submit quest completion:", error);
        throw error;
    }
}

export async function getProblems() {
    try {
        const res = await api.get("/problems");
        return res.data;
    } catch (error) {
        console.error("Failed to fetch problems:", error);
        return [];
    }
}
