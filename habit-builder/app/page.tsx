"use client"

import { useHabitStore } from "@/store/useHabitStore"
import { HabitList } from "@/components/HabitList"
import { HabitForm } from "@/components/HabitForm"
import { AICoach } from "@/components/AICoach"
import { UserDetails } from "@/components/UserDetails"
import { Trophy, Star, Target, Book } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { toast } from "sonner"

export default function Home() {
  const { xp, level } = useHabitStore()
  const [mounted, setMounted] = useState(false)
  const prevLevelRef = useRef(level)

  // Prevent hydration mismatch with Zustand persist
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && level > prevLevelRef.current) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7', '#ec4899', '#f59e0b']
      })
      toast.success(`Level Up! You reached Level ${level}!`, {
        icon: '🏆',
        duration: 5000,
      })
    }
    prevLevelRef.current = level
  }, [level, mounted])

  if (!mounted) return null

  const xpProgress = (xp / (level * 100)) * 100

  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header Section */}
        <header className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent flex items-center gap-2.5">
              <Target className="text-indigo-500 w-7 h-7" />
              HabitForge
            </h1>
            
            <div className="flex items-center gap-3">
              <Link 
                href="/gita"
                className="flex items-center gap-2 bg-orange-900/20 text-orange-400 hover:bg-orange-900/40 px-4 py-2 rounded-full border border-orange-500/20 transition-all text-sm font-medium"
              >
                <Book className="w-4 h-4" />
                Gita Wisdom
              </Link>
              <div className="flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-full border border-zinc-800">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-zinc-200 text-sm">Lvl {level}</span>
              </div>
            </div>
          </div>

          <UserDetails />

          {/* XP Bar */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20" />
            <div className="flex justify-between text-sm mb-3">
              <span className="text-zinc-400 font-medium flex items-center gap-1.5">
                <Star className="w-4 h-4 text-indigo-400" />
                Current Experience
              </span>
              <span className="font-mono text-zinc-300">
                {xp} <span className="text-zinc-500">/ {level * 100} XP</span>
              </span>
            </div>
            <div className="h-3 w-full bg-black rounded-full overflow-hidden border border-zinc-800">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </motion.div>
            </div>
          </div>
        </header>

        {/* AI Coach */}
        <div className="mb-12">
          <AICoach />
        </div>

        {/* Habits Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-zinc-100">Daily Quests</h2>
          </div>
          
          <HabitForm />
          <HabitList />
        </section>
      </div>
    </main>
  )
}
