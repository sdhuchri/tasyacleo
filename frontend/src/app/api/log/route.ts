import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const LOG_FILE = path.join(process.cwd(), "logs", "activity.log");

function ensureLogDir() {
  const dir = path.dirname(LOG_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

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

    ensureLogDir();

    const ip = getClientIP(req).padEnd(16);
    const tag = action.toUpperCase().padEnd(20);
    const line = `[${formatTimestamp()}]  ${ip}  ${tag}  ${detail ?? ""}\n`;

    fs.appendFileSync(LOG_FILE, line, "utf-8");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function GET() {
  try {
    ensureLogDir();
    if (!fs.existsSync(LOG_FILE)) return NextResponse.json({ logs: [] });
    const content = fs.readFileSync(LOG_FILE, "utf-8");
    const logs = content.trim().split("\n").filter(Boolean).reverse();
    return NextResponse.json({ logs });
  } catch {
    return NextResponse.json({ logs: [] });
  }
}
