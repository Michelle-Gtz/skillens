import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  // Determine the appropriate unit by calculating the log
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // Format with 2 decimal places and round
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export const generateUUID = () => crypto.randomUUID();

const asNumber = (value: unknown) => {
  const numericValue = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numericValue) ? numericValue : 0;
};

const normalizeTips = (tips: unknown) => {
  if (!Array.isArray(tips)) return [];

  return tips
    .filter(
      (tip): tip is Record<string, unknown> => !!tip && typeof tip === "object",
    )
    .map((tip) => ({
      type: tip.type === "good" ? "good" : "improve",
      tip: typeof tip.tip === "string" ? tip.tip : "",
      explanation:
        typeof tip.explanation === "string" ? tip.explanation : undefined,
    }))
    .filter((tip) => tip.tip.length > 0);
};

export function normalizeFeedback(raw: unknown) {
  let payload = raw;

  if (typeof payload === "string") {
    const cleaned = payload
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const jsonStart = cleaned.indexOf("{");
    const jsonEnd = cleaned.lastIndexOf("}");

    payload =
      jsonStart >= 0 && jsonEnd > jsonStart
        ? cleaned.slice(jsonStart, jsonEnd + 1)
        : cleaned;
  }

  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch {
      return null;
    }
  }

  if (!payload || typeof payload !== "object") return null;

  const candidate =
    "feedback" in payload && typeof payload.feedback === "object"
      ? (payload.feedback as Record<string, any>)
      : (payload as Record<string, any>);

  return {
    overallScore: asNumber(candidate.overallScore ?? candidate.overall_score),
    ATS: {
      score: asNumber(candidate.ATS?.score ?? candidate.ats?.score),
      tips: normalizeTips(candidate.ATS?.tips ?? candidate.ats?.tips),
    },
    toneAndStyle: {
      score: asNumber(
        candidate.toneAndStyle?.score ?? candidate.tone_and_style?.score,
      ),
      tips: normalizeTips(
        candidate.toneAndStyle?.tips ?? candidate.tone_and_style?.tips,
      ),
    },
    content: {
      score: asNumber(candidate.content?.score),
      tips: normalizeTips(candidate.content?.tips),
    },
    structure: {
      score: asNumber(candidate.structure?.score),
      tips: normalizeTips(candidate.structure?.tips),
    },
    skills: {
      score: asNumber(candidate.skills?.score),
      tips: normalizeTips(candidate.skills?.tips),
    },
  };
}
