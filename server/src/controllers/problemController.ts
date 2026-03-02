import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getProblems = async (req: Request, res: Response) => {
    try {
        const problems = await prisma.problem.findMany({
            orderBy: { module: "asc" },
        });
        res.json(problems);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getProblemById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const problem = await prisma.problem.findUnique({
            where: { id },
        });
        if (!problem) {
            return res.status(404).json({ error: "Problem not found" });
        }
        res.json(problem);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const submitSolution = async (req: any, res: Response) => {
    const { id } = req.params;
    const { code, status, output, timeTaken } = req.body;

    try {
        const problem = await prisma.problem.findUnique({ where: { id } });
        if (!problem) {
            return res.status(404).json({ error: "Problem not found" });
        }

        const submission = await prisma.submission.create({
            data: {
                code,
                status,
                output,
                timeTaken,
                userId: req.user.id,
                problemId: id,
            },
        });

        if (status === "SUCCESS") {
            await prisma.user.update({
                where: { id: req.user.id },
                data: {
                    xp: { increment: problem.xp },
                    coins: { increment: problem.coins },
                    completedQuests: {
                        set: Array.from(new Set([...(await prisma.user.findUnique({ where: { id: req.user.id } }))?.completedQuests || [], id]))
                    },
                    lastActive: new Date(),
                },
            });
        }

        res.json({ submission });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
