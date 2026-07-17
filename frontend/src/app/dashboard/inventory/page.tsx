"use client";

import { Card } from "@/components/ui/card";
import { Backpack, Shield, Zap, Sparkles, Gem, BookOpen, Key, Beaker } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Mock Data for Inventory Items
const inventoryItems = [
  { id: 1, name: "Syntax Sword", rarity: "rare", type: "equipment", icon: Shield, description: "A blade sharp enough to cut through spaghetti code.", count: 1 },
  { id: 2, name: "Health Potion", rarity: "common", type: "consumable", icon: Beaker, description: "Restores energy after a grueling debugging session.", count: 5 },
  { id: 3, name: "Python Basics Badge", rarity: "uncommon", type: "badge", icon: Sparkles, description: "Earned by completing the Python Basics chapter.", count: 1 },
  { id: 4, name: "Golden Bug", rarity: "legendary", type: "material", icon: Gem, description: "A rare artifact found in legacy systems.", count: 2 },
  { id: 5, name: "Energy Drink", rarity: "common", type: "consumable", icon: Zap, description: "Grants 2x XP for 1 hour.", count: 3 },
  { id: 6, name: "Master's Scroll", rarity: "epic", type: "material", icon: BookOpen, description: "Contains ancient algorithms.", count: 1 },
  { id: 7, name: "Admin Key", rarity: "mythic", type: "key", icon: Key, description: "Unlocks the forbidden database.", count: 1 },
];

const rarityColors: Record<string, string> = {
  common: "text-zinc-400 border-zinc-700 bg-zinc-800 shadow-[0_0_15px_rgba(161,161,170,0.15)]",
  uncommon: "text-emerald-400 border-emerald-700 bg-emerald-950/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]",
  rare: "text-indigo-400 border-indigo-700 bg-indigo-950/50 shadow-[0_0_20px_rgba(99,102,241,0.2)]",
  epic: "text-purple-400 border-purple-700 bg-purple-950/50 shadow-[0_0_25px_rgba(168,85,247,0.3)]",
  legendary: "text-amber-400 border-amber-500 bg-amber-950/60 shadow-[0_0_30px_rgba(251,191,36,0.4)]",
  mythic: "text-rose-500 border-rose-500 bg-rose-950/60 shadow-[0_0_35px_rgba(244,63,94,0.5)]",
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function InventoryPage() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-4"
      >
        <div className="bg-orange-500/20 p-3 rounded-2xl shadow-[0_0_20px_rgba(249,115,22,0.3)]">
          <Backpack className="w-8 h-8 text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
        </div>
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white drop-shadow-md">Your Inventory</h1>
          <p className="text-zinc-400 mt-1">Loot, badges, and items you've collected on your journey.</p>
        </div>
      </motion.div>

      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show" 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 perspective-[1000px]"
      >
        {inventoryItems.map((item) => {
          const Icon = item.icon;
          const rarityStyle = rarityColors[item.rarity];
          const bgClass = rarityStyle.split(' ')[2]; // Extract bg color for the glow
          const glowColor = bgClass.replace('bg-', '');

          return (
            <motion.div key={item.id} variants={itemVariants} whileHover={{ scale: 1.05, y: -5, rotateY: 5 }} className="transform-style-3d">
              <Card className="glass-card h-full p-5 flex flex-col group border-white/10 hover:border-white/30 transition-all duration-300 relative overflow-hidden">
                
                {/* Rarity Glow Background */}
                <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity rounded-full -mr-10 -mt-10 ${bgClass}`} />
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className={`p-4 rounded-xl border ${rarityStyle}`}>
                    <Icon className="w-8 h-8 drop-shadow-lg" />
                  </div>
                  <div className="bg-zinc-900/80 backdrop-blur text-zinc-300 text-xs font-black px-2 py-1 rounded-md border border-white/10 shadow-inner">
                    x{item.count}
                  </div>
                </div>
                
                <div className="relative z-10 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${rarityStyle.split(' ')[0]} drop-shadow-sm`}>
                      {item.rarity}
                    </span>
                    <span className="text-zinc-600 text-[10px] uppercase tracking-wider">•</span>
                    <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
                      {item.type}
                    </span>
                  </div>
                  <h3 className="font-black text-xl text-white mb-2 leading-tight drop-shadow-md">
                    {item.name}
                  </h3>
                  <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {item.type === "consumable" && (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full mt-4">
                    <Button className="w-full bg-white/5 hover:bg-white/10 text-white font-bold border border-white/10 relative z-10 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                      Use Item
                    </Button>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          );
        })}
        
        {/* Empty Slots */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div key={`empty-${i}`} variants={itemVariants}>
            <Card className="bg-zinc-900/30 backdrop-blur-sm border-zinc-800 border-dashed p-5 flex flex-col items-center justify-center min-h-[260px] opacity-50 hover:opacity-100 transition-opacity">
              <div className="w-16 h-16 rounded-xl border-2 border-dashed border-zinc-700 flex items-center justify-center mb-4">
                <span className="text-zinc-700 font-bold text-2xl">?</span>
              </div>
              <p className="text-zinc-600 text-sm font-bold uppercase tracking-widest">Empty Slot</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
