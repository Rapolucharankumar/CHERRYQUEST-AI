"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-cherry-key";
const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(201).json({ token, user: { id: user.id, email: user.email } });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: "7d",
        });
        res.json({ token, user: { id: user.id, email: user.email } });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.login = login;
const getMe = async (req, res) => {
    try {
        const user = await prisma_1.default.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                email: true,
                xp: true,
                level: true,
                streak: true,
                completedQuests: true,
            },
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getMe = getMe;
