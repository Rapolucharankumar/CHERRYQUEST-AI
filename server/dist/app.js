"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const problemRoutes_1 = __importDefault(require("./routes/problemRoutes"));
const aiRoutes_1 = __importDefault(require("./routes/aiRoutes"));
const executionRoutes_1 = __importDefault(require("./routes/executionRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/problems", problemRoutes_1.default);
app.use("/api/ai", aiRoutes_1.default);
app.use("/api/execute", executionRoutes_1.default);
// Health check
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});
exports.default = app;
