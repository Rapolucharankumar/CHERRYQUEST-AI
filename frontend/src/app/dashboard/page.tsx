"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Sword, Flame, Target, Trophy, Lock, Coins } from "lucide-react";
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

const item: any = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function DashboardPage() {
  const { userId, getToken } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [missions, setMissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const currentUserId = userId || "mock_user_123";
      
      try {
        const token = await getToken();
        const headers = { "x-user-id": currentUserId };
        
        const [userRes, worldsRes] = await Promise.all([
          fetch("http://localhost:8000/api/v1/users/me", { headers }),
          fetch("http://localhost:8000/api/v1/missions/worlds", { headers })
        ]);

        const userData = await userRes.json();
        const worldsData = await worldsRes.json();
        
        setUser(userData);
        
        let allMissions: any[] = [];
        worldsData.forEach((w: any) => {
          w.chapters.forEach((c: any) => {
            allMissions = [...allMissions, ...c.missions];
          });
        });
        setMissions(allMissions);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, getToken]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-white">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-rose-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-r-2 border-indigo-500 animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.7s" }}></div>
          <div className="absolute inset-4 rounded-full border-b-2 border-emerald-500 animate-spin" style={{ animationDuration: "1.2s" }}></div>
        </div>
      </div>
    );
  }

  const profile = user?.profile || { level: 1, xp: 0, coins: 0, daily_streak: 0, rank_title: "Novice" };
  const currentLevelBaseXp = (profile.level - 1) * 500;
  const nextLevelXp = profile.level * 500;
  const xpIntoCurrentLevel = profile.xp - currentLevelBaseXp;
  const xpProgress = (xpIntoCurrentLevel / 500) * 100;

  const availableMission = missions.find(m => {
    const p = user?.progress?.find((prog: any) => prog.mission_id === m.id);
    return p?.status === "available";
  }) || missions[0];

  const getMissionStatus = (missionId: number) => {
    if (!user || !user.progress) return "locked";
    const progress = user.progress.find((p: any) => p.mission_id === missionId);
    return progress ? progress.status : "locked";
  };

  const todaysMissions = missions.slice(0, 3);

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="show" 
      className="max-w-6xl mx-auto flex flex-col gap-8"
    >
      
      {/* Stats Bar */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
        <div className="glass-card rounded-xl p-4 flex items-center justify-between group">
          <div className="text-zinc-400 text-sm font-bold uppercase group-hover:text-zinc-300 transition-colors">Current Level</div>
          <div className="text-2xl font-black text-white text-glow drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{profile.level}</div>
        </div>
        <div className="glass-card rounded-xl p-4 flex flex-col justify-center group">
          <div className="flex justify-between items-end mb-2">
            <div className="text-zinc-400 text-sm font-bold uppercase group-hover:text-zinc-300 transition-colors">Current XP</div>
            <div className="text-lg font-bold text-indigo-400 text-glow drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">{xpIntoCurrentLevel} <span className="text-zinc-500 text-xs font-medium">/ 500</span></div>
          </div>
          <div className="w-full bg-zinc-900/80 border border-zinc-800 h-2 rounded-full overflow-hidden shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="bg-gradient-to-r from-indigo-600 to-indigo-400 h-full rounded-full relative"
            >
              <div className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 animate-[shimmer_2s_infinite]" />
            </motion.div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-4 flex items-center justify-between group">
          <div className="text-zinc-400 text-sm font-bold uppercase group-hover:text-zinc-300 transition-colors">Coins</div>
          <div className="text-2xl font-black text-amber-400 flex items-center gap-1 text-glow drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]">
            <Coins className="w-5 h-5" />
            {profile.coins}
          </div>
        </div>
        <div className="glass-card rounded-xl p-4 flex items-center justify-between group">
          <div className="text-zinc-400 text-sm font-bold uppercase group-hover:text-zinc-300 transition-colors">Rank</div>
          <div className="text-lg font-bold text-rose-400 text-glow drop-shadow-[0_0_10px_rgba(244,63,94,0.6)]">{profile.rank_title}</div>
        </div>
      </motion.div>

      {/* Welcome Banner */}
      <motion.section variants={item} className="relative rounded-3xl overflow-hidden glass border-white/10 p-8 flex flex-col md:flex-row items-center justify-between gap-6 group">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-gradient-to-br from-rose-600/20 via-indigo-600/10 to-transparent rounded-full mix-blend-screen filter blur-[80px] group-hover:opacity-100 opacity-60 transition-opacity duration-700" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-gradient-to-tr from-emerald-600/10 via-transparent to-transparent rounded-full mix-blend-screen filter blur-[80px]" />
          
          {/* Cyber grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
        </div>
        
        <div className="relative z-10 flex flex-col items-start gap-4 max-w-xl">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold uppercase tracking-wider border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
          >
            <Flame className="w-4 h-4" /> {profile.daily_streak} Day Streak!
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-lg leading-tight">
            Ready for your <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-400">next quest?</span>
          </h1>
          <p className="text-zinc-400 text-lg">Your next challenge: <span className="text-white font-bold drop-shadow-md">{availableMission?.title || "Waiting..."}</span></p>
        </div>
        
        <div className="relative z-10 flex-shrink-0">
          {availableMission && (
            <Link href={`/dashboard/missions/${availableMission.id}`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="h-16 px-8 text-xl font-bold bg-white text-black hover:bg-zinc-200 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-all">
                  <Play className="mr-3 h-6 w-6 fill-black" />
                  Continue Journey
                </Button>
              </motion.div>
            </Link>
          )}
        </div>
      </motion.section>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <section>
            <motion.div variants={item} className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2 text-white drop-shadow-sm">
                <Target className="text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" /> Today's Missions
              </h2>
              <Link href="/dashboard/missions" className="text-rose-500 hover:text-rose-400 text-sm font-bold uppercase tracking-wider transition-colors hover:drop-shadow-[0_0_5px_rgba(244,63,94,0.5)]">
                View All Quests
              </Link>
            </motion.div>
            
            <div className="flex flex-col gap-4">
              {todaysMissions.map((mission, index) => {
                const status = getMissionStatus(mission.id);
                const isLocked = status === "locked";
                const isCompleted = status === "completed";
                
                return (
                  <motion.div key={mission.id} variants={item}>
                    <Card className={`glass-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 ${isLocked ? 'opacity-60 grayscale-[0.5]' : 'hover:bg-white/[0.02] hover:border-white/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl shadow-inner ${isLocked ? 'bg-zinc-900 border border-zinc-800' : isCompleted ? 'bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-rose-500/10 border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.2)]'}`}>
                          {isLocked ? <Lock className="w-6 h-6 text-zinc-600" /> : <Sword className={`w-6 h-6 ${isCompleted ? 'text-emerald-400' : 'text-rose-400'}`} />}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-white tracking-wide">{mission.title}</h3>
                          <p className="text-zinc-500 text-sm font-medium">Python Basics • {mission.xp_reward} XP</p>
                        </div>
                      </div>
                      
                      {isLocked ? (
                        <Button variant="outline" disabled className="w-full sm:w-auto border-zinc-800/50 bg-black/20 text-zinc-600">
                          Locked
                        </Button>
                      ) : isCompleted ? (
                         <Button variant="outline" disabled className="w-full sm:w-auto border-emerald-900/50 bg-emerald-950/30 text-emerald-500 font-bold">
                          Completed
                        </Button>
                      ) : (
                        <Link href={`/dashboard/missions/${mission.id}`} className="w-full sm:w-auto">
                          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                            <Button variant="outline" className="w-full border-zinc-700 bg-transparent text-white hover:bg-white/10 hover:text-white transition-colors">
                              Start Quest
                            </Button>
                          </motion.div>
                        </Link>
                      )}
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="flex flex-col gap-8">
          <section>
            <motion.h2 variants={item} className="text-xl font-bold mb-6 text-white drop-shadow-sm">Daily Challenge</motion.h2>
            <motion.div variants={item}>
              <Card className="glass overflow-hidden border-indigo-500/30 p-6 relative group hover:border-indigo-400/50 transition-colors shadow-[0_0_30px_rgba(99,102,241,0.1)]">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-900/20 z-0" />
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-[40px] z-0" 
                />
                
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-all duration-500 transform group-hover:scale-110 z-0">
                  <Trophy className="w-24 h-24 text-indigo-400 filter drop-shadow-[0_0_10px_rgba(99,102,241,1)]" />
                </div>
                
                <div className="relative z-10">
                  <div className="inline-block text-indigo-400 text-xs font-black uppercase tracking-widest mb-3 border border-indigo-500/30 bg-indigo-950/50 px-2 py-1 rounded">Hard Difficulty</div>
                  <h3 className="text-2xl font-black text-white mb-2 tracking-tight drop-shadow-md">Algorithm Arena</h3>
                  <p className="text-zinc-400 text-sm mb-6 leading-relaxed">Complete a LeetCode style challenge to earn a rare chest and 500 bonus XP.</p>
                  
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-[0_0_15px_rgba(99,102,241,0.4)]" disabled>
                      Coming Soon
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
