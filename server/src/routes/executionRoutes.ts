import { Router, Request, Response } from "express";
import { executePython } from "../services/pistonService";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/", authMiddleware, async (req: Request, res: Response) => {
    const { code } = req.body;
    try {
        const result = await executePython(code);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to execute code" });
    }
});

export default router;
