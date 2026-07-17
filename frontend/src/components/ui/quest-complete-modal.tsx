"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, ArrowRight } from "lucide-react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

interface QuestCompleteModalProps {
  isOpen: boolean;
  xpEarned: number;
  coinsEarned: number;
  levelUp: boolean;
  onContinue: () => void;
}

export function QuestCompleteModal({
  isOpen,
  xpEarned,
  coinsEarned,
  levelUp,
  onContinue
}: QuestCompleteModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-zinc-950 border border-rose-500/30 rounded-3xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(225,29,72,0.2)] overflow-hidden"
          >
            {/* Background effects */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-rose-600/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-600/30 rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-rose-400 to-indigo-500 p-4 rounded-full mb-6"
              >
                <Trophy className="w-12 h-12 text-white" />
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-500 mb-2"
              >
                QUEST COMPLETE!
              </motion.h2>
              
              {levelUp && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-6"
                >
                  Level Up!
                </motion.div>
              )}
              
              <div className="grid grid-cols-2 gap-4 w-full mb-8 mt-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 flex flex-col items-center"
                >
                  <Star className="w-6 h-6 text-indigo-400 mb-2" />
                  <span className="text-2xl font-bold text-white">+{xpEarned}</span>
                  <span className="text-zinc-500 text-sm uppercase tracking-wider font-bold">XP</span>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 flex flex-col items-center"
                >
                  <div className="w-6 h-6 rounded-full bg-yellow-500 mb-2 flex items-center justify-center text-black font-bold text-xs">$</div>
                  <span className="text-2xl font-bold text-white">+{coinsEarned}</span>
                  <span className="text-zinc-500 text-sm uppercase tracking-wider font-bold">Coins</span>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="w-full"
              >
                <Button 
                  onClick={onContinue}
                  className="w-full h-14 bg-white text-black hover:bg-zinc-200 text-lg font-bold group"
                >
                  Continue Journey
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
