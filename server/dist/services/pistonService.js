"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executePython = void 0;
const axios_1 = __importDefault(require("axios"));
const PISTON_URL = "https://emkc.org/api/v2/piston/execute";
const executePython = async (code) => {
    try {
        const response = await axios_1.default.post(PISTON_URL, {
            language: "python",
            version: "3.10.0",
            files: [
                {
                    content: code,
                },
            ],
        });
        return response.data;
    }
    catch (error) {
        console.error("Piston API Error:", error);
        throw new Error("Failed to execute code");
    }
};
exports.executePython = executePython;
