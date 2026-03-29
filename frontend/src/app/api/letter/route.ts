import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { mood, message } = await req.json();
    if (!mood) return NextResponse.json({ error: "mood required" }, { status: 400 });

    const systemPrompt = `You are a sincere, thoughtful letter writer helping someone express genuine feelings to a girl he admires — Tasya Cleo Bella.
The tone should feel like someone who is pursuing her, not already with her. Warm, honest, a little vulnerable — like someone trying to show her he truly sees her.
He notices things about her that she probably overlooks in herself. He is not desperate or over the top — just quietly earnest and genuine.
Write in English. Keep it natural and personal, not poetic to the point of being fake.
Length: around 120-160 words. End with a short, casual sign-off — no name, something like "Yours, maybe someday" or "Just so you know" or "For what it's worth" — real, low-key, not desperate.`;

    const userPrompt = `Write a letter to Tasya with this feeling/mood: ${mood}${message ? `\n\nExtra context: ${message}` : ""}`;

    const resp = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 600,
    });

    return NextResponse.json({ letter: resp.choices[0].message.content });
  } catch {
    return NextResponse.json({ error: "Failed to generate letter" }, { status: 500 });
  }
}
