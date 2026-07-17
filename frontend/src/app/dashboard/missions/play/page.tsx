"use client";

import { Suspense } from "react";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, TerminalSquare, CheckCircle, XCircle, Code2, Zap } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

function MissionPlayContent() {
  const searchParams = useSearchParams();
  const missionId = searchParams.get("missionId");
  const router = useRouter();
  const { userId, getToken } = useAuth();
  
  const [mission, setMission] = useState<any>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (!missionId) return;

    const fetchMission = async () => {
      try {
        const token = await getToken();
        const headers = { "x-user-id": userId || "mock_user_123" };
        const res = await fetch(`http://localhost:8000/api/v1/missions/${missionId}`, { headers });
        if (!res.ok) throw new Error("Failed to fetch mission");
        const data = await res.json();
        setMission(data);
        
        if (data.challenges && data.challenges.length > 0) {
          setCode(data.challenges[0].initial_code || "# Write your python code here\n\n");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMission();
  }, [missionId, userId, getToken]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setResult(null);
    try {
      const token = await getToken();
      const headers = { 
        "x-user-id": userId || "mock_user_123",
        "Content-Type": "application/json"
      };
      
      const res = await fetch(`http://localhost:8000/api/v1/missions/${missionId}/submit`, {
        method: "POST",
        headers,
        body: JSON.stringify({ code })
      });
      
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({ status: "error", message: "Failed to connect to the server." });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-b-2 border-rose-500 animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }}></div>
        </div>
      </div>
    );
  }

  if (!mission) {
    return <div className="text-white text-center p-8 font-bold">Mission not found</div>;
  }

  const challenge = mission.challenges?.[0];

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/missions/${missionId}`} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-white drop-shadow-md tracking-tight flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              {mission.title}
            </h1>
          </div>
        </div>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            onClick={handleSubmit} 
            disabled={submitting}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-8 border border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
          >
            {submitting ? (
               <div className="w-5 h-5 rounded-full border-t-2 border-white animate-spin" />
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" /> Execute Spell
              </>
            )}
          </Button>
        </motion.div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        
        {/* Left Panel: Instructions */}
        <Card className="glass-card flex-1 p-6 overflow-y-auto border-white/10 custom-scrollbar flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-black uppercase tracking-widest text-indigo-400 mb-2 border-b border-indigo-500/20 pb-2">Mission Objective</h2>
            <div className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {challenge?.description || mission.story_intro}
            </div>
          </div>
          
          <div className="bg-black/30 p-4 rounded-xl border border-white/5 shadow-inner">
             <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Rewards</h3>
             <div className="flex gap-4">
                <span className="text-indigo-400 font-bold bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20">{mission.xp_reward} XP</span>
                <span className="text-amber-400 font-bold bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">{mission.coin_reward} Coins</span>
             </div>
          </div>
        </Card>

        {/* Right Panel: Editor & Terminal */}
        <div className="flex-[2] flex flex-col gap-6 min-h-0">
          
          {/* Editor */}
          <Card className="glass flex-[2] flex flex-col overflow-hidden border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.1)] relative group">
            <div className="absolute top-0 right-0 p-2 bg-indigo-500/20 rounded-bl-lg border-b border-l border-indigo-500/30 backdrop-blur-sm z-10">
              <Code2 className="w-4 h-4 text-indigo-400" />
            </div>
            <textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 w-full bg-zinc-950/80 p-6 text-emerald-400 font-mono text-sm sm:text-base outline-none resize-none custom-scrollbar leading-relaxed"
              spellCheck="false"
              placeholder="# Write your Python spell here..."
            />
          </Card>

          {/* Terminal / Results */}
          <Card className="glass flex-1 flex flex-col overflow-hidden border-zinc-700 relative bg-zinc-950/90">
            <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-2 flex items-center gap-2">
              <TerminalSquare className="w-4 h-4 text-zinc-400" />
              <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Terminal Output</span>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar font-mono text-sm">
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-4"
                  >
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                      result.status === "success" 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                    }`}>
                      {result.status === "success" ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      <span className="font-bold">{result.message}</span>
                    </div>
                    
                    {result.output && (
                      <div className="bg-black/50 p-4 rounded-lg text-zinc-300 whitespace-pre-wrap border border-white/5 shadow-inner leading-relaxed">
                        {result.output}
                      </div>
                    )}

                    {result.status === "success" && (
                      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="mt-2 inline-flex gap-4">
                        <Link href="/dashboard/missions">
                          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold border border-zinc-600">
                            Back to Quests
                          </Button>
                        </Link>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <div className="text-zinc-600 h-full flex items-center justify-center italic">
                    Waiting for execution...
                  </div>
                )}
              </AnimatePresence>
            </div>
          </Card>
          
        </div>
      </div>
    </div>
  );
}

export default function MissionPlayPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
        </div>
      </div>
    }>
      <MissionPlayContent />
    </Suspense>
  );
}
