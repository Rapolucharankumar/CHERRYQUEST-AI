"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitSolution = exports.getProblemById = exports.getProblems = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getProblems = async (req, res) => {
    try {
        const problems = await prisma_1.default.problem.findMany({
            orderBy: { module: "asc" },
        });
        res.json(problems);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getProblems = getProblems;
const getProblemById = async (req, res) => {
    const { id } = req.params;
    try {
        const problem = await prisma_1.default.problem.findUnique({
            where: { id: id },
        });
        if (!problem) {
            return res.status(404).json({ error: "Problem not found" });
        }
        res.json(problem);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getProblemById = getProblemById;
const submitSolution = async (req, res) => {
    const { id } = req.params;
    const { code, status, output, timeTaken } = req.body;
    try {
        const problem = await prisma_1.default.problem.findUnique({ where: { id: id } });
        if (!problem) {
            return res.status(404).json({ error: "Problem not found" });
        }
        const submission = await prisma_1.default.submission.create({
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
            await prisma_1.default.user.update({
                where: { id: req.user.id },
                data: {
                    xp: { increment: problem.xp },
                    coins: { increment: problem.coins },
                    completedQuests: {
                        set: Array.from(new Set([...(await prisma_1.default.user.findUnique({ where: { id: req.user.id } }))?.completedQuests || [], id]))
                    },
                    lastActive: new Date(),
                },
            });
        }
        res.json({ submission });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.submitSolution = submitSolution;
