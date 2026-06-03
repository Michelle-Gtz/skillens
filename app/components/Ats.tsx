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
  const fromClass =
    score > 69
      ? "from-green-100"
      : score > 49
        ? "from-yellow-100"
        : "from-red-100";

  return (
    <div
      className={`bg-gradient-to-r ${fromClass} to-[var(--color-surface)] p-4 rounded-2xl shadow-md`}
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
                (s.type === "good" ? "bg-green-600" : "bg-red-600")
              }
            />
            <p
              className={s.type === "good" ? "text-green-800" : "text-red-800"}
            >
              {s.tip}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
