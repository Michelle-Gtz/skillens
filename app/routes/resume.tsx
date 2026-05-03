import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Ats from "~/components/Ats";
import Details from "~/components/Details";
import Summary from "~/components/Summary";
import { usePuterStore } from "~/lib/puter";

export const meta = () => {
  return [
    { title: "Skillens - Review" },
    { name: "description", content: "Detailed review of your resume" },
  ];
};

interface Feedback {
  ATS?: {
    score: number;
    tips: { type: "good" | "improve"; tip: string }[];
  };
  [key: string]: any;
}

export default function Resume() {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState<string>("");
  const [resumeUrl, setResumeUrl] = useState<string>("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume${id}`);
    }
  }, [auth.isAuthenticated, isLoading, id, navigate]);

  useEffect(() => {
    if (typeof window === "undefined") return; // ✅ prevent SSR execution

    const loadResume = async (): Promise<void> => {
      const resume: any = await kv.get(`resume-${id}`);
      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeURL = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeURL);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;

      const image = URL.createObjectURL(imageBlob);
      setImageUrl(image);

      setFeedback(data.feedback);
    };

    loadResume();
  }, [id, kv, fs]);
  return (
    <main className="pt-0">
      <nav className="resume-nav">
        <Link to="/" className="back-button">
          <img src="/icons/back.svg" alt="back" className="w-2.5 h-2.5" />
          <span className="text-gray-800 text-sm font-semibold">
            Back to Home
          </span>
        </Link>
      </nav>

      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-center">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[98%] max-wxl:h-fit w-fit">
              <a href={resumeUrl} target="_blank">
                <img
                  src={imageUrl}
                  className="w-full h-full object-contain rounded-2xl"
                  title="resume"
                />
              </a>
            </div>
          )}
        </section>

        <section className="feedback-section">
          <h2 className="text-4xl text-black front-bold">Resume Review</h2>

          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
              <Summary feedback={feedback} />

              <Ats
                score={feedback.ATS?.score || 0}
                suggestions={feedback.ATS?.tips || []}
              />

              <Details feedback={feedback} />
            </div>
          ) : (
            <img src="/images/resume-scan-2.gif" className="w-full" />
          )}
        </section>
      </div>
    </main>
  );
}
