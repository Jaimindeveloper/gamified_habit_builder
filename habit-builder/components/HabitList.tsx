"use client"

import { useHabitStore } from "@/store/useHabitStore"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Circle, Flame, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function HabitList() {
  const { habits, toggleHabit, deleteHabit } = useHabitStore()

  if (habits.length === 0) {
    return (
      <div className="text-center text-zinc-500 py-10">
        No habits yet. Start by adding one above!
      </div>
    )
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="flex flex-col gap-3">
      <AnimatePresence>
        {habits.map((habit) => {
          const isCompletedToday = habit.lastCompleted 
            ? habit.lastCompleted.split('T')[0] === today 
            : false

          return (
            <motion.div
              key={habit.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cn(
                "group flex items-center justify-between p-4 rounded-xl border transition-all duration-300",
                isCompletedToday 
                  ? "bg-indigo-950/30 border-indigo-500/50" 
                  : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
              )}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleHabit(habit.id)}
                  className={cn(
                    "rounded-full transition-colors",
                    isCompletedToday ? "text-indigo-500 hover:text-indigo-400" : "text-zinc-500 hover:text-indigo-400"
                  )}
                >
                  {isCompletedToday ? (
                    <CheckCircle2 className="w-7 h-7" />
                  ) : (
                    <Circle className="w-7 h-7" />
                  )}
                </button>
                <div>
                  <h3 className={cn(
                    "font-medium text-lg transition-colors",
                    isCompletedToday ? "text-indigo-200 line-through opacity-70" : "text-white"
                  )}>
                    {habit.title}
                  </h3>
                  {habit.description && (
                    <p className="text-sm text-zinc-400 mt-0.5">{habit.description}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 bg-zinc-800/50 px-3 py-1 rounded-full border border-zinc-700/50">
                  <Flame className={cn(
                    "w-4 h-4",
                    habit.streak > 0 ? "text-orange-500" : "text-zinc-500"
                  )} />
                  <span className="text-sm font-semibold text-zinc-300">
                    {habit.streak}
                  </span>
                </div>
                <button
                  onClick={() => deleteHabit(habit.id)}
                  className="text-zinc-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete habit"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
