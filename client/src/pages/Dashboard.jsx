import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/layout/Navbar";
import ResumeUpload from "../components/resume/ResumeUpload";
import ResumeDashboard from "../components/resume/ResumeDashboard";

import { getCurrentUser } from "../services/authService";
import {
  uploadResume,
  analyzeResume,
  getResumeAnalysis,
} from "../services/resumeService";

function Dashboard() {
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const [userRes, analysisRes] = await Promise.allSettled([
        getCurrentUser(),
        getResumeAnalysis(),
      ]);

      if (userRes.status === "fulfilled") {
        setUser(userRes.value.data);
      }

      if (analysisRes.status === "fulfilled") {
        setAnalysis(analysisRes.value.data);
      } else {
        setAnalysis(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Analyze Existing Resume
  const handleAnalyzeAgain = async () => {
    try {
      toast.loading("Analyzing Resume...", {
        id: "analysis",
      });

      await analyzeResume();

      await fetchDashboardData();

      toast.success("Resume analyzed successfully.", {
        id: "analysis",
      });

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Analysis failed.",
        {
          id: "analysis",
        }
      );
    }
  };

  // Open File Picker
  const handleReplaceClick = () => {
    fileInputRef.current?.click();
  };

  // Replace Resume Only
  const handleReplaceResume = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      toast.loading("Uploading Resume...", {
        id: "resume",
      });

      const formData = new FormData();
      formData.append("resume", file);

      await uploadResume(formData);

      // Refresh user so new resume URL comes
      await fetchDashboardData();

      // Old analysis should not be shown
      setAnalysis(null);

      toast.success(
        "Resume uploaded successfully. Click 'Analyze Again' to generate a fresh AI analysis.",
        {
          id: "resume",
        }
      );

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Resume upload failed.",
        {
          id: "resume",
        }
      );
    }

    e.target.value = "";
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <h1 className="text-xl text-white">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <div className="mx-auto mt-10 max-w-7xl px-6 pb-16">

        {/* No Resume */}
        {!user?.resume ? (
          <ResumeUpload
            user={user}
            onAnalysisComplete={setAnalysis}
            onResumeUpload={fetchDashboardData}
          />
        ) : (
          <ResumeDashboard
            analysis={analysis}
            resumeUrl={user.resume}
            onAnalyzeAgain={handleAnalyzeAgain}
            onReplaceResume={handleReplaceClick}
          />
        )}

      </div>

      {/* Hidden Resume Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleReplaceResume}
      />

    </div>
  );
}

export default Dashboard;