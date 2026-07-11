import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Sword, Flame, Target } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Welcome Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 p-8 flex flex-col md:flex-row items-center justify-between gap-6 group">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-600/10 rounded-full mix-blend-screen filter blur-[100px] opacity-50 group-hover:opacity-70 transition-opacity" />
        </div>
        <div className="relative z-10 flex flex-col items-start gap-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold uppercase tracking-wider border border-rose-500/20">
            <Flame className="w-4 h-4" /> 7 Day Streak!
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Ready for your next quest?</h1>
          <p className="text-zinc-400 text-lg">You are currently exploring the Python Basics realm. Your next challenge awaits.</p>
        </div>
        <div className="relative z-10 flex-shrink-0">
          <Button size="lg" className="h-16 px-8 text-xl font-bold bg-white text-black hover:bg-zinc-200 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            <Play className="mr-3 h-6 w-6 fill-black" />
            Continue Journey
          </Button>
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Today's Missions */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Target className="text-indigo-400" /> Today's Missions
            </h2>
            <div className="flex flex-col gap-4">
              {/* Mission Card 1 */}
              <Card className="bg-zinc-950 border-zinc-800 p-5 flex items-center justify-between hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-rose-500/10 p-3 rounded-xl">
                    <Sword className="w-6 h-6 text-rose-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">Slay the Syntax Bug</h3>
                    <p className="text-zinc-500 text-sm">Python Basics • 150 XP Reward</p>
                  </div>
                </div>
                <Button variant="outline" className="border-zinc-700 bg-transparent text-white hover:bg-zinc-800">
                  Start Quest
                </Button>
              </Card>

              {/* Mission Card 2 */}
              <Card className="bg-zinc-950 border-zinc-800 p-5 flex items-center justify-between hover:border-zinc-700 transition-colors opacity-75">
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-500/10 p-3 rounded-xl">
                    <Sword className="w-6 h-6 text-indigo-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">Variables and Potions</h3>
                    <p className="text-zinc-500 text-sm">Python Basics • 200 XP Reward</p>
                  </div>
                </div>
                <Button variant="outline" disabled className="border-zinc-800 bg-transparent text-zinc-600">
                  Locked
                </Button>
              </Card>
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="flex flex-col gap-8">
          {/* Daily Challenge */}
          <section>
            <h2 className="text-xl font-bold mb-4">Daily Challenge</h2>
            <Card className="bg-gradient-to-br from-indigo-950 to-zinc-950 border-indigo-900/50 p-6 relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110">
                <Trophy className="w-24 h-24 text-indigo-400" />
              </div>
              <div className="relative z-10">
                <div className="text-indigo-400 text-sm font-bold uppercase tracking-wider mb-2">Hard Difficulty</div>
                <h3 className="text-2xl font-bold text-white mb-2">Algorithm Arena</h3>
                <p className="text-zinc-400 text-sm mb-6">Complete a LeetCode style challenge to earn a rare chest.</p>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold">
                  Enter Arena
                </Button>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
