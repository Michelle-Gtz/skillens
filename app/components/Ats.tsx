import React from "react";

interface Props {
  score: number;
  suggestions: { type: "good" | "improve"; tip: string }[];
}
export default function Ats({ score, suggestions }: Props) {
  return <div>ATS</div>;
}
