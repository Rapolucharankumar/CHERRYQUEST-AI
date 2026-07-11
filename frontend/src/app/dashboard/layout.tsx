import { UserButton } from "@clerk/nextjs";
import { 
  Gamepad2, 
  Map, 
  Trophy, 
  Backpack, 
  Settings, 
  Cherry, 
  Star, 
  Coins,
  Swords
} from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden selection:bg-rose-500/30">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/5 bg-zinc-950 flex flex-col">
        <div className="p-6 flex items-center gap-2 border-b border-white/5">
          <div className="bg-rose-500 p-1.5 rounded-lg">
            <Cherry className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">CherryQuest</span>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors">
            <Gamepad2 className="w-5 h-5 text-rose-400" />
            Dashboard
          </Link>
          <Link href="/dashboard/missions" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 font-medium hover:bg-white/5 hover:text-white transition-colors">
            <Swords className="w-5 h-5 text-indigo-400" />
            Missions
          </Link>
          <Link href="/dashboard/roadmaps" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 font-medium hover:bg-white/5 hover:text-white transition-colors">
            <Map className="w-5 h-5 text-emerald-400" />
            Roadmaps
          </Link>
          <Link href="/dashboard/leaderboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 font-medium hover:bg-white/5 hover:text-white transition-colors">
            <Trophy className="w-5 h-5 text-amber-400" />
            Leaderboard
          </Link>
          <Link href="/dashboard/inventory" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 font-medium hover:bg-white/5 hover:text-white transition-colors">
            <Backpack className="w-5 h-5 text-orange-400" />
            Inventory
          </Link>
        </nav>

        <div className="p-4 border-t border-white/5">
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 font-medium hover:bg-white/5 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative h-screen overflow-y-auto">
        {/* Game HUD Topbar */}
        <header className="h-20 border-b border-white/5 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50 px-8 flex items-center justify-between">
          {/* Player Stats */}
          <div className="flex items-center gap-8">
            <div className="flex flex-col gap-1 w-48">
              <div className="flex justify-between items-end text-xs font-bold uppercase tracking-wider text-zinc-400">
                <span className="flex items-center gap-1 text-rose-400"><Star className="w-3 h-3" /> Lvl 12</span>
                <span>450 / 1000 XP</span>
              </div>
              <Progress value={45} className="h-2.5 bg-zinc-800" indicatorClassName="bg-gradient-to-r from-rose-500 to-indigo-500" />
            </div>
            
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800 shadow-inner">
                <Coins className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-sm">1,240</span>
              </div>
            </div>
          </div>

          <UserButton appearance={{ elements: { avatarBox: "w-10 h-10 ring-2 ring-rose-500/50" } }} />
        </header>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
