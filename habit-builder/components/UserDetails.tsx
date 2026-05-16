"use client"

import { useHabitStore } from "@/store/useHabitStore"
import { useState, useMemo } from "react"
import { Sparkles, Clover, User } from "lucide-react"
import { motion } from "framer-motion"

const MOODS = ["😊 Happy", "🚀 Motivated", "🧘 Calm", "😴 Tired", "💪 Energized", "🤔 Reflective"];

export function UserDetails() {
  const { userName, setUserName, mood, setMood, level, xp } = useHabitStore()
  const [isEditingName, setIsEditingName] = useState(false)
  const [nameInput, setNameInput] = useState("")

  // Generate a daily luck percentage deterministically based on username and date
  const dailyLuck = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]
    const seedString = (userName || "guest") + today
    let hash = 0;
    for (let i = 0; i < seedString.length; i++) {
      hash = (hash << 5) - hash + seedString.charCodeAt(i);
      hash |= 0; 
    }
    // Convert to a percentage between 40 and 100 (everyone deserves an okay day!)
    return 40 + (Math.abs(hash) % 61)
  }, [userName])

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* User Info & Mood */}
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-14 h-14 bg-indigo-500/20 border border-indigo-500/30 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-indigo-400" />
        </div>
        
        <div>
          {isEditingName ? (
            <div className="flex items-center gap-2 mb-1">
              <input 
                type="text" 
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter your name..."
                className="bg-black border border-zinc-700 text-white px-3 py-1 text-sm rounded-lg outline-none focus:ring-1 focus:ring-indigo-500"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setUserName(nameInput);
                    setIsEditingName(false);
                  }
                }}
              />
              <button 
                onClick={() => {
                  setUserName(nameInput);
                  setIsEditingName(false);
                }}
                className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
              >
                Save
              </button>
            </div>
          ) : (
            <div 
              className="text-xl font-bold text-white cursor-pointer hover:text-indigo-300 transition-colors flex items-center gap-2"
              onClick={() => {
                setNameInput(userName);
                setIsEditingName(true);
              }}
              title="Click to edit name"
            >
              {userName ? userName : "Set your name..."}
            </div>
          )}
          
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Mood:</span>
            <select 
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="bg-black border border-zinc-800 text-zinc-300 text-sm rounded-md px-2 py-0.5 outline-none focus:border-indigo-500 transition-colors cursor-pointer"
            >
              {MOODS.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Luck Stat */}
      <div className="flex items-center gap-4 bg-black/40 px-5 py-3 rounded-xl border border-zinc-800/50 relative z-10 w-full sm:w-auto">
        <div className="flex flex-col">
          <span className="text-xs text-zinc-400 font-medium mb-1 flex items-center gap-1.5">
            <Clover className="w-3.5 h-3.5 text-emerald-400" />
            Today's Luck
          </span>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              {dailyLuck}%
            </span>
            {dailyLuck >= 90 && (
              <motion.span 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs font-semibold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-md mb-1"
              >
                Amazing!
              </motion.span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
