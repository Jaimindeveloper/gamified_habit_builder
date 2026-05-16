"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Send, Sparkles, Languages, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

interface GitaResponse {
  shloka_sanskrit: string
  shloka_reference: string
  hindi_translation: string
  english_translation: string
  guidance_hindi: string
  guidance_english: string
}

export default function GitaPage() {
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GitaResponse | null>(null)

  const seekGuidance = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    setLoading(true)
    setResult(null)
    try {
      const response = await fetch('/api/gita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.details || data.error)
      }
      
      setResult(data)
    } catch (error: any) {
      console.error(error)
      alert("Error: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f4e4bc] selection:bg-orange-500/30">
      {/* Navigation */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <Link href="/" className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors group mb-8">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to HabitForge
        </Link>

        {/* Header */}
        <header className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-4"
          >
            <BookOpen className="w-8 h-8 text-orange-500" />
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-yellow-200 to-orange-400 bg-clip-text text-transparent mb-4">
            Shreemad Bhagavad Gita Wisdom
          </h1>
          <p className="text-orange-200/60 max-w-xl mx-auto">
            Seek eternal guidance from the words of Lord Krishna. Ask your life's deepest questions or share your current struggles.
          </p>
        </header>

        {/* Question Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <form onSubmit={seekGuidance} className="relative">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="E.g., I am feeling confused about my career path..."
              className="w-full h-40 bg-zinc-900/50 border border-orange-900/30 rounded-2xl p-6 text-orange-50 outline-none focus:border-orange-500/50 transition-all resize-none placeholder:text-orange-900/40"
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="absolute bottom-4 right-4 bg-orange-600 hover:bg-orange-500 text-white px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all disabled:opacity-50 disabled:grayscale"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Seek Guidance
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto space-y-8 pb-20"
            >
              {/* Shloka Card */}
              <div className="bg-gradient-to-b from-orange-900/20 to-transparent border border-orange-500/20 rounded-3xl p-8 text-center relative overflow-hidden">
                <Sparkles className="absolute top-4 right-4 text-orange-500/20 w-8 h-8" />
                <span className="text-orange-500/60 font-mono text-sm mb-4 block tracking-widest">
                  {result.shloka_reference}
                </span>
                <h2 className="text-2xl md:text-3xl font-serif italic mb-6 leading-relaxed">
                  {result.shloka_sanskrit}
                </h2>
                <div className="h-px w-24 bg-orange-500/30 mx-auto mb-6" />
                
                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div className="space-y-3">
                    <span className="text-xs uppercase tracking-tighter text-orange-500/40 font-bold">Hindi Translation</span>
                    <p className="text-orange-100/90 leading-relaxed">{result.hindi_translation}</p>
                  </div>
                  <div className="space-y-3">
                    <span className="text-xs uppercase tracking-tighter text-orange-500/40 font-bold">English Translation</span>
                    <p className="text-orange-100/90 leading-relaxed">{result.english_translation}</p>
                  </div>
                </div>
              </div>

              {/* Guidance Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-zinc-900/40 border border-orange-900/20 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4 text-orange-400">
                    <Languages className="w-4 h-4" />
                    <span className="text-sm font-bold uppercase tracking-widest">मार्गदर्शन (Hindi)</span>
                  </div>
                  <p className="text-orange-100/80 leading-relaxed">
                    {result.guidance_hindi}
                  </p>
                </div>
                <div className="bg-zinc-900/40 border border-orange-900/20 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4 text-orange-400">
                    <Languages className="w-4 h-4" />
                    <span className="text-sm font-bold uppercase tracking-widest">Guidance (English)</span>
                  </div>
                  <p className="text-orange-100/80 leading-relaxed">
                    {result.guidance_english}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background patterns */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#f4e4bc_1px,_transparent_1px)] bg-[length:40px_40px]" />
      </div>
    </main>
  )
}
