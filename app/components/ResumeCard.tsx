import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";

export default function ResumeCard({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) {
  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-in fade-in duration-1000"
    >
      {/* HEADER */}
      <div className="resume-card-header">
        <div className="flex flex-col gap-1">
          <h2 className="font-bold break-words">{companyName}</h2>
          <h3 className="text-sm break-words text-gray-500">{jobTitle}</h3>
        </div>

        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>

      {/* IMAGE */}
      <div className="gradient-border animate-in fade-in duration-1000">
        <div className="w-full h-full">
          <img
            src={imagePath}
            alt="Resume"
            className="w-full h-[260px] max-sm:h-[200px] object-cover object-top"
          />
        </div>
      </div>
    </Link>
  );
}
