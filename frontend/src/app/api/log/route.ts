import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const LOG_KEY = "tasyacleo:logs";
const MAX_LOGS = 500;

function formatTimestamp() {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

function getClientIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  try {
    const { action, detail } = await req.json();
    if (!action) return NextResponse.json({ ok: false }, { status: 400 });

    const ip = getClientIP(req).padEnd(16);
    const tag = action.toUpperCase().padEnd(20);
    const line = `[${formatTimestamp()}]  ${ip}  ${tag}  ${detail ?? ""}`;

    await redis.lpush(LOG_KEY, line);
    await redis.ltrim(LOG_KEY, 0, MAX_LOGS - 1);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function GET() {
  try {
    const logs = await redis.lrange(LOG_KEY, 0, MAX_LOGS - 1);
    return NextResponse.json({ logs });
  } catch {
    return NextResponse.json({ logs: [] });
  }
}
