import { Cherry, Code2, Gamepad2, Swords, Trophy, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-rose-500/30 overflow-hidden relative">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[120px] opacity-60" />
      </div>

      <main className="relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto border-b border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="bg-rose-500 p-1.5 rounded-lg">
              <Cherry className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">CherryQuest AI</span>
          </div>
          <div className="flex gap-4 items-center">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" className="text-zinc-400 hover:text-white">Login</Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button className="bg-rose-600 hover:bg-rose-500 text-white border-0 shadow-[0_0_15px_rgba(225,29,72,0.5)]">
                  Play Free
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button className="bg-rose-600 hover:bg-rose-500 text-white border-0 shadow-[0_0_15px_rgba(225,29,72,0.5)] mr-4">
                  Dashboard
                </Button>
              </Link>
              <UserButton appearance={{ elements: { avatarBox: "w-10 h-10 ring-2 ring-rose-500/50" } }} />
            </SignedIn>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md text-sm text-zinc-300">
            <Zap className="w-4 h-4 text-rose-500" />
            <span>Season 1 is now live</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-br from-white via-white to-zinc-500 bg-clip-text text-transparent">
            Learn to code like <br/>
            playing an <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-500 drop-shadow-lg">RPG Game.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mb-12 font-medium leading-relaxed">
            Forget boring tutorials. Complete missions, battle bosses, earn XP, and unlock real-world programming skills with your personal AI mentor.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <Button size="lg" className="h-14 px-8 text-lg font-bold bg-white text-black hover:bg-zinc-200 transition-transform hover:scale-105 active:scale-95">
              <Gamepad2 className="mr-2 h-6 w-6" />
              Start Your Journey
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold border-zinc-700 bg-black/50 text-white hover:bg-zinc-800 transition-transform hover:scale-105 active:scale-95">
              View Roadmaps
            </Button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800/50 hover:border-rose-500/30 transition-colors group">
              <div className="bg-rose-500/10 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <Swords className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Epic Missions</h3>
              <p className="text-zinc-400 leading-relaxed">Solve interactive coding challenges disguised as thrilling quests. Defeat bugs and conquer logic puzzles.</p>
            </div>
            
            <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800/50 hover:border-indigo-500/30 transition-colors group">
              <div className="bg-indigo-500/10 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <Code2 className="w-8 h-8 text-indigo-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3">In-Browser Compiler</h3>
              <p className="text-zinc-400 leading-relaxed">Write, run, and debug real code in Python, JS, C++, and more instantly without installing anything.</p>
            </div>
            
            <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800/50 hover:border-amber-500/30 transition-colors group">
              <div className="bg-amber-500/10 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Level Up</h3>
              <p className="text-zinc-400 leading-relaxed">Earn XP, unlock achievements, climb the global leaderboard, and show off your developer rank.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
