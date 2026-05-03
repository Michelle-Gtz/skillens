import Navbar from "~/components/Navbar";
import { useState, type FormEvent } from "react";
import FileUploader from "~/components/FileUploader";
import { convertPdfToImage } from "~/lib/convertPdfToImage";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";
import ky from "ky";

export default function Upload() {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setisProcessing] = useState(false);
  const [statusText, setstatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAanalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setisProcessing(true);
    setstatusText("Analyzing your resume...");

    const uploadedFile = await fs.upload([file]);

    if (!uploadedFile) return setstatusText("Failed to upload file");

    setstatusText("Converting to image...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file) return setstatusText("Failed to convert pdf to image");

    setstatusText("Uploading image...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setstatusText("Failed to upload image");

    setstatusText("Generating feedback...");

    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setstatusText("Analyzing your resume...");

    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({
        jobTitle,
        jobDescription,
        AIResponseFormat: "JSON",
      }),
    );
    if (!feedback) return setstatusText("Failed to generate feedback");

    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    console.log(data);
    navigate(`/resume/${uuid}`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formDaat = new FormData(form);

    const companyName = formDaat.get("company-name") as string;
    const jobTitle = formDaat.get("job-title") as string;
    const jobDescription = formDaat.get("job-description") as string;

    if (!file) return;

    handleAanalyze({ companyName, jobTitle, jobDescription, file });

    if (!file) {
      setstatusText("Please upload your resume");
      return;
    }

    setisProcessing(true);
    setstatusText("Analyzing your resume...");

    setTimeout(() => {
      setstatusText("Optimizing feedback...");
    }, 1500);

    setTimeout(() => {
      setisProcessing(false);
    }, 3000);
  };

  return (
    <main>
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-12 md:py-16">
          <div className="w-full max-w-2xl mx-auto px-4">
            {/* HEADER */}
            <div className="text-center space-y-3">
              <h1 className="text-gradient p-2 md:p-4">
                Smart feedback for your resume
              </h1>

              {isProcessing ? (
                <div className="space-y-3">
                  <p className="text-gray-500 text-sm">{statusText}</p>
                  <img
                    src="/images/resume-scan.gif"
                    className="w-full max-w-md mx-auto"
                  />
                </div>
              ) : (
                <h2 className="px-2 md:px-4 text-sm md:text-base text-dark-200">
                  Upload your resume for an ATS score and improvement tips.
                </h2>
              )}
            </div>

            {/* FORM */}
            {!isProcessing && (
              <form
                id="upload-form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 mt-10 md:mt-12"
              >
                <div className="form-div space-y-1">
                  <label htmlFor="company-name">Company Name</label>
                  <input
                    type="text"
                    name="company-name"
                    placeholder="Company Name"
                    id="company-name"
                    className="w-full transition-colors duration-200 outline-none
                    focus:ring-2 focus:ring-white/50
                    focus:border-white/40
                    focus:bg-white/5"
                  />
                </div>

                <div className="form-div space-y-1">
                  <label htmlFor="job-title">Job Title</label>
                  <input
                    type="text"
                    name="job-title"
                    placeholder="Job Title"
                    id="job-title"
                    className="w-full transition-colors duration-200 outline-none
                    focus:ring-2 focus:ring-white/50
                    focus:border-white/40
                    focus:bg-white/5"
                  />
                </div>

                <div className="form-div space-y-1">
                  <label htmlFor="job-description">Job Description</label>
                  <textarea
                    rows={5}
                    name="job-description"
                    placeholder="Job Description"
                    id="job-description"
                    className="w-full resize-none transition-colors duration-200 outline-none
                    focus:ring-2 focus:ring-white/50
                    focus:border-white/40
                    focus:bg-white/5"
                  />
                </div>

                <div className="form-div space-y-1">
                  <label htmlFor="uploader">Upload Resume</label>
                  <FileUploader onFileSelect={handleFileSelect} />
                </div>

                <button
                  className="primary-button w-auto md:w-full mt-2"
                  type="submit"
                >
                  Analyze Resume
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
