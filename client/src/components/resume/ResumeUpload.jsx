import { useState } from "react";
import toast from "react-hot-toast";

import Button from "../common/Button";

import {
  uploadResume,
  analyzeResume,
} from "../../services/resumeService";

function ResumeUpload({ onAnalysisComplete }) {
  const [file, setFile] = useState(null);

  const [uploading, setUploading] = useState(false);

  const [analyzing, setAnalyzing] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a PDF");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("resume", file);

      await uploadResume(formData);

      toast.success("Resume Uploaded Successfully");

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

      onAnalysisComplete(response.analysis);

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
    <div className="mx-auto max-w-xl rounded-2xl bg-slate-900 p-8 shadow-lg">

      <h1 className="mb-6 text-3xl font-bold text-cyan-400">

        Resume Upload

      </h1>

      <input
        type="file"
        accept=".pdf"
        className="mb-5 w-full"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <Button
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Resume"}
      </Button>

      <Button
        className="mt-4"
        onClick={handleAnalyze}
        disabled={analyzing}
      >
        {analyzing ? "Analyzing..." : "Analyze Resume"}
      </Button>

    </div>
  );
}

export default ResumeUpload;