import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import problemRoutes from "./routes/problemRoutes";
import aiRoutes from "./routes/aiRoutes";
import executionRoutes from "./routes/executionRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/execute", executionRoutes);

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

export default app;
