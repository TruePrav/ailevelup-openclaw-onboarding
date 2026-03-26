import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Simple in-memory rate limiter: max 5 submissions per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function getIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// Max payload size: 50KB
const MAX_BODY_BYTES = 50 * 1024;

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = getIp(request);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  // Size check
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength) > MAX_BODY_BYTES) {
    return NextResponse.json(
      { success: false, error: "Payload too large." },
      { status: 413 }
    );
  }

  try {
    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, error: "Payload too large." },
        { status: 413 }
      );
    }

    let data: Record<string, unknown>;
    try {
      data = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const name = (typeof data.q1_name === "string" ? data.q1_name : "unknown")
      .replace(/[^a-zA-Z0-9]/g, "_")
      .toLowerCase();
    const filename = `${timestamp}-${name}.json`;

    // Save JSON file (fallback/backup)
    const submissionsDir = path.join(process.cwd(), "data", "submissions");
    await mkdir(submissionsDir, { recursive: true });
    const filePath = path.join(submissionsDir, filename);
    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

    // Save to Supabase
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { error: supabaseError } = await supabase.from("onboarding_submissions").insert({
      q1_name: data.q1_name,
      q2_messaging_app: data.q2_messaging_app,
      q2_messaging_other: data.q2_messaging_other,
      q3_phone: data.q3_phone,
      q4_timezone: data.q4_timezone,
      q5_active_hours: data.q5_active_hours,
      q6_work: data.q6_work,
      q7_projects: data.q7_projects,
      q8_weekday: data.q8_weekday,
      q9_goal1: data.q9_goal1,
      q9_goal2: data.q9_goal2,
      q9_goal3: data.q9_goal3,
      q10_capabilities: data.q10_capabilities,
      q10_other_text: data.q10_other_text,
      q11_top_priority: data.q11_top_priority,
      q12_communication: data.q12_communication,
      q12_depends_text: data.q12_depends_text,
      q13_never_do: data.q13_never_do,
      q14_tone: data.q14_tone,
      q15_agent_name: data.q15_agent_name,
      q16_integrations: data.q16_integrations,
      q17_monitoring: data.q17_monitoring,
      q18_private: data.q18_private,
      q19_access: data.q19_access,
      q19_other_text: data.q19_other_text,
      q20_proactive: data.q20_proactive,
      q21_word1: data.q21_word1,
      q21_word2: data.q21_word2,
      q21_word3: data.q21_word3,
      q22_motivation: data.q22_motivation,
      q23_time_waster: data.q23_time_waster,
      q24_anything_else: data.q24_anything_else,
      raw_data: data,
    });

    if (supabaseError) {
      console.error("Supabase insert error:", supabaseError);
    } else {
      console.log(`Supabase: saved submission for ${data.q1_name}`);
    }

    console.log(`New submission: ${data.q1_name} at ${new Date().toISOString()}`);

    return NextResponse.json({ success: true, filename });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save submission" },
      { status: 500 }
    );
  }
}
