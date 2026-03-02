"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Check,
    Lock,
    Star,
    Play
} from "lucide-react";

interface SkillNodeProps {
    id: string;
    title: string;
    status: "locked" | "available" | "completed" | "current";
    progress: number;
    icon: any;
    position: { x: number; y: number };
    onClick: (id: string) => void;
}

export function SkillNode({
    id,
    title,
    status,
    progress,
    icon: Icon,
    position,
    onClick
}: SkillNodeProps) {
    const isLocked = status === "locked";
    const isCompleted = status === "completed";
    const isCurrent = status === "current";

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={!isLocked ? { y: -5, scale: 1.05 } : {}}
            className="absolute flex flex-col items-center gap-3 z-10"
            style={{ left: `${position.x}%`, top: `${position.y}px` }}
            onClick={() => !isLocked && onClick(id)}
        >
            <div className="relative group cursor-pointer">
                {/* Connection Pulse for Current Node */}
                {isCurrent && (
                    <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                )}

                {/* Progress Circle (Outer) */}
                <div className="relative h-24 w-24 flex items-center justify-center rounded-full bg-card glass shadow-xl">
                    <svg className="absolute inset-0 h-full w-full rotate-[-90deg]">
                        <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="transparent"
                            className="text-muted/30"
                        />
                        <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="transparent"
                            strokeDasharray={251.2}
                            strokeDashoffset={251.2 - (251.2 * progress) / 100}
                            className={cn(
                                "transition-all duration-1000 ease-out",
                                isCompleted ? "text-green-500" : "text-primary"
                            )}
                        />
                    </svg>

                    {/* Icon Container */}
                    <div className={cn(
                        "flex h-16 w-16 items-center justify-center rounded-full transition-all",
                        isLocked ? "bg-muted text-muted-foreground" :
                            isCompleted ? "bg-green-500 text-white cherry-glow" :
                                "bg-primary text-white cherry-glow"
                    )}>
                        {isLocked ? (
                            <Lock className="h-6 w-6" />
                        ) : isCompleted ? (
                            <Check className="h-8 w-8" />
                        ) : (
                            <Icon className="h-8 w-8" />
                        )}
                    </div>

                    {/* Status Badge */}
                    {!isLocked && !isCompleted && (
                        <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-white shadow-lg">
                            <Star className="h-3 w-3 fill-current" />
                        </div>
                    )}
                </div>
            </div>

            {/* Label */}
            <div className="flex flex-col items-center text-center">
                <span className={cn(
                    "text-sm font-bold tracking-tight",
                    isLocked ? "text-muted-foreground" : "text-foreground"
                )}>
                    {title}
                </span>
                {!isLocked && (
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        {isCompleted ? "Completed" : `${progress}% Mastered`}
                    </span>
                )}
            </div>
        </motion.div>
    );
}
