import { Router, Request, Response } from "express";
import { getAIHint, explainError } from "../services/aiService";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/hint", authMiddleware, async (req: Request, res: Response) => {
    const { userCode, instructions } = req.body;
    try {
        const hint = await getAIHint(userCode, instructions);
        res.json({ hint });
    } catch (error) {
        res.status(500).json({ error: "Failed to get AI hint" });
    }
});

router.post("/explain", authMiddleware, async (req: Request, res: Response) => {
    const { errorOutput, userCode } = req.body;
    try {
        const explanation = await explainError(errorOutput, userCode);
        res.json({ explanation });
    } catch (error) {
        res.status(500).json({ error: "Failed to explain error" });
    }
});

export default router;
