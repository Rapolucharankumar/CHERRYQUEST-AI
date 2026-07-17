"use client";

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
import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Gamepad2, color: "text-rose-500" },
  { href: "/dashboard/missions", label: "Missions", icon: Swords, color: "text-indigo-500" },
  { href: "/dashboard/roadmaps", label: "Roadmaps", icon: Map, color: "text-emerald-500" },
  { href: "/dashboard/leaderboard", label: "Leaderboard", icon: Trophy, color: "text-amber-500" },
  { href: "/dashboard/inventory", label: "Inventory", icon: Backpack, color: "text-orange-500" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background text-white flex overflow-hidden selection:bg-rose-500/30">
      
      {/* Sidebar Navigation (Glassmorphic) */}
      <aside className="w-64 border-r border-white/10 glass flex flex-col z-50">
        <div className="p-6 flex items-center gap-2 border-b border-white/10">
          <div className="bg-rose-500 p-1.5 rounded-lg shadow-[0_0_15px_rgba(244,63,94,0.5)]">
            <Cherry className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white drop-shadow-md">CherryQuest</span>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2 relative">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard");
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href} className="relative block">
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active-bg"
                    className="absolute inset-0 bg-white/10 rounded-lg border border-white/10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={`relative flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-colors ${isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'}`}>
                  <Icon className={`w-5 h-5 ${isActive ? item.color : 'text-zinc-500'} transition-colors duration-300`} />
                  <span className="z-10">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 font-medium hover:bg-white/5 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative h-screen overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-background to-background">
        
        {/* Game HUD Topbar (Glassmorphic) */}
        <header className="h-20 border-b border-white/5 bg-background/50 backdrop-blur-xl sticky top-0 z-40 px-8 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          {/* Player Stats */}
          <div className="flex items-center gap-8">
            <div className="flex flex-col gap-1 w-48 group cursor-default">
              <div className="flex justify-between items-end text-xs font-bold uppercase tracking-wider text-zinc-400">
                <span className="flex items-center gap-1 text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]"><Star className="w-3 h-3" /> Lvl 12</span>
                <span className="group-hover:text-zinc-200 transition-colors">450 / 1000 XP</span>
              </div>
              <Progress value={45} className="h-2.5 bg-zinc-900 border border-zinc-800 shadow-inner overflow-hidden relative">
                 <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500"
                    style={{ width: "45%" }}
                 />
                 {/* Shine effect */}
                 <motion.div 
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 1 }}
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                 />
              </Progress>
            </div>
            
            <div className="flex gap-4 cursor-default">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-full border border-amber-500/20 shadow-[0_0_10px_rgba(251,191,36,0.15)]"
              >
                <Coins className="w-4 h-4 text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.8)]" />
                <span className="font-bold text-sm text-amber-50">1,240</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-full border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.15)]"
              >
                <Cherry className="w-4 h-4 text-rose-400 drop-shadow-[0_0_5px_rgba(244,63,94,0.8)]" />
                <span className="font-bold text-sm text-rose-50">50</span>
              </motion.div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <UserButton appearance={{ elements: { avatarBox: "w-10 h-10 ring-2 ring-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.3)]" } }} />
          </div>
        </header>

        {/* Page Content with Transitions */}
        <div className="p-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
