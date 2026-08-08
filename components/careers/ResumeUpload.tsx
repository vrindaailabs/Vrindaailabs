"use client";

import { useRef } from "react";
import { Upload, FileText, X } from "lucide-react";

interface ResumeUploadProps {
  file?: File;
  onFileSelect: (file: File | undefined) => void;
  error?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function ResumeUpload({
  file,
  onFileSelect,
  error,
}: ResumeUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile?: File) => {
    if (!selectedFile) return;

    if (selectedFile.size > MAX_FILE_SIZE) {
      alert("Resume must be smaller than 5 MB.");
      return;
    }

    if (!ACCEPTED_FILE_TYPES.includes(selectedFile.type)) {
      alert("Only PDF, DOC and DOCX files are allowed.");
      return;
    }

    onFileSelect(selectedFile);
  };

  const removeFile = () => {
    onFileSelect(undefined);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="mb-2 block font-medium text-slate-800">
        Resume
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();

          handleFile(e.dataTransfer.files?.[0]);
        }}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition
        ${
          error
            ? "border-red-500 bg-red-50"
            : "border-slate-300 hover:border-blue-600 hover:bg-slate-50"
        }`}
      >
        <Upload className="mx-auto mb-3 h-10 w-10 text-blue-600" />

        <p className="text-lg font-semibold">
          Drag & Drop your resume here
        </p>

        <p className="mt-2 text-sm text-slate-500">
          or click to browse
        </p>

        <p className="mt-3 text-xs text-slate-400">
          Accepted: PDF, DOC, DOCX
        </p>

        <p className="text-xs text-slate-400">
          Maximum file size: 5 MB
        </p>

        <input
          ref={inputRef}
          type="file"
          hidden
          accept=".pdf,.doc,.docx"
          onChange={(e) =>
            handleFile(e.target.files?.[0])
          }
        />
      </div>

      {file && (
        <div className="mt-4 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-blue-600" />

            <div>
              <p className="font-medium">
                {file.name}
              </p>

              <p className="text-sm text-slate-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={removeFile}
            className="rounded-full p-2 transition hover:bg-red-100"
            aria-label="Remove resume"
          >
            <X className="h-5 w-5 text-red-600" />
          </button>
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}