import React from "react";
import ScoreBadge from "./ScoreBadge";
import ScoreGauge from "./ScoreGauge";

interface Props {
  feedback: any;
}

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 70
      ? "text-[var(--color-badge-green-text)]"
      : score > 49
        ? "text-[var(--color-badge-yellow-text)]"
        : "text-[var(--color-badge-red-text)]";

  return (
    <div className="resume-summary">
      <div className="category">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-100">{title}</p>
          <ScoreBadge score={score} />
        </div>
        <p className="text-sm font-semibold">
          <span className={textColor}>{score}%</span>
        </p>
      </div>
    </div>
  );
};

export default function Summary({ feedback }: Props) {
  return (
    <div className="resume-card w-full max-w-none p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <ScoreGauge score={feedback?.overallScore ?? 0} />

        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-white">
            Your Resume Score
          </h2>
          <p className="text-sm text-gray-300">
            This score is calculated from the main ATS and content signals
            below.
          </p>
        </div>
      </div>

      <Category
        title="Tone & Style"
        score={feedback?.toneAndStyle?.score ?? 0}
      />

      <Category title="Content" score={feedback?.content?.score ?? 0} />

      <Category title="Structure" score={feedback?.structure?.score ?? 0} />

      <Category title="Skills" score={feedback?.skills?.score ?? 0} />
    </div>
  );
}
