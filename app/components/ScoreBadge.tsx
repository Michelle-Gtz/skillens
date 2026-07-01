import React from "react";

type ScoreBadgeProps = {
  score: number;
};

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let bgVar = "var(--color-badge-red)";
  let textVar = "var(--color-badge-red-text)";
  let label = "Needs Work";

  if (score > 70) {
    bgVar = "var(--color-badge-green)";
    textVar = "var(--color-badge-green-text)";
    label = "Strong";
  } else if (score > 49) {
    bgVar = "var(--color-badge-yellow)";
    textVar = "var(--color-badge-yellow-text)";
    label = "Good Start";
  }

  return (
    <div
      className="score-badge inline-flex items-center px-3 py-1"
      style={{ background: bgVar }}
    >
      <p
        className="text-[10px] font-semibold uppercase tracking-[0.16em]"
        style={{ color: textVar }}
      >
        {label}
      </p>
    </div>
  );
};

export default ScoreBadge;
