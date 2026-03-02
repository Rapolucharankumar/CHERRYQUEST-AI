"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Play,
    ChevronLeft,
    Sparkles,
    HelpCircle,
    CheckCircle2,
    XCircle,
    Terminal as TerminalIcon,
    Zap,
    BookOpen
} from "lucide-react";
import { CodeEditor } from "@/components/quest/CodeEditor";
import api from "@/lib/api";
import { updateQuestCompletion } from "@/lib/db";
import { useUser } from "@/hooks/useUser";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const QUEST_DATA: Record<string, any> = {
    "intro": {
        title: "Python Basics",
        description: "Learn how to print your first message to the world.",
        instructions: [
            "In Python, we use the `print()` function to display text.",
            "Write a line of code that prints 'Hello, Python!' to the console.",
            "Make sure to use quotes for the string!"
        ],
        initialCode: "# Write your code below\n",
        solution: "print('Hello, Python!')",
        check: (output: string) => output.trim() === "Hello, Python!"
    },
    "variables": {
        title: "Variables & Types",
        description: "Store data like a pro using variables.",
        instructions: [
            "Create a variable called `name` and set it to 'Cherry'.",
            "Create another variable called `level` and set it to 10.",
            "Print both variables using `print(name, level)`."
        ],
        initialCode: "# Define variables below\n",
        solution: "name = 'Cherry'\nlevel = 10\nprint(name, level)",
        check: (output: string) => output.trim() === "Cherry 10"
    }
};

export default function QuestArenaPage() {
    const { id } = useParams();
    const router = useRouter();
    const { refreshUser } = useUser();
    const quest = QUEST_DATA[id as string] || QUEST_DATA["intro"];

    const [code, setCode] = useState(quest.initialCode);
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [isHintLoading, setIsHintLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [showHint, setShowHint] = useState(false);
    const [aiMessage, setAiMessage] = useState("");

    const handleRun = async () => {
        setIsRunning(true);
        setStatus("idle");
        setAiMessage("");
        try {
            const result = await api.post("/execute", { code });
            const runOutput = result.data.run.stdout || result.data.run.stderr;
            setOutput(runOutput);

            if (quest.check(runOutput)) {
                setStatus("success");
                await updateQuestCompletion(id as string, "SUCCESS", code, runOutput);
                await refreshUser();
            } else {
                setStatus("error");
                await updateQuestCompletion(id as string, "FAIL", code, runOutput);
                // If it's an error, get AI explanation
                if (result.data.run.stderr || runOutput) {
                    const res = await api.post("/ai/explain", {
                        errorOutput: runOutput,
                        userCode: code
                    });
                    setAiMessage(res.data.explanation);
                    setShowHint(true);
                }
            }
        } catch (err: any) {
            setOutput("Error: Failed to execute code. " + (err.response?.data?.error || ""));
        } finally {
            setIsRunning(false);
        }
    };

    const fetchHint = async () => {
        if (showHint && aiMessage) {
            setShowHint(false);
            return;
        }

        setIsHintLoading(true);
        setShowHint(true);
        try {
            const res = await api.post("/ai/hint", {
                userCode: code,
                instructions: quest.instructions
            });
            setAiMessage(res.data.hint);
        } catch (err) {
            setAiMessage("I'm having trouble connecting to my brain, but try reviewing the instructions!");
        } finally {
            setIsHintLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full -m-8 space-y-0">
            {/* Header */}
            <div className="flex items-center justify-between border-b bg-card/30 px-6 py-4 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push("/quest")}
                        className="rounded-xl p-2 hover:bg-muted text-muted-foreground transition-all"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <div>
                        <h2 className="text-sm font-bold leading-none">{quest.title}</h2>
                        <p className="text-[10px] text-muted-foreground uppercase mt-1">Module 1 • Level 1</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={fetchHint}
                        disabled={isHintLoading}
                        className={cn(
                            "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all",
                            showHint ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {isHintLoading ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : (
                            <Sparkles className="h-4 w-4" />
                        )}
                        AI Hint
                    </button>
                    <button
                        onClick={handleRun}
                        disabled={isRunning}
                        className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2 text-sm font-bold text-white cherry-glow transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                    >
                        {isRunning ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : (
                            <Play className="h-4 w-4 fill-current" />
                        )}
                        Run Code
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Panel: Instructions */}
                <div className="w-96 flex flex-col border-r bg-card/20 overflow-y-auto">
                    <div className="p-8 space-y-8">
                        <div className="space-y-2">
                            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Introduction</span>
                            <h3 className="text-2xl font-black">{quest.title}</h3>
                            <p className="text-sm text-muted-foreground italic">{quest.description}</p>
                        </div>

                        <div className="space-y-4">
                            <h4 className="flex items-center gap-2 text-sm font-bold">
                                <BookOpen className="h-4 w-4 text-blue-500" />
                                Instructions
                            </h4>
                            <ul className="space-y-4">
                                {quest.instructions.map((ins: string, i: number) => (
                                    <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-foreground">
                                            {i + 1}
                                        </span>
                                        {ins}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <AnimatePresence>
                            {showHint && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    className="rounded-2xl bg-primary/10 border border-primary/20 p-5 space-y-3"
                                >
                                    <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                        <Sparkles className="h-4 w-4" />
                                        AI Mentor Hint
                                    </div>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        {aiMessage || "Python is case-sensitive. Make sure you use lowercase for `print` and capitalize 'Hello, Python!' exactly as it appears in the instruction."}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Panel: Editor & Output */}
                <div className="flex-1 flex flex-col bg-background p-4 gap-4 overflow-hidden">
                    <div className="flex-1">
                        <CodeEditor code={code} onChange={(v) => setCode(v || "")} />
                    </div>

                    <div className="h-48 flex flex-col overflow-hidden rounded-2xl border bg-black/40 backdrop-blur-md">
                        <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase">
                                <TerminalIcon className="h-3 w-3" />
                                Console Output
                            </div>
                            {status !== "idle" && (
                                <div className={cn(
                                    "flex items-center gap-1 text-[10px] font-bold uppercase",
                                    status === "success" ? "text-green-500" : "text-red-500"
                                )}>
                                    {status === "success" ? (
                                        <><CheckCircle2 className="h-3 w-3" /> Challenge Completed!</>
                                    ) : (
                                        <><XCircle className="h-3 w-3" /> Check your code</>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 font-mono text-xs text-muted-foreground">
                            {output || "Run your code to see the output here..."}
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal Overlay */}
            <AnimatePresence>
                {status === "success" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="glass max-w-sm w-full rounded-3xl p-8 text-center space-y-6 shadow-2xl"
                        >
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-green-500 mx-auto text-white cherry-glow animate-bounce">
                                <Zap className="h-10 w-10 fill-current" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black tracking-tight">Quest Cleared!</h3>
                                <p className="text-muted-foreground">You've mastered the basics. Ready for the next challenge?</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col items-center p-3 rounded-2xl bg-muted/50 border">
                                    <span className="text-xl font-bold">+150</span>
                                    <span className="text-[10px] text-muted-foreground uppercase font-bold">XP</span>
                                </div>
                                <div className="flex flex-col items-center p-3 rounded-2xl bg-muted/50 border">
                                    <span className="text-xl font-bold">+25</span>
                                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Coins</span>
                                </div>
                            </div>
                            <button
                                onClick={() => router.push("/quest")}
                                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-bold text-white transition-all hover:scale-105"
                            >
                                Continue Adventure
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
