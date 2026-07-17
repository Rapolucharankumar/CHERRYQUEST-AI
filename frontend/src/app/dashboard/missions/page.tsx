"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sword, Flame, Lock, Globe } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function MissionsPage() {
  const { userId, getToken } = useAuth();
  const [worlds, setWorlds] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const currentUserId = userId || "mock_user_123";
      
      try {
        const token = await getToken();
        
        const headers = { "x-user-id": currentUserId };
        
        const [worldsRes, userRes] = await Promise.all([
          fetch("http://localhost:8000/api/v1/missions/worlds", { headers }),
          fetch("http://localhost:8000/api/v1/users/me", { headers })
        ]);

        const worldsData = await worldsRes.json();
        const userData = await userRes.json();
        
        setWorlds(worldsData);
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, getToken]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-r-2 border-rose-500 animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.7s" }}></div>
          <div className="absolute inset-4 rounded-full border-b-2 border-emerald-500 animate-spin" style={{ animationDuration: "1.2s" }}></div>
        </div>
      </div>
    );
  }

  const getMissionStatus = (missionId: number) => {
    if (!user || !user.progress) return "locked";
    const progress = user.progress.find((p: any) => p.mission_id === missionId);
    return progress ? progress.status : "locked";
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-4"
      >
        <div className="bg-indigo-500/20 p-3 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.3)]">
          <Globe className="w-8 h-8 text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
        </div>
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white drop-shadow-md">Quests & Missions</h1>
          <p className="text-zinc-400 mt-1">Explore worlds and conquer challenges to earn XP.</p>
        </div>
      </motion.div>
      
      {worlds.map((world, wIndex) => (
        <motion.div 
          key={world.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: wIndex * 0.2 }}
          className="relative"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-400 mb-2 drop-shadow-sm">{world.title}</h2>
            <p className="text-zinc-400 text-lg">{world.description}</p>
          </div>
          
          {world.chapters.map((chapter: any, cIndex: number) => (
            <div key={chapter.id} className="mb-12 relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px bg-gradient-to-r from-white/20 to-transparent flex-1" />
                <h3 className="text-xl font-black text-white uppercase tracking-widest text-glow">Chapter {chapter.order_index}: {chapter.title}</h3>
                <div className="h-px bg-gradient-to-l from-white/20 to-transparent flex-1" />
              </div>

              <motion.div 
                variants={container} 
                initial="hidden" 
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {chapter.missions.map((mission: any) => {
                  const status = getMissionStatus(mission.id);
                  const isLocked = status === "locked";
                  const isCompleted = status === "completed";
                  
                  return (
                    <motion.div key={mission.id} variants={itemVariants} className="h-full">
                      <Card className={`glass-card h-full p-6 flex flex-col justify-between transition-all duration-500 relative overflow-hidden group ${isLocked ? 'opacity-60 grayscale-[0.3]' : 'hover:border-rose-500/50 hover:shadow-[0_10px_40px_rgba(244,63,94,0.15)]'}`}>
                        
                        {/* Holographic Scanline Effect on Hover (if not locked) */}
                        {!isLocked && (
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[200%] -top-[100%] group-hover:animate-[scan_2s_linear_infinite] pointer-events-none" />
                        )}

                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                             <div className={`p-3 rounded-xl border ${isLocked ? 'bg-zinc-900 border-zinc-800' : isCompleted ? 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-rose-500/10 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.2)]'}`}>
                               {isLocked ? <Lock className="w-6 h-6 text-zinc-600" /> : <Sword className={`w-6 h-6 ${isCompleted ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]' : 'text-rose-400 drop-shadow-[0_0_5px_rgba(244,63,94,0.8)]'}`} />}
                             </div>
                             <div className="flex flex-col items-end gap-1">
                                <span className="text-xs font-black uppercase tracking-widest text-indigo-400 bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-900 drop-shadow-sm">{mission.xp_reward} XP</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500/80">{mission.coin_reward} Coins</span>
                             </div>
                          </div>
                          <h4 className="font-black text-xl text-white mb-2 leading-tight tracking-wide">{mission.title}</h4>
                          <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed mb-6">{mission.story_intro}</p>
                        </div>
                        
                        <div className="mt-auto pt-4 border-t border-white/10 relative z-10">
                          {isLocked ? (
                            <Button disabled className="w-full bg-zinc-900 text-zinc-600 border border-zinc-800 font-bold tracking-widest uppercase">Locked</Button>
                          ) : isCompleted ? (
                            <Link href={`/dashboard/missions/${mission.id}`} className="block w-full">
                              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button className="w-full bg-emerald-950/40 text-emerald-400 hover:bg-emerald-900/60 border border-emerald-500/30 font-black tracking-widest uppercase shadow-[0_0_10px_rgba(16,185,129,0.1)]">Review Quest</Button>
                              </motion.div>
                            </Link>
                          ) : (
                            <Link href={`/dashboard/missions/${mission.id}`} className="block w-full">
                              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button className="w-full bg-rose-600/90 hover:bg-rose-500 text-white font-black tracking-widest uppercase border border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]">Start Quest</Button>
                              </motion.div>
                            </Link>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
