import { Router } from "express";
import { getProblems, getProblemById, submitSolution } from "../controllers/problemController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", getProblems);
router.get("/:id", getProblemById);
router.post("/:id/submit", authMiddleware, submitSolution);

export default router;
