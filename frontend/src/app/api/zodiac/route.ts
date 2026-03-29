import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function getZodiacSign(dateStr: string): { sign: string; element: string; emoji: string } {
  const date = new Date(dateStr);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { sign: "Aries", element: "Api", emoji: "♈" };
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { sign: "Taurus", element: "Tanah", emoji: "♉" };
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { sign: "Gemini", element: "Udara", emoji: "♊" };
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { sign: "Cancer", element: "Air", emoji: "♋" };
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { sign: "Leo", element: "Api", emoji: "♌" };
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { sign: "Virgo", element: "Tanah", emoji: "♍" };
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { sign: "Libra", element: "Udara", emoji: "♎" };
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { sign: "Scorpio", element: "Air", emoji: "♏" };
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { sign: "Sagittarius", element: "Api", emoji: "♐" };
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { sign: "Capricorn", element: "Tanah", emoji: "♑" };
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { sign: "Aquarius", element: "Udara", emoji: "♒" };
  return { sign: "Pisces", element: "Air", emoji: "♓" };
}

export async function POST(req: NextRequest) {
  try {
    const { birthdate } = await req.json();
    if (!birthdate) return NextResponse.json({ error: "birthdate required" }, { status: 400 });

    const { sign, element, emoji } = getZodiacSign(birthdate);
    const today = new Date().toLocaleDateString("id-ID");

    const prompt = `Create a personality card for ${sign} (element: ${element}). Today: ${today}

Respond ONLY with valid JSON, no markdown, no emoji anywhere:
{
  "personality": "2-3 sentence personality description, personal and positive, in English",
  "strengths": ["strength 1", "strength 2", "strength 3", "strength 4"],
  "affirmation": "a beautiful daily affirmation in English",
  "color": "lucky color name",
  "luckToday": "today's energy reading, specific and meaningful, in English"
}`;

    const resp = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Kamu adalah ahli astrologi yang memberikan reading positif. Selalu respond dengan JSON valid saja, tanpa markdown." },
        { role: "user", content: prompt },
      ],
      max_tokens: 600,
      response_format: { type: "json_object" },
    });

    const raw = resp.choices[0].message.content ?? "{}";
    const ai = JSON.parse(raw);

    return NextResponse.json({
      sign, element, emoji,
      personality: ai.personality ?? "",
      strengths: ai.strengths ?? [],
      affirmation: ai.affirmation ?? "",
      color: ai.color ?? "",
      luckToday: ai.luckToday ?? "",
    });
  } catch {
    return NextResponse.json({ error: "Failed to generate reading" }, { status: 500 });
  }
}
