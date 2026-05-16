"use client"

import { useState } from "react"
import { useHabitStore } from "@/store/useHabitStore"
import { Plus } from "lucide-react"
import { motion } from "framer-motion"

export function HabitForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const addHabit = useHabitStore((state) => state.addHabit)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    addHabit(title, description)
    setTitle("")
    setDescription("")
    setIsOpen(false)
  }

  return (
    <div className="mb-8">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-full p-4 rounded-xl border border-dashed border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Habit
        </button>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex flex-col gap-3"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Habit Title (e.g. Drink Water)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            autoFocus
          />
          <input
            type="text"
            placeholder="Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
          <div className="flex gap-2 justify-end mt-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              Add Habit
            </button>
          </div>
        </motion.form>
      )}
    </div>
  )
}
