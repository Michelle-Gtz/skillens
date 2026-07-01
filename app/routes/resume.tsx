import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import Ats from "~/components/Ats";
import Details from "~/components/Details";
import Summary from "~/components/Summary";
import { usePuterStore } from "~/lib/puter";
import { normalizeFeedback } from "~/lib/utils";

export const meta = () => {
  return [
    { title: "Skillens - Review" },
    { name: "description", content: "Detailed review of your resume" },
  ];
};

interface Feedback {
  overallScore: number;
  toneAndStyle: {
    score: number;
  };
  content: {
    score: number;
  };
  structure: {
    score: number;
  };
  skills: {
    score: number;
  };
  ATS?: {
    score: number;
    tips: { type: "good" | "improve"; tip: string }[];
  };
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
      navigate(`/auth?next=/resume/${id}`);
    }
  }, [auth.isAuthenticated, isLoading, id, navigate]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!id) return;

    const loadResume = async (): Promise<void> => {
      const resume: any = await kv.get(`resume-${id}`);
      if (!resume) return;

      const data = JSON.parse(resume);
      const normalizedFeedback = normalizeFeedback(data.feedback ?? data);
      console.debug(
        "Loaded resume data:",
        data,
        "Normalized feedback:",
        normalizedFeedback,
      );

      let resumeBlob;
      try {
        resumeBlob = await fs.read(data.resumePath);
      } catch {
        resumeBlob = null;
      }
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeURL = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeURL);

      let imageBlob;
      try {
        imageBlob = await fs.read(data.imagePath);
      } catch {
        imageBlob = null;
      }
      if (!imageBlob) return;

      const image = URL.createObjectURL(imageBlob);
      setImageUrl(image);

      setFeedback(normalizedFeedback ?? data.feedback ?? null);
    };

    loadResume();
  }, [id, kv, fs]);

  return (
    <main className="pt-0 pb-8">
      <nav className="resume-nav max-w-7xl mx-auto">
        <Link
          to="/"
          className="back-button transition-colors duration-200 hover:bg-white/6 hover:border-white/20"
        >
          <ArrowLeft className="h-4 w-4 text-gray-100" />
          <span className="text-gray-200 text-sm font-semibold">
            Back to Home
          </span>
        </Link>
      </nav>

      <div className="mx-auto flex w-full max-w-7xl flex-row gap-6 px-4 py-4 max-lg:flex-col-reverse lg:px-6">
        <section className="feedback-section h-[100vh] sticky top-4 items-center justify-center rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(124,140,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(244,114,182,0.12),transparent_25%),linear-gradient(180deg,#0b0f19_0%,#111827_100%)] p-4 max-lg:sticky max-lg:top-0 max-lg:h-auto">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border h-full w-full max-w-2xl rounded-3xl p-1">
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

        <section className="feedback-section max-w-3xl">
          <div className="flex flex-col gap-1">
            <p className="text-sm uppercase tracking-[0.2em] text-[#9ba7ff]">
              Resume review
            </p>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              ATS-focused feedback dashboard
            </h2>
            <p className="text-sm text-gray-300">
              Concise, professional insights for quick decision-making.
            </p>
          </div>

          {feedback ? (
            <div className="flex flex-col gap-4 animate-in fade-in duration-1000">
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
