"use client";

import { Card } from "@/components/ui/card";
import { Trophy, Medal, Crown } from "lucide-react";
import { motion } from "framer-motion";

// Mock Data for Leaderboard
const leaderboardData = [
  { id: 1, username: "CodeNinja", xp: 15420, level: 30, rank: 1 },
  { id: 2, username: "DataWizard", xp: 14200, level: 28, rank: 2 },
  { id: 3, username: "PythonMaster", xp: 13500, level: 27, rank: 3 },
  { id: 4, username: "CherryLearner", xp: 12100, level: 24, rank: 4 },
  { id: 5, username: "BugSmasher", xp: 11050, level: 22, rank: 5 },
  { id: 6, username: "DevHero", xp: 10400, level: 20, rank: 6 },
  { id: 7, username: "SyntaxError", xp: 9800, level: 19, rank: 7 },
  { id: 8, username: "You (MockUser)", xp: 9500, level: 18, rank: 8, isCurrentUser: true },
  { id: 9, username: "WebWeaver", xp: 9100, level: 18, rank: 9 },
  { id: 10, username: "ScriptKiddie", xp: 8400, level: 16, rank: 10 },
];

const listContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const listItem: any = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function LeaderboardPage() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-2"
      >
        <div className="flex items-center gap-4">
          <div className="bg-amber-500/20 p-3 rounded-2xl shadow-[0_0_20px_rgba(251,191,36,0.2)]">
            <Trophy className="w-8 h-8 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white drop-shadow-md">Global Leaderboard</h1>
            <p className="text-zinc-400 mt-1">See how you rank against other learners.</p>
          </div>
        </div>
      </motion.div>

      {/* Top 3 Podium (Visual Flex Layout) */}
      <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-8 mt-12 mb-16 h-64 relative">
        
        {/* Glow behind podium */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-32 bg-amber-500/10 blur-[60px] rounded-full pointer-events-none" />

        {/* Rank 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full md:w-1/3 flex flex-col items-center order-2 md:order-1 relative z-10"
        >
          <div className="relative mb-4">
            <div className="w-20 h-20 bg-zinc-900 rounded-full border-4 border-zinc-400 flex items-center justify-center shadow-[0_0_20px_rgba(161,161,170,0.4)]">
              <span className="text-2xl font-black text-white drop-shadow-md">2</span>
            </div>
            <Medal className="absolute -bottom-2 -right-2 w-8 h-8 text-zinc-400 drop-shadow-[0_0_5px_rgba(161,161,170,0.8)]" />
          </div>
          <Card className="w-full bg-gradient-to-t from-zinc-800/80 to-zinc-900/40 backdrop-blur-md border-zinc-600/50 p-4 text-center h-32 flex flex-col justify-end shadow-xl">
            <h3 className="font-bold text-white truncate tracking-wide">{leaderboardData[1].username}</h3>
            <p className="text-zinc-400 text-sm font-black tracking-wider">{leaderboardData[1].xp.toLocaleString()} XP</p>
          </Card>
        </motion.div>

        {/* Rank 1 */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
          className="w-full md:w-1/3 flex flex-col items-center order-1 md:order-2 relative z-20"
        >
          <div className="relative mb-4">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-12 left-1/2 -translate-x-1/2"
            >
              <Crown className="w-14 h-14 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.9)]" />
            </motion.div>
            <div className="w-24 h-24 bg-zinc-900 rounded-full border-4 border-amber-400 flex items-center justify-center shadow-[0_0_40px_rgba(251,191,36,0.5)]">
              <span className="text-3xl font-black text-white drop-shadow-md">1</span>
            </div>
          </div>
          <Card className="w-full bg-gradient-to-t from-amber-900/60 to-zinc-900/60 backdrop-blur-xl border-amber-500/50 p-4 text-center h-44 flex flex-col justify-end shadow-[0_-10px_40px_rgba(251,191,36,0.15)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-400/10 to-transparent" />
            <h3 className="font-black text-amber-400 text-xl truncate relative z-10 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]">{leaderboardData[0].username}</h3>
            <p className="text-amber-200 text-sm font-black tracking-wider relative z-10">{leaderboardData[0].xp.toLocaleString()} XP</p>
          </Card>
        </motion.div>

        {/* Rank 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full md:w-1/3 flex flex-col items-center order-3 md:order-3 relative z-10"
        >
          <div className="relative mb-4">
            <div className="w-20 h-20 bg-zinc-900 rounded-full border-4 border-orange-700 flex items-center justify-center shadow-[0_0_20px_rgba(194,65,12,0.4)]">
              <span className="text-2xl font-black text-white drop-shadow-md">3</span>
            </div>
            <Medal className="absolute -bottom-2 -right-2 w-8 h-8 text-orange-600 drop-shadow-[0_0_5px_rgba(194,65,12,0.8)]" />
          </div>
          <Card className="w-full bg-gradient-to-t from-orange-950/60 to-zinc-900/40 backdrop-blur-md border-orange-900/50 p-4 text-center h-28 flex flex-col justify-end shadow-xl">
            <h3 className="font-bold text-white truncate tracking-wide">{leaderboardData[2].username}</h3>
            <p className="text-orange-400/80 text-sm font-black tracking-wider">{leaderboardData[2].xp.toLocaleString()} XP</p>
          </Card>
        </motion.div>

      </div>

      {/* Leaderboard Table List */}
      <Card className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/40 border-b border-white/10">
                <th className="p-4 text-zinc-400 font-black uppercase text-xs tracking-widest w-16 text-center">Rank</th>
                <th className="p-4 text-zinc-400 font-black uppercase text-xs tracking-widest">User</th>
                <th className="p-4 text-zinc-400 font-black uppercase text-xs tracking-widest text-right">Level</th>
                <th className="p-4 text-zinc-400 font-black uppercase text-xs tracking-widest text-right">Total XP</th>
              </tr>
            </thead>
            <motion.tbody variants={listContainer} initial="hidden" animate="show">
              {leaderboardData.slice(3).map((user) => (
                <motion.tr 
                  variants={listItem}
                  key={user.id} 
                  className={`border-b border-white/5 transition-colors ${user.isCurrentUser ? 'bg-amber-500/10 hover:bg-amber-500/20 shadow-[inset_4px_0_0_rgba(251,191,36,1)]' : 'hover:bg-white/5'}`}
                >
                  <td className="p-4 text-center font-black text-zinc-500">{user.rank}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-black text-zinc-400 shadow-inner">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <span className={`font-bold ${user.isCurrentUser ? 'text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]' : 'text-white'}`}>
                        {user.username}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-right font-bold text-zinc-400">Lvl {user.level}</td>
                  <td className="p-4 text-right font-black text-indigo-400 drop-shadow-[0_0_5px_rgba(99,102,241,0.3)]">{user.xp.toLocaleString()}</td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
