import React from "react";
import ScoreGauge from "./ScoreGauge";

interface Props {
  feedback: any; // ✅ allow dynamic shape (prevents TS mismatch issues)
}

const Category = ({ title, score }: { title: string; score: number }) => {
  return (
    <div className="resume-summary">
      {title} - {score}
    </div>
  );
};

export default function Summary({ feedback }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full">
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
