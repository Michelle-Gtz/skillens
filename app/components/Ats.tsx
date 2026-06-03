import React from "react";

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface Props {
  score: number;
  suggestions: Suggestion[];
}

export default function Ats({ score, suggestions }: Props) {
  const toneClass =
    score > 69
      ? "from-emerald-500/10 to-[var(--color-surface)] border-emerald-400/20"
      : score > 49
        ? "from-amber-400/10 to-[var(--color-surface)] border-amber-400/20"
        : "from-rose-500/10 to-[var(--color-surface)] border-rose-400/20";

  return (
    <div
      className={`rounded-2xl border bg-gradient-to-r ${toneClass} p-4 shadow-[0_18px_40px_rgba(15,23,42,0.35)]`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">ATS Score</h3>
        <div className="text-2xl font-bold">{score}%</div>
      </div>

      <ul className="mt-3 space-y-2">
        {suggestions.map((s, idx) => (
          <li key={idx} className="flex gap-3 items-start">
            <span
              className={
                "mt-1 w-3 h-3 rounded-full " +
                (s.type === "good" ? "bg-emerald-400" : "bg-rose-400")
              }
            />
            <p
              className={
                s.type === "good" ? "text-emerald-100" : "text-rose-100"
              }
            >
              {s.tip}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
