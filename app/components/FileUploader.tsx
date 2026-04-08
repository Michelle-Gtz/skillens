import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useState } from "react";

export default function FileUploader() {
  const [file, setFile] = useState();
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div className="w-full flex flex-col gap-2">
      {/* label XS */}
      <label className="text-xs text-dark-200">Upload Resume</label>

      <div className="gradient-border">
        <div
          {...getRootProps()}
          className={`uplader-drag-area flex flex-col items-center justify-center gap-4 cursor-pointer transition
            ${isDragActive ? "bg-white/5" : ""}
          `}
        >
          <input {...getInputProps()} />

          <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-xl bg-white/5 border border-white/10">
            <img
              src="/icons/info.svg"
              alt="upload"
              className="size-8 opacity-80"
            />
          </div>

          {file ? (
            <div></div>
          ) : (
            <div className="text-center space-y-1">
              <p className="text-sm text-white">
                <span className="font-semibold text-gradient">
                  Click to Upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-dark-200">PDF (max 20MB)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
