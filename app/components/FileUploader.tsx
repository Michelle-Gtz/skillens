import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "~/lib/utils";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const maxFileSize = 5 * 1024 * 1024;

export default function FileUploader({ onFileSelect }: FileUploaderProps) {
  const [removed, setRemoved] = useState(false); // ✅ minimal state

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      setRemoved(false); // reset if new file selected
      onFileSelect?.(file);
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: { "application/pdf": [".pdf"] },
      maxSize: maxFileSize,
    });

  const file = removed ? null : acceptedFiles[0] || null; // ✅ override

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="gradient-border">
        <div
          {...getRootProps()}
          className={`uplader-drag-area flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-200 px-4 py-6
            ${isDragActive ? "bg-white/5 scale-[0.99]" : "hover:bg-white/5"}
          `}
        >
          <input {...getInputProps()} />

          {file ? (
            <div
              className="uploader-selected-file w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src="/images/pdf.png"
                  alt="pdf"
                  className="size-10 shrink-0"
                />

                <div className="min-w-0">
                  <p className="text-sm text-white font-medium truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-dark-200">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>

              <button
                className="p-2 cursor-pointer rounded-md hover:bg-white/10 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  setRemoved(true); // ✅ hide file
                  onFileSelect?.(null);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-red-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 6L18 18M6 18L18 6" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-xl bg-white/5 border border-white/10">
                <img
                  src="/icons/info.svg"
                  alt="upload"
                  className="size-8 opacity-80"
                />
              </div>

              <p className="text-sm text-white leading-tight">
                <span className="font-semibold text-white">
                  Click to Upload
                </span>{" "}
                or drag and drop
              </p>

              <p className="text-xs text-dark-200">
                PDF ({formatSize(maxFileSize)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
