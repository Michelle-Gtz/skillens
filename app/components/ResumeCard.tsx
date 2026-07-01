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
      try {
        const blob = await fs.read(imagePath);
        if (!blob || !isMounted) return;

        objectUrl = URL.createObjectURL(blob);
        setResumeUrl(objectUrl);
      } catch {
        if (isMounted) {
          setResumeUrl("/images/pdf.png");
        }
      }
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
      className="resume-card animate-in fade-in duration-1000 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/6"
    >
      <div className="resume-card-header">
        <div className="flex min-w-0 flex-col gap-1">
          {companyName ? (
            <h2 className="text-base font-semibold break-words text-white">
              <span>{companyName}</span>
            </h2>
          ) : (
            <h2 className="text-base font-semibold break-words text-white">
              <span>Resume</span>
            </h2>
          )}
          {jobTitle && (
            <h3 className="text-xs break-words text-gray-400">{jobTitle}</h3>
          )}
        </div>

        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>

      <div className="gradient-border animate-in fade-in duration-1000 p-2">
        <div className="w-full h-full overflow-hidden rounded-xl">
          <img
            src={resumeUrl || "/images/pdf.png"}
            alt="Resume"
            className="w-full h-[220px] max-sm:h-[180px] object-cover object-top"
          />
        </div>
      </div>
    </Link>
  );
}
