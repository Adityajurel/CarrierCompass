
import { useState } from "react";
import toast from "react-hot-toast";

import Button from "../common/Button";

import {
  uploadResume,
  analyzeResume,
} from "../../services/resumeService";

function ResumeUpload({
  onAnalysisComplete,
  onUploadComplete,
}) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a PDF");
      return;
    }

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("resume", file);

      await uploadResume(formData);

      toast.success("Resume Uploaded Successfully");

      setFile(null);

      if (onUploadComplete) {
        await onUploadComplete();
      }

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Upload Failed"
      );
    } finally {
      setUploading(false);
    }
  };

  const handleAnalyze = async () => {
    try {
      setAnalyzing(true);

      const response = await analyzeResume();

      if (onAnalysisComplete) {
        onAnalysisComplete(response.analysis);
      }

      toast.success("Resume Analysis Completed");

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Analysis Failed"
      );
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-7 shadow-lg">

      <div className="mb-6">
        <div className="mb-3 text-4xl">📄</div>

        <h2 className="text-2xl font-bold text-white">
          Upload Your Resume
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Upload your latest resume in PDF format. CareerCompass AI will use
          it to generate personalized career insights.
        </p>
      </div>

      <input
        type="file"
        accept=".pdf,application/pdf"
        className="mb-5 block w-full cursor-pointer rounded-xl border border-slate-700 bg-slate-800 p-3 text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-400 file:px-4 file:py-2 file:font-semibold file:text-slate-950 hover:file:bg-cyan-300"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      {file && (
        <div className="mb-5 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
          <p className="text-sm font-medium text-cyan-400">
            Selected file
          </p>

          <p className="mt-1 truncate text-sm text-slate-300">
            {file.name}
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-3">

        <Button
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Resume"}
        </Button>

        <Button
          onClick={handleAnalyze}
          disabled={analyzing}
          className="border border-slate-700 bg-slate-800"
        >
          {analyzing ? "Analyzing..." : "Analyze Resume"}
        </Button>

      </div>

    </div>
  );
}

export default ResumeUpload;

