import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { useState, useEffect } from "react";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";

export function meta() {
  return [
    { title: "Skillens" },
    { name: "description", content: "Smart Feedback for CVs" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/");
      return;
    }

    let isMounted = true;

    const loadResumes = async () => {
      setLoadingResumes(true);

      try {
        const items = await kv.list("resume:*", true);
        const parsedResumes = (items as any[])
          ?.map((item) => {
            try {
              return typeof item?.value === "string"
                ? (JSON.parse(item.value) as Resume)
                : null;
            } catch {
              return null;
            }
          })
          .filter(Boolean) as Resume[];

        if (isMounted) {
          setResumes(parsedResumes || []);
        }
      } finally {
        if (isMounted) {
          setLoadingResumes(false);
        }
      }
    };

    loadResumes();

    return () => {
      isMounted = false;
    };
  }, [auth.isAuthenticated, kv, navigate]);

  return (
    <main>
      <Navbar />

      <section className="main-section">
        <div className="page-heading">
          <h1 className="text-gradient">
            Track your Applications and Resume Rating
          </h1>
          {!loadingResumes && resumes.length === 0 ? (
            <h2>No resumes found, UPLOAD your resume to get feedback</h2>
          ) : (
            <h2>Review your submissions and check AI powered feedback</h2>
          )}
        </div>
        {loadingResumes && (
          <div className="flex flex-col items-center justify-center gap-4">
            <img
              src="/images/resume-san-2.gif"
              alt="Loading resumes"
              className="w-[200px]"
            />
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {!loadingResumes && resumes.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-8 gap-4">
            <Link to="/upload" className="primary-button w-fit">
              Upload your resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
