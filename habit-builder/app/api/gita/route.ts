import { NextRequest, NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai"
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json()

    if (!question) {
      return NextResponse.json({ error: "Please ask a question" }, { status: 400 })
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' })

    let pdfContext = null;
    try {
      const pdfPath = path.join(process.cwd(), 'public', 'gita.pdf');
      const pdfBuffer = fs.readFileSync(pdfPath);
      const base64Data = pdfBuffer.toString('base64');
      
      pdfContext = {
        inlineData: {
          data: base64Data,
          mimeType: "application/pdf"
        }
      };
    } catch (e) {
      console.warn("Could not load gita.pdf from public folder. Proceeding without PDF context.", e);
    }

    const prompt = `
      You are a profound scholar and spiritual guide of the Shreemad Bhagavad Gita.
      A user has approached you with this question/problem: "${question}"
      
      Use the attached Bhagavad Gita PDF document (if available) to identify the most relevant Shloka from the Bhagavad Gita that addresses this issue.
      
      Respond STRICTLY in the following JSON format:
      {
        "shloka_sanskrit": "The Sanskrit text of the Shloka",
        "shloka_reference": "Chapter and Verse number (e.g., Chapter 2, Verse 47)",
        "hindi_translation": "The Hindi translation of the Shloka",
        "english_translation": "The English translation of the Shloka",
        "guidance_hindi": "A short, compassionate explanation in Hindi on how this applies to the user's situation",
        "guidance_english": "A short, compassionate explanation in English on how this applies to the user's situation"
      }
    `

    const contents = pdfContext ? [{
      role: "user",
      parts: [
        pdfContext,
        { text: prompt }
      ]
    }] : prompt;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents as any,
      config: {
        responseMimeType: "application/json"
      }
    })

    let responseText = response.text || "{}";
    
    // Robustly clean up potential markdown formatting from the response
    responseText = responseText.trim();
    if (responseText.startsWith('```')) {
      // Remove starting ```json or ```
      responseText = responseText.replace(/^```[a-z]*\s*/i, '');
      // Remove trailing ```
      responseText = responseText.replace(/\s*```$/, '');
    }

    const result = JSON.parse(responseText.trim())
    return NextResponse.json(result)
  } catch (error: any) {
    console.error("Gita API Error:", error)
    return NextResponse.json(
      { error: "Failed to fetch spiritual guidance", details: error.message || error.toString() },
      { status: 500 }
    )
  }
}
