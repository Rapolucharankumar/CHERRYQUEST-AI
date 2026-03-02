"use client";

import { SkillNode } from "@/components/quest/SkillNode";
import {
    Code2,
    Variable,
    Terminal,
    Parentheses,
    List,
    Layers,
    Database,
    Sword,
    Search,
    Sparkles
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CURRICULUM = [
    {
        id: "intro",
        title: "Python Basics",
        icon: Terminal,
        status: "completed",
        progress: 100,
        x: 50, y: 100
    },
    {
        id: "variables",
        title: "Variables & Types",
        icon: Variable,
        status: "completed",
        progress: 100,
        x: 30, y: 250
    },
    {
        id: "operators",
        title: "Operators",
        icon: Sparkles,
        status: "current",
        progress: 45,
        x: 70, y: 400
    },
    {
        id: "loops",
        title: "Loops & Iteration",
        icon: Layers,
        status: "available",
        progress: 0,
        x: 40, y: 550
    },
    {
        id: "functions",
        title: "Functions",
        icon: Parentheses,
        status: "locked",
        progress: 0,
        x: 60, y: 700
    },
    {
        id: "data-structs",
        title: "Data Structures",
        icon: List,
        status: "locked",
        progress: 0,
        x: 35, y: 850
    },
    {
        id: "boss-1",
        title: "Boss: The Script Master",
        icon: Sword,
        status: "locked",
        progress: 0,
        x: 50, y: 1000
    },
];

export default function QuestMapPage() {
    const router = useRouter();
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    const handleNodeClick = (id: string) => {
        // Navigate to specific lesson or editor
        router.push(`/quest/${id}`);
    };

    return (
        <div className="relative min-h-[1200px] w-full py-10 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[10%] h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute top-[50%] right-[10%] h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
                <div className="absolute top-[80%] left-[20%] h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
            </div>

            <div className="relative flex flex-col items-center max-w-2xl mx-auto space-y-12 mb-20 text-center">
                <h1 className="text-4xl font-black italic tracking-tighter">Python Path: Module 1</h1>
                <p className="text-muted-foreground">
                    Master the fundamentals of Python through interactive quests.
                    Complete the module to unlock the first <span className="text-primary font-bold">Boss Battle</span>.
                </p>
            </div>

            {/* The Map */}
            <div className="relative mx-auto w-full max-w-4xl h-full mt-20">
                {/* Connection Lines (SVG) */}
                <svg className="absolute inset-0 h-full w-full pointer-events-none">
                    <defs>
                        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#f43f5e" />
                            <stop offset="100%" stopColor="#6366f1" />
                        </linearGradient>
                    </defs>
                    {CURRICULUM.map((node, i) => {
                        if (i === CURRICULUM.length - 1) return null;
                        const nextNode = CURRICULUM[i + 1];
                        const isCompleted = node.status === "completed" && nextNode.status !== "locked";

                        return (
                            <line
                                key={`line-${node.id}`}
                                x1={`${node.x}%`}
                                y1={node.y + 48}
                                x2={`${nextNode.x}%`}
                                y2={nextNode.y + 48}
                                stroke={isCompleted ? "url(#line-gradient)" : "var(--border)"}
                                strokeWidth="4"
                                strokeDasharray={node.status === "locked" ? "8 8" : "none"}
                                className="transition-all duration-500"
                            />
                        );
                    })}
                </svg>

                {/* Quest Nodes */}
                {CURRICULUM.map((node) => (
                    <SkillNode
                        key={node.id}
                        id={node.id}
                        title={node.title}
                        status={node.status as any}
                        progress={node.progress}
                        icon={node.icon}
                        position={{ x: node.x, y: node.y }}
                        onClick={handleNodeClick}
                    />
                ))}
            </div>

            {/* Floating UI Elements */}
            <div className="fixed bottom-10 right-10 flex flex-col gap-4">
                <button className="glass flex items-center gap-3 rounded-2xl px-6 py-4 font-bold transition-all hover:scale-110 active:scale-95 text-primary">
                    <Sparkles className="h-5 w-5" />
                    AI Mentor Tip
                </button>
            </div>
        </div>
    );
}
