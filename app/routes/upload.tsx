import Navbar from "~/components/Navbar";
import { useState, type FormEvent } from "react";
import FileUploader from "~/components/FileUploader";
export default function Upload() {
  const [isProcessing, setisProcessing] = useState(false);
  const [statusText, setstatusText] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {};

  return (
    <main>
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <div>
            <h1 className="text-gradient p-4">
              Smart feedback for your resume
            </h1>
            {isProcessing ? (
              <>
                <p className="text-gray-500 text-sm">{statusText}</p>
                <img src="/images/resume-scan.gif" className="w-full" />
              </>
            ) : (
              <h2 p-4>
                Upload your resume for an ATS score and improvement tips.
              </h2>
            )}{" "}
            {!isProcessing && (
              <form
                id="upload-form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-12"
              >
                <div className="form-div">
                  <label htmlFor="company-name">Company Name</label>
                  <input
                    type="text"
                    name="company-name"
                    placeholder="Company Name"
                    id="company-name"
                  ></input>
                </div>
                <div className="form-div">
                  <label htmlFor="job-title">Job Title</label>
                  <input
                    type="text"
                    name="job-title"
                    placeholder="Job Title"
                    id="job-title"
                  ></input>
                </div>
                <div className="form-div">
                  <label htmlFor="job-description">Job Description</label>
                  <textarea
                    rows={5}
                    name="job-description"
                    placeholder="Job Description"
                    id="job-description"
                  ></textarea>
                </div>
                <div className="form-div">
                  <label htmlFor="uploader">Upload Resume</label>
                  <FileUploader />
                </div>

                <button className="primary-button" type="submit">
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
