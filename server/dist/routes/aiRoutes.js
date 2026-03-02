"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aiService_1 = require("../services/aiService");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/hint", auth_1.authMiddleware, async (req, res) => {
    const { userCode, instructions } = req.body;
    try {
        const hint = await (0, aiService_1.getAIHint)(userCode, instructions);
        res.json({ hint });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to get AI hint" });
    }
});
router.post("/explain", auth_1.authMiddleware, async (req, res) => {
    const { errorOutput, userCode } = req.body;
    try {
        const explanation = await (0, aiService_1.explainError)(errorOutput, userCode);
        res.json({ explanation });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to explain error" });
    }
});
exports.default = router;
