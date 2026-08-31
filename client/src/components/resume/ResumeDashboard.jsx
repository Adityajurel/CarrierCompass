
import { useState } from "react";
import toast from "react-hot-toast";

import ResumePreview from "./ResumePreview";
import ResumeTabs from "./ResumeTabs";
import DashboardHeader from "./DashboardHeader";
import SectionHeader from "./SectionHeader";
import AIInsightCard from "./AIInsightCard";
import ATSCard from "./ATSCard";
import SummaryCard from "./SummaryCard";
import ScoreBreakdownCard from "./ScoreBreakdownCard";
import SkillsCard from "./SkillsCard";
import MissingSkillsCard from "./MissingSkillsCard";
import StrengthCard from "./StrengthCard";
import WeaknessCard from "./WeaknessCard";
import CareerRecommendationCard from "./CareerRecommendationCard";
import RoadmapCard from "./RoadmapCard";
import RecommendedProjectsCard from "./RecommendedProjectsCard";
import CertificationsCard from "./CertificationsCard";
import InterviewPreparationCard from "./InterviewPreparationCard";
import LearningResourcesCard from "./LearningResourcesCard";
import ATSImprovementsCard from "./ATSImprovementsCard";
import SuggestionsCard from "./SuggestionsCard";
import ResumeUpload from "./ResumeUpload";

import { getCurrentUser } from "../../services/authService";
import { analyzeResume } from "../../services/resumeService";

function ResumeDashboard({
  analysis,
  resumeUrl,
  onAnalysisComplete,
  onResumeUploaded,
}) {
  const [activeTab, setActiveTab] = useState("Analysis");
  const [showUpload, setShowUpload] = useState(!resumeUrl);
  const [analyzing, setAnalyzing] = useState(false);

  const refreshUser = async () => {
    try {
      const response = await getCurrentUser();
      onResumeUploaded(response.data);
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeUrl) {
      toast.error("Please upload a resume first");
      setShowUpload(true);
      return;
    }

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

  const handleUploadComplete = async () => {
    await refreshUser();
    setShowUpload(false);
  };

  /* ================= NO RESUME ================= */
  if (!resumeUrl) {
    return (
      <div className="space-y-6">
        <ResumeUpload
          onAnalysisComplete={onAnalysisComplete}
          onUploadComplete={handleUploadComplete}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* ================= RESUME TOP ================= */}
      <div className="grid gap-8 xl:grid-cols-12">

        {/* Resume Preview */}
        <div className="xl:col-span-5">
          <ResumePreview resumeUrl={resumeUrl} />
        </div>

        {/* Resume Actions */}
        <div className="xl:col-span-7">

          <DashboardHeader
            analysis={
              analysis || {
                atsScore: 0,
                skills: {},
                missingSkills: [],
                careerRecommendations: [],
              }
            }
            onAnalyzeAgain={handleAnalyze}
            onReplaceResume={() => setShowUpload(true)}
          />

          {!analysis && (
            <div className="mt-6 rounded-3xl border border-yellow-500/30 bg-yellow-500/10 p-7">
              <h2 className="text-2xl font-bold text-yellow-400">
                Resume Uploaded Successfully 🎉
              </h2>

              <p className="mt-3 leading-7 text-slate-300">
                Your resume is ready. Click{" "}
                <span className="font-semibold text-cyan-400">
                  Analyze Resume
                </span>{" "}
                to generate your AI-powered resume analysis.
              </p>

              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="mt-5 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
              >
                {analyzing ? "Analyzing..." : "Analyze Resume"}
              </button>
            </div>
          )}

          {analysis && (
            <div className="mt-6 rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
                    Resume Ready
                  </p>

                  <h3 className="mt-1 text-xl font-bold">
                    Your AI analysis is available
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    You can analyze the same resume again or replace it with a
                    newer version.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-950 hover:bg-cyan-300 disabled:opacity-50"
                  >
                    {analyzing ? "Analyzing..." : "Analyze Again"}
                  </button>

                  <button
                    onClick={() => setShowUpload(true)}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 font-semibold text-white hover:bg-slate-700"
                  >
                    Replace
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ================= REPLACE RESUME ================= */}
      {showUpload && (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                {resumeUrl ? "Replace Resume" : "Upload Resume"}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Upload a new PDF to replace your current resume.
              </p>
            </div>

            {resumeUrl && (
              <button
                onClick={() => setShowUpload(false)}
                className="text-sm text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            )}
          </div>

          <ResumeUpload
            onAnalysisComplete={onAnalysisComplete}
            onUploadComplete={handleUploadComplete}
          />
        </div>
      )}

      {/* ================= ANALYSIS ================= */}
      {analysis && (
        <>
          <AIInsightCard analysis={analysis} />

          <ResumeTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {activeTab === "Analysis" && (
            <section>
              <SectionHeader
                title="Resume Analysis"
                subtitle="Overall ATS performance and resume quality."
              />

              <div className="grid gap-6 lg:grid-cols-2">
                <ATSCard analysis={analysis} />
                <SummaryCard analysis={analysis} />
              </div>

              <div className="mt-6">
                <ScoreBreakdownCard analysis={analysis} />
              </div>
            </section>
          )}

          {activeTab === "Skills" && (
            <section>
              <SectionHeader
                title="Skills Analysis"
                subtitle="Technical skills identified from your resume."
              />

              <div className="space-y-6">
                <SkillsCard analysis={analysis} />
                <MissingSkillsCard analysis={analysis} />

                <div className="grid gap-6 lg:grid-cols-2">
                  <StrengthCard analysis={analysis} />
                  <WeaknessCard analysis={analysis} />
                </div>
              </div>
            </section>
          )}

          {activeTab === "Career" && (
            <section>
              <SectionHeader
                title="Career Planning"
                subtitle="AI recommended career paths and growth roadmap."
              />

              <div className="space-y-6">
                <CareerRecommendationCard analysis={analysis} />
                <RoadmapCard analysis={analysis} />

                <div className="grid gap-6 lg:grid-cols-2">
                  <RecommendedProjectsCard analysis={analysis} />
                  <CertificationsCard analysis={analysis} />
                </div>
              </div>
            </section>
          )}

          {activeTab === "Interview" && (
            <section>
              <SectionHeader
                title="Interview Preparation"
                subtitle="Prepare smarter with AI-generated guidance."
              />

              <div className="space-y-6">
                <InterviewPreparationCard analysis={analysis} />

                <div className="grid gap-6 lg:grid-cols-2">
                  <LearningResourcesCard analysis={analysis} />
                  <ATSImprovementsCard analysis={analysis} />
                </div>

                <SuggestionsCard analysis={analysis} />
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default ResumeDashboard;

