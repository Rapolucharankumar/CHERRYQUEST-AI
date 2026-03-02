"use client";

import {
  Flame,
  Target,
  Zap,
  TrendingUp,
  ChevronRight,
  Play,
  BookOpen,
  Award
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";

const RECOMMENDATIONS = [
  {
    title: "Loops & Iterations",
    desc: "AI detected struggle with Nested Loops. Try this refresher.",
    level: "Intermediate",
    xp: 250,
    icon: Play
  },
  {
    title: "Data Structures 101",
    desc: "Unlock the power of Lists and Dictionaries.",
    level: "Beginner",
    xp: 150,
    icon: BookOpen
  },
];

export default function DashboardPage() {
  const { user, loading } = useUser();

  const STATS = [
    { label: "XP Total", value: loading ? "..." : (user?.xp ?? 0).toLocaleString(), icon: Zap, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Streak", value: loading ? "..." : user?.streak || "0", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Mastery", value: "68%", icon: Target, color: "text-primary", bg: "bg-primary/10" },
    { label: "Level", value: loading ? "..." : user?.level || "1", icon: TrendingUp, color: "text-secondary", bg: "bg-secondary/10" },
  ];
  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Header */}
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Welcome back, <span className="text-primary italic">Coder!</span>
        </h1>
        <p className="text-muted-foreground">
          You're just <span className="font-bold text-foreground">{loading ? "..." : Math.max(0, (user?.level || 1) * 1000 - (user?.xp || 0))} XP</span> away from Level {(user?.level || 1) + 1}. Keep the momentum going!
        </p>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label}
            className="glass flex items-center gap-4 rounded-2xl p-6 transition-all hover:scale-[1.02] hover:bg-card/80"
          >
            <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", stat.bg)}>
              <stat.icon className={cn("h-6 w-6", stat.color)} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold leading-none">{stat.value}</span>
              <span className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Daily Quest Card */}
        <section className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Daily Quests
            </h2>
            <button className="text-sm font-medium text-primary hover:underline">View All</button>
          </div>

          <div className="cherry-gradient rounded-3xl p-8 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform duration-500">
              <Zap className="h-32 w-32" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="space-y-2">
                <span className="text-sm font-medium opacity-80 uppercase tracking-[0.2em]">Featured Quest</span>
                <h3 className="text-3xl font-black">The Recursive Maze</h3>
                <p className="max-w-md text-white/80">
                  Master the art of recursion by solving 3 complex pathfinding puzzles.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-primary transition-all hover:scale-105 active:scale-95">
                  <Play className="h-4 w-4 fill-current" />
                  Start Quest
                </button>
                <div className="flex flex-col">
                  <span className="text-sm font-bold leading-none">+500 XP</span>
                  <span className="text-xs opacity-70">Bonus: 50 Gems</span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 h-1 w-full bg-black/10">
              <div className="h-full w-[65%] bg-white/40" />
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="space-y-4 mt-10">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-500" />
              AI Suggested for You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RECOMMENDATIONS.map((rec) => (
                <div key={rec.title} className="glass p-5 rounded-2xl flex flex-col gap-4 group cursor-pointer hover:border-primary/50 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                      <rec.icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-muted text-muted-foreground uppercase">
                      {rec.level}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold group-hover:text-primary transition-colors">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{rec.desc}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-bold text-primary">+{rec.xp} XP Credits</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sidebar Widgets */}
        <aside className="space-y-8">
          {/* Skill Tree Summary */}
          <div className="glass rounded-2xl p-6 space-y-6">
            <h3 className="font-bold flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Recent Progress
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Variables</span>
                  <span className="text-muted-foreground">90%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[90%] bg-primary cherry-glow" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Functions</span>
                  <span className="text-muted-foreground">45%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[45%] bg-secondary" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Modules</span>
                  <span className="text-muted-foreground">12%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[12%] bg-blue-500" />
                </div>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-primary border border-primary/20 rounded-xl hover:bg-primary hover:text-white transition-all">
              Go to Quest Map
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Leaderboard Snippet */}
          <div className="glass rounded-2xl p-6 space-y-6">
            <h3 className="font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Leaderboard
            </h3>

            <div className="space-y-4">
              {[
                { name: "Alex K.", xp: "12,450", rank: 1, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
                { name: "Sarah M.", xp: "10,200", rank: 2, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
                { name: "Chen W.", xp: "9,850", rank: 3, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chen" },
                { name: "You", xp: loading ? "..." : (user?.xp ?? 0).toLocaleString(), rank: 42, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" },
              ].map((user) => (
                <div key={user.name} className={cn(
                  "flex items-center gap-3 p-2 rounded-xl transition-all",
                  user.name === "You" ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/30"
                )}>
                  <span className="text-xs font-bold text-muted-foreground w-4">#{user.rank}</span>
                  <img src={user.avatar} className="h-8 w-8 rounded-full bg-muted" alt="" />
                  <div className="flex-1">
                    <div className="text-sm font-bold">{user.name}</div>
                    <div className="text-[10px] text-muted-foreground uppercase">{user.xp} XP</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
