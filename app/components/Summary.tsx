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
        <div className="flex flex-col gap-2 items-start justify-center">
          <p className="text-2xl">{title}</p>
          <ScoreBadge score={score} />
        </div>
      </div>
      <p className="text-2xl">
        <span className={textColor}>{score}%</span>
      </p>
    </div>
  );
};

export default function Summary({ feedback }: Props) {
  return (
    <div className="resume-card w-full">
      <div className="flex flex-row items-center p-4 gap-8">
        <ScoreGauge score={feedback?.overallScore ?? 0} />

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Your Resume Score</h2>
          <p>This score is calculated based on the variables listed below.</p>
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
