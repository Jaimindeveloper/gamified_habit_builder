import { NextRequest, NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai"

export async function POST(req: NextRequest) {
  try {
    const { habits, xp, level, userName, mood } = await req.json()

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing in environment variables");
      return NextResponse.json(
        { error: "Configuration Error", details: "Gemini API Key is missing. Please add GEMINI_API_KEY to your environment variables." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey })

    const prompt = `
      You are an AI Habit Coach for a gamified habit tracking app.
      The user's name is ${userName || "User"}.
      The user is currently feeling ${mood || "neutral"}.
      The user is currently Level ${level} with ${xp} XP.
      Here are their current habits and streaks:
      ${JSON.stringify(habits)}
      
      Provide a short, motivating message (2-3 sentences max) to encourage them, addressing them by their name if provided. 
      Incorporate their current mood into your advice. 
      Acknowledge their level, streaks, or suggest a tiny related habit they could add. 
      Keep the tone enthusiastic, supportive, and slightly playful.
    `

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    })

    return NextResponse.json({ message: response.text })
  } catch (error) {
    console.error("Gemini API Error:", error)
    return NextResponse.json(
      { error: "Failed to generate motivation" },
      { status: 500 }
    )
  }
}
