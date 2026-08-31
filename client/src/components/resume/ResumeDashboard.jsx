import { useState } from "react";

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

function ResumeDashboard({
  analysis,
  resumeUrl,
  onAnalyzeAgain,
  onReplaceResume,
}) {
  const [activeTab, setActiveTab] = useState("Analysis");

  // ================= No Analysis Yet =================

  if (!analysis) {
    return (
      <div className="grid gap-8 xl:grid-cols-12">

        <div className="xl:col-span-5">
          <ResumePreview resumeUrl={resumeUrl} />
        </div>

        <div className="xl:col-span-7 space-y-8">

          <DashboardHeader
            analysis={{
              atsScore: 0,
              skills: {},
              missingSkills: [],
              careerRecommendations: [],
            }}
            onAnalyzeAgain={onAnalyzeAgain}
            onReplaceResume={onReplaceResume}
          />

          <div className="rounded-3xl border border-yellow-500/30 bg-yellow-500/10 p-8">

            <h2 className="text-3xl font-bold text-yellow-400">
              Resume Uploaded Successfully 🎉
            </h2>

            <p className="mt-4 text-slate-300 leading-7">
              Your resume has been uploaded successfully.

              <br />

              Click the
              <span className="mx-2 font-semibold text-cyan-400">
                Analyze Again
              </span>
              button to generate a fresh AI analysis.

            </p>

          </div>

        </div>

      </div>
    );
  }

  // ================= Dashboard =================

  return (
    <div className="grid gap-8 xl:grid-cols-12">

      {/* Left */}

      <div className="xl:col-span-5">

        <ResumePreview resumeUrl={resumeUrl} />

      </div>

      {/* Right */}

      <div className="xl:col-span-7 space-y-10">

        <DashboardHeader
          analysis={analysis}
          onAnalyzeAgain={onAnalyzeAgain}
          onReplaceResume={onReplaceResume}
        />

        <AIInsightCard analysis={analysis} />

        <ResumeTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Analysis */}

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

        {/* Skills */}

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

        {/* Career */}

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

        {/* Interview */}

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

      </div>

    </div>
  );
}

export default ResumeDashboard;