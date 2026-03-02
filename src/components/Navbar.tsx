"use client";

import {
    Search,
    Bell,
    Zap,
    Coins,
    Flame,
    ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";

export function Navbar() {
    const { user, loading } = useUser();

    return (
        <header className="flex h-20 items-center justify-between border-b bg-card/30 px-8 backdrop-blur-md sticky top-0 z-10">
            <div className="flex w-96 items-center gap-2 rounded-xl bg-muted/50 px-4 py-2 ring-offset-background transition-all focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search quests, topics, or players..."
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <div className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground uppercase">
                    Ctrl K
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 border-r pr-6">
                    <div className="flex items-center gap-1.5 group cursor-pointer">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                            <Flame className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold leading-none">{loading ? "..." : (user?.streak ?? 0)}</span>
                            <span className="text-[10px] text-muted-foreground uppercase">Day Streak</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 group cursor-pointer">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-500 transition-colors group-hover:bg-yellow-500 group-hover:text-white">
                            <Coins className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold leading-none">{loading ? "..." : (user?.coins ?? 0).toLocaleString()}</span>
                            <span className="text-[10px] text-muted-foreground uppercase">Coins</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 group cursor-pointer">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                            <Zap className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold leading-none">{loading ? "..." : (user?.xp ?? 0).toLocaleString()}</span>
                            <span className="text-[10px] text-muted-foreground uppercase">XP</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
                        <Bell className="h-5 w-5" />
                        <span className="absolute right-2.5 top-2.5 flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                        </span>
                    </button>

                    <div className="flex items-center gap-3 pl-2 cursor-pointer group">
                        <div className="h-10 w-10 overflow-hidden rounded-xl border-2 border-transparent transition-all group-hover:border-primary">
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                                alt="Avatar"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="hidden flex-col items-start xl:flex">
                            <span className="text-sm font-bold leading-none">{loading ? "Loading..." : user?.email?.split('@')[0] || "Guest"}</span>
                            <span className="text-xs text-muted-foreground">Level {user?.level || 1} • Python Novice</span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
            </div>
        </header>
    );
}
