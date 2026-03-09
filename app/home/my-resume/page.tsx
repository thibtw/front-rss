"use client";

import React, { useState } from "react";
import Sidebar from "@/widgets/Sidebar";

const mockUploadedCvs = [
  {
    id: 1,
    name: "John_Doe_CV_2024.pdf",
    uploadedAt: "2024-01-20",
    size: "124 KB",
  },
  {
    id: 2,
    name: "John_Doe_CV_Design.pdf",
    uploadedAt: "2024-01-15",
    size: "98 KB",
  },
];

export default function MyCvAndCoverLetterPage(): React.JSX.Element {
  const [cvFiles, setCvFiles] = useState(mockUploadedCvs);
  const [isCvDragging, setIsCvDragging] = useState(false);
  const [coverLetterText, setCoverLetterText] = useState("");
  const [coverLetterFile, setCoverLetterFile] = useState<{
    name: string;
    size: string;
  } | null>(null);
  const [isCoverLetterDragging, setIsCoverLetterDragging] = useState(false);

  const handleCvDragOver = (e: React.DragEvent): void => {
    e.preventDefault();
    setIsCvDragging(true);
  };

  const handleCvDragLeave = (): void => {
    setIsCvDragging(false);
  };

  const handleCvDrop = (e: React.DragEvent): void => {
    e.preventDefault();
    setIsCvDragging(false);
  };

  const handleCvFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
  };

  const handleRemoveCvFile = (id: number): void => {
    setCvFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleCoverLetterDragOver = (e: React.DragEvent): void => {
    e.preventDefault();
    setIsCoverLetterDragging(true);
  };

  const handleCoverLetterDragLeave = (): void => {
    setIsCoverLetterDragging(false);
  };

  const handleCoverLetterDrop = (e: React.DragEvent): void => {
    e.preventDefault();
    setIsCoverLetterDragging(false);
  };

  const handleCoverLetterFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverLetterFile({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
      });
    }
    e.target.value = "";
  };

  const handleRemoveCoverLetterFile = (): void => {
    setCoverLetterFile(null);
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar />
      <main className="flex-1 px-8 py-8">
        <h1 className="text-4xl font-bold mb-2">My CV and Cover Letter</h1>
        <p className="text-gray-400 mb-8">
          Manage your CV and cover letter for job applications
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">CV</h2>
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center mb-6 transition-colors ${
              isCvDragging
                ? "border-white/40 bg-white/5"
                : "border-white/20 hover:border-white/30"
            }`}
            onDragOver={handleCvDragOver}
            onDragLeave={handleCvDragLeave}
            onDrop={handleCvDrop}
          >
            <input
              type="file"
              id="cv-upload"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleCvFileSelect}
            />
            <label
              htmlFor="cv-upload"
              className="cursor-pointer flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">
                  Drag and drop your CV here, or click to browse
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  PDF, DOC, DOCX up to 10 MB
                </p>
              </div>
            </label>
          </div>
          <h3 className="text-lg font-medium mb-3">Uploaded CVs</h3>
          <div className="space-y-3">
            {cvFiles.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center text-gray-400">
                No CVs uploaded yet.
              </div>
            ) : (
              cvFiles.map((file) => (
                <div
                  key={file.id}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center justify-between hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <svg
                        className="w-5 h-5 text-white/60"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-medium truncate">
                        {file.name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {file.size} · Uploaded {file.uploadedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      className="px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      Download
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveCvFile(file.id)}
                      className="px-3 py-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Cover Letter</h2>
          <p className="text-gray-400 text-sm mb-4">
            Write your cover letter below, or upload a file instead.
          </p>

          <div className="mb-4">
            <textarea
              value={coverLetterText}
              onChange={(e) => setCoverLetterText(e.target.value)}
              placeholder={"Dear Hiring Manager,\n\n..."}
              className="w-full min-h-[200px] px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-white/30 focus:outline-none resize-y"
              rows={8}
            />
          </div>

          <p className="text-gray-500 text-sm mb-3">
            Or upload a cover letter file
          </p>
          <div
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
              isCoverLetterDragging
                ? "border-white/40 bg-white/5"
                : "border-white/20 hover:border-white/30"
            }`}
            onDragOver={handleCoverLetterDragOver}
            onDragLeave={handleCoverLetterDragLeave}
            onDrop={handleCoverLetterDrop}
          >
            <input
              type="file"
              id="cover-letter-upload"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleCoverLetterFileSelect}
            />
            {coverLetterFile ? (
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-white/60"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-white font-medium truncate">
                      {coverLetterFile.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {coverLetterFile.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <label
                    htmlFor="cover-letter-upload"
                    className="px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                  >
                    Replace
                  </label>
                  <button
                    type="button"
                    onClick={handleRemoveCoverLetterFile}
                    className="px-3 py-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <label
                htmlFor="cover-letter-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <p className="text-white/80 text-sm">
                  Drag and drop or click to upload cover letter
                </p>
                <p className="text-gray-500 text-xs">
                  PDF, DOC, DOCX, TXT up to 10 MB
                </p>
              </label>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
