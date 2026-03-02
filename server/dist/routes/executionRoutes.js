"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pistonService_1 = require("../services/pistonService");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/", auth_1.authMiddleware, async (req, res) => {
    const { code } = req.body;
    try {
        const result = await (0, pistonService_1.executePython)(code);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to execute code" });
    }
});
exports.default = router;
