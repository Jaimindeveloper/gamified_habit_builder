"use client"

import { useState } from "react"
import { useHabitStore } from "@/store/useHabitStore"
import { Sparkles, Bot } from "lucide-react"
import { motion } from "framer-motion"

export function AICoach() {
  const { habits, xp, level, userName, mood } = useHabitStore()
  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const getMotivation = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/coach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ habits, xp, level, userName, mood }),
      })

      const data = await response.json()
      if (data.message) {
        setMessage(data.message)
      } else {
        setMessage("Oops, my circuits are a bit crossed right now. Keep up the good work though!")
      }
    } catch (error) {
      setMessage("I couldn't reach the coaching servers. You're doing great anyway!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-3xl" />
      
      <div className="flex items-start gap-4 relative z-10">
        <div className="bg-indigo-600 p-3 rounded-xl">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-indigo-100 flex items-center gap-2">
            AI Habit Coach
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </h2>
          
          <div className="mt-3">
            {message ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-indigo-200 text-sm leading-relaxed bg-indigo-900/40 p-4 rounded-xl border border-indigo-500/20"
              >
                {message}
              </motion.div>
            ) : (
              <p className="text-indigo-300/80 text-sm">
                Need a boost? Ask your AI coach for motivation based on your current progress.
              </p>
            )}
          </div>

          <button
            onClick={getMotivation}
            disabled={isLoading}
            className="mt-4 flex items-center justify-center w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                Thinking...
              </span>
            ) : (
              "Get Motivation"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
