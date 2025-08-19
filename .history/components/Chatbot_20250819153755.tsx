export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// ---- Config ----
const DEFAULT_MODEL = "gpt-4o-mini";
const FALLBACK_MODELS = ["gpt-4o"];

const MAX_TOKENS = 2000 as const;
const TEMPERATURE = 0.7 as const;
const TOP_P = 0.9 as const;
const FREQ_PENALTY = 0.1 as const;
const PRES_PENALTY = 0.1 as const;

const MAX_HISTORY = 15;

// ---- OpenAI Client ----
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// ---- Types ----
type Role = "system" | "user" | "assistant";

interface Message {
  role: Role;
  content: string;
}

// ---- Helper: sanitize message history ----
function sanitizeHistory(history: unknown): Message[] {
  if (!Array.isArray(history)) return [];
  return history
    .filter(
      (m: any) =>
        m &&
        ["system", "user", "assistant"].includes(m.role) &&
        typeof m.content === "string"
    )
    .slice(-MAX_HISTORY)
    .map((m: any) => ({
      role: m.role as Role,
      content: String(m.content).slice(0, 8000),
    }));
}

// ---- System prompt ----
const systemPrompt: Message = {
  role: "system",
  content:
    "You are Augustine's AI assistant. Be concise, helpful, honest, and proactive. Keep answers focused and avoid fluff.",
};

// ---- Core: Chat with fallback models ----
async function chatWithFallback(
  messages: Message[],
  models: string[],
  signal?: AbortSignal
) {
  let lastError: unknown;
  for (const model of models) {
    try {
      const completion = await openai.chat.completions.create(
        {
          model,
          messages,
          max_tokens: MAX_TOKENS,
          temperature: TEMPERATURE,
          top_p: TOP_P,
          frequency_penalty: FREQ_PENALTY,
          presence_penalty: PRES_PENALTY,
        },
        { signal }
      );
      return { completion, usedModel: model };
    } catch (err: any) {
      lastError = err;
    }
  }
  throw lastError;
}

// ---- POST /api/chat ----
export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const history = sanitizeHistory(body?.history);

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const messages: Message[] = [systemPrompt, ...history, { role: "user", content: message }];

    const requestedModel =
      typeof body?.model === "string" && body.model.length > 0
        ? body.model
        : DEFAULT_MODEL;

    const modelList = [requestedModel, ...FALLBACK_MODELS.filter((m) => m !== requestedModel)];

    const { completion, usedModel } = await chatWithFallback(messages, modelList, req.signal);

    const aiMessage = completion.choices?.[0]?.message?.content?.trim() ||
      "Sorry, I couldn't generate a response.";

    return NextResponse.json({
      message: aiMessage,
      model: usedModel,
      usage: completion.usage ?? null,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    const status = error?.status ?? 500;
    const code =
      error?.code ||
      (status === 401 && "invalid_api_key") ||
      (status === 429 && "rate_limited") ||
      (status === 402 && "quota_exceeded") ||
      (status === 404 && "model_not_found") ||
      "server_error";

    return NextResponse.json(
      { error: error?.message || "Unknown server error", code, status },
      { status }
    );
  }
}

// ---- GET /api/chat (health check) ----
export async function GET() {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { status: "error", message: "OPENAI_API_KEY not configured" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    status: "ok",
    defaultModel: DEFAULT_MODEL,
    fallbacks: FALLBACK_MODELS,
    timestamp: new Date().toISOString(),
  });
}
