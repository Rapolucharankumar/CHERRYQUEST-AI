"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Map, MapPin, CheckCircle2, Lock, Flame } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function RoadmapsPage() {
  const { userId, getToken } = useAuth();
  const [worlds, setWorlds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const currentUserId = userId || "mock_user_123";
      
      try {
        const token = await getToken();
        const headers = { "x-user-id": currentUserId };
        
        const res = await fetch("http://localhost:8000/api/v1/missions/worlds", { headers });
        const data = await res.json();
        setWorlds(data);
      } catch (error) {
        console.error("Failed to fetch roadmaps:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, getToken]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-emerald-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-r-2 border-indigo-500 animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.7s" }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-4"
      >
        <div className="bg-emerald-500/20 p-3 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <Map className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
        </div>
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white drop-shadow-md">Learning Roadmaps</h1>
          <p className="text-zinc-400 mt-1">Track your journey through the realms of knowledge.</p>
        </div>
      </motion.div>

      <div className="relative">
        {/* Animated Vertical Line */}
        <div className="absolute inset-0 ml-6 -translate-x-px md:mx-auto md:translate-x-0 w-1 bg-zinc-800/50 h-full rounded-full z-0 overflow-hidden">
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="w-full bg-gradient-to-b from-emerald-500 via-indigo-500 to-rose-500"
          />
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-12 relative z-10 py-6"
        >
          {worlds.map((world, index) => (
            <motion.div variants={itemVariants} key={world.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              
              {/* Timeline Marker */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-zinc-900 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(16,185,129,0.3)] z-10 transition-transform group-hover:scale-110 duration-300">
                <MapPin className="w-5 h-5 text-emerald-500 filter drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]" />
              </div>

              {/* Content Card */}
              <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] glass-card p-6 border-zinc-800/50 hover:border-emerald-500/50 hover:bg-white/[0.03] transition-all duration-300 shadow-xl group-hover:shadow-[0_10px_40px_rgba(16,185,129,0.15)]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                    Phase {index + 1}
                  </span>
                  <span className="text-zinc-500 text-sm font-bold">
                    {world.chapters?.length || 0} Chapters
                  </span>
                </div>
                
                <h3 className="text-2xl font-black text-white mb-2 tracking-wide drop-shadow-sm">{world.title}</h3>
                <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{world.description}</p>
                
                <div className="space-y-4">
                  {world.chapters?.map((chapter: any, cIndex: number) => (
                    <motion.div 
                      key={chapter.id} 
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      {cIndex === 0 ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 filter drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                      ) : cIndex === 1 ? (
                        <Flame className="w-5 h-5 text-orange-500 shrink-0 filter drop-shadow-[0_0_5px_rgba(249,115,22,0.5)]" />
                      ) : (
                        <Lock className="w-5 h-5 text-zinc-600 shrink-0" />
                      )}
                      <span className={cIndex > 1 ? "text-zinc-500" : "text-zinc-200 font-bold"}>
                        Chapter {chapter.order_index}: {chapter.title}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/50">
                  <Link href="/dashboard/missions">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="w-full bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                        View Missions
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
