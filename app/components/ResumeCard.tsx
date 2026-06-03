import { Link } from "react-router";
import { useEffect, useState } from "react";
import ScoreCircle from "./ScoreCircle";
import { usePuterStore } from "~/lib/puter";

export default function ResumeCard({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    let isMounted = true;
    let objectUrl = "";

    const loadResumeImage = async () => {
      const blob = await fs.read(imagePath);
      if (!blob || !isMounted) return;

      objectUrl = URL.createObjectURL(blob);
      setResumeUrl(objectUrl);
    };

    loadResumeImage();

    return () => {
      isMounted = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [fs, imagePath]);

  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-1">
          {companyName ? (
            <h2 className="font-bold break-words">
              <span>{companyName}</span>
            </h2>
          ) : (
            <h2 className="font-bold break-words">
              <span>Resume</span>
            </h2>
          )}
          {jobTitle && (
            <h3 className="text-sm break-words text-gray-500">{jobTitle}</h3>
          )}
        </div>

        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>

      <div className="gradient-border animate-in fade-in duration-1000">
        <div className="w-full h-full">
          <img
            src={resumeUrl}
            alt="Resume"
            className="w-full h-[260px] max-sm:h-[200px] object-cover object-top"
          />
        </div>
      </div>
    </Link>
  );
}
