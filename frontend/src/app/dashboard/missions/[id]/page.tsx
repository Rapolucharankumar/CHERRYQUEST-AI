"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Sword } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MissionBriefingPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { userId, getToken } = useAuth();
  const [mission, setMission] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchMission = async () => {
      try {
        const token = await getToken();
        const headers = { "x-user-id": userId || "mock_user_123" };
        const res = await fetch(`http://localhost:8000/api/v1/missions/${id}`, { headers });
        if (!res.ok) throw new Error("Failed to fetch mission");
        const data = await res.json();
        setMission(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMission();
  }, [id, userId, getToken]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-r-2 border-rose-500 animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.7s" }}></div>
        </div>
      </div>
    );
  }

  if (!mission) {
    return <div className="text-white text-center p-8">Mission not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 p-4">
      <Link href="/dashboard/missions" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Missions
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-indigo-500/10 to-transparent blur-[60px] pointer-events-none" />
        
        <Card className="glass-card border-white/10 p-8 relative overflow-hidden group shadow-2xl">
          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
            
            <div className="w-full md:w-2/3">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-rose-500/20 p-3 rounded-2xl shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                  <Sword className="w-8 h-8 text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                </div>
                <div>
                  <h1 className="text-4xl font-black text-white drop-shadow-md tracking-tight">{mission.title}</h1>
                  <p className="text-indigo-400 font-bold uppercase tracking-widest text-sm mt-1">Mission Briefing</p>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-zinc-300 text-lg leading-relaxed mb-6">
                  {mission.story_intro || "A new challenge awaits..."}
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/3 flex flex-col gap-4">
              <Card className="bg-zinc-950/50 border-white/5 p-4 rounded-xl shadow-inner">
                <h3 className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-3">Rewards</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-300 font-bold">XP</span>
                    <span className="text-indigo-400 font-black drop-shadow-sm">+{mission.xp_reward}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-300 font-bold">Coins</span>
                    <span className="text-amber-400 font-black drop-shadow-sm">+{mission.coin_reward}</span>
                  </div>
                </div>
              </Card>

              <Link href={`/dashboard/missions/play?missionId=${mission.id}`} className="block mt-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="w-full h-14 bg-rose-600 hover:bg-rose-500 text-white font-black text-lg tracking-wider shadow-[0_0_20px_rgba(244,63,94,0.4)] border border-rose-500">
                    <Play className="w-5 h-5 mr-2" /> Start Mission
                  </Button>
                </motion.div>
              </Link>
            </div>
            
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
