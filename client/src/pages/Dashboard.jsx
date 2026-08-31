
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

import Card from "../components/common/Card";
import Button from "../components/common/Button";
import ResumeDashboard from "../components/resume/ResumeDashboard";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(
    user?.resumeAnalysis || null
  );

  const [resumeUrl, setResumeUrl] = useState(
    user?.resume || ""
  );

  const handleAnalysisComplete = (newAnalysis) => {
    setAnalysis(newAnalysis);
  };

  const handleResumeUploaded = (updatedUser) => {
    if (updatedUser?.resume) {
      setResumeUrl(updatedUser.resume);
    }

    setAnalysis(updatedUser?.resumeAnalysis || null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-5 py-8 text-white">
      <div className="mx-auto max-w-7xl">

        {/* ================= NAVIGATION ================= */}
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 px-5 py-4 shadow-lg">

          {/* Logo */}
          <Link
            to="/dashboard"
            className="text-xl font-bold text-cyan-400"
          >
            CareerCompass AI
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-2">

            <Link
              to="/dashboard"
              className="rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-cyan-400"
            >
              Dashboard
            </Link>

            <Link
              to="/college-predictor"
              className="rounded-xl bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 transition hover:bg-cyan-500/20"
            >
              🎓 Predict College
            </Link>

            <a
              href="#resume-section"
              className="rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-cyan-400"
            >
              📄 Resume
            </a>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
            >
              🚪 Logout
            </button>

          </div>
        </nav>

        {/* ================= WELCOME ================= */}
        <section className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
            CareerCompass AI
          </p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Welcome back
            {user?.name ? `, ${user.name}` : ""}! 👋
          </h1>

          <p className="mt-2 max-w-3xl text-slate-400">
            Analyze your resume, improve your career profile and find
            colleges that match your rank.
          </p>
        </section>

        {/* ================= TOP ACTIONS ================= */}
        <section className="mb-10 grid gap-6 lg:grid-cols-2">

          {/* ================= RESUME ================= */}
          <Card className="border border-cyan-500/30 bg-gradient-to-br from-slate-900 to-cyan-950/20">
            <div className="flex h-full flex-col justify-between">

              <div>
                <div className="mb-4 text-4xl">
                  📄
                </div>

                <h2 className="text-2xl font-bold">
                  AI Resume Analyzer
                </h2>

                <p className="mt-3 leading-7 text-slate-400">
                  Upload your resume and get an AI-powered analysis
                  including ATS score, skills, missing skills, career
                  recommendations, learning roadmap and interview
                  preparation.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">

                <a href="#resume-section">
                  <Button>
                    {resumeUrl
                      ? "View Resume"
                      : "Upload Resume"}
                  </Button>
                </a>

                {resumeUrl && (
                  <a href="#resume-section">
                    <Button className="border border-slate-700 bg-slate-800">
                      Analyze Resume
                    </Button>
                  </a>
                )}

              </div>
            </div>
          </Card>

          {/* ================= COLLEGE PREDICTOR ================= */}
          <Card className="border border-cyan-500/30 bg-gradient-to-br from-slate-900 to-cyan-950/30">
            <div className="flex h-full flex-col justify-between">

              <div>
                <div className="mb-4 text-4xl">
                  🎓
                </div>

                <h2 className="text-2xl font-bold">
                  College Predictor
                </h2>

                <p className="mt-3 leading-7 text-slate-400">
                  Enter your JEE or NEET rank, category, quota and
                  preferences to discover colleges you may be eligible
                  for.
                </p>
              </div>

              <div className="mt-6">
                <Link to="/college-predictor">
                  <Button>
                    Predict Colleges →
                  </Button>
                </Link>
              </div>

            </div>
          </Card>

        </section>

        {/* ================= RESUME DASHBOARD ================= */}
        <section
          id="resume-section"
          className="mb-12 scroll-mt-8"
        >
          <div className="mb-6">

            <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
              Your Resume
            </p>

            <h2 className="mt-1 text-2xl font-bold md:text-3xl">
              Resume Analysis & AI Insights
            </h2>

            <p className="mt-2 text-slate-400">
              Manage your resume and explore personalized AI
              recommendations.
            </p>

          </div>

          <ResumeDashboard
            analysis={analysis}
            resumeUrl={resumeUrl}
            onAnalysisComplete={handleAnalysisComplete}
            onResumeUploaded={handleResumeUploaded}
          />
        </section>

        {/* ================= FEATURES ================= */}
        <section className="mb-12">

          <div className="mb-6">

            <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
              What you can do
            </p>

            <h2 className="mt-1 text-2xl font-bold md:text-3xl">
              Your career toolkit
            </h2>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <Card>
              <div className="mb-4 text-3xl">
                📊
              </div>

              <h3 className="text-lg font-semibold">
                ATS Score
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Understand how your resume performs against applicant
                tracking systems.
              </p>
            </Card>

            <Card>
              <div className="mb-4 text-3xl">
                🧠
              </div>

              <h3 className="text-lg font-semibold">
                AI Resume Insights
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Get AI-generated insights about your resume, profile
                and career readiness.
              </p>
            </Card>

            <Card>
              <div className="mb-4 text-3xl">
                🔍
              </div>

              <h3 className="text-lg font-semibold">
                Missing Skills
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Identify important skills you should develop for your
                target career.
              </p>
            </Card>

            <Card>
              <div className="mb-4 text-3xl">
                🎯
              </div>

              <h3 className="text-lg font-semibold">
                Career Recommendations
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Discover career directions based on your current
                skills and resume.
              </p>
            </Card>

            <Card>
              <div className="mb-4 text-3xl">
                🗺️
              </div>

              <h3 className="text-lg font-semibold">
                Learning Roadmap
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Get a personalized direction for the skills and
                technologies you should learn next.
              </p>
            </Card>

            <Card>
              <div className="mb-4 text-3xl">
                🏫
              </div>

              <h3 className="text-lg font-semibold">
                College Prediction
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Explore college possibilities using your rank,
                category and counselling preferences.
              </p>

              <Link
                to="/college-predictor"
                className="mt-4 inline-block text-sm font-semibold text-cyan-400 hover:underline"
              >
                Open Predictor →
              </Link>
            </Card>

          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="mb-12">

          <Card>

            <div className="mb-7">

              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
                How it works
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                From profile to career insights
              </h2>

            </div>

            <div className="grid gap-7 md:grid-cols-4">

              {[
                ["1", "Upload", "Upload your latest resume."],
                ["2", "Analyze", "AI analyzes your resume and skills."],
                [
                  "3",
                  "Understand",
                  "See your score, strengths and skill gaps.",
                ],
                [
                  "4",
                  "Improve",
                  "Follow recommendations and build your career.",
                ],
              ].map(([number, title, description]) => (

                <div key={number}>

                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 font-bold text-slate-950">
                    {number}
                  </div>

                  <h3 className="font-semibold">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    {description}
                  </p>

                </div>

              ))}

            </div>

          </Card>
        </section>

        {/* ================= ABOUT ================= */}
        <section className="mb-12 grid gap-6 md:grid-cols-2">

          <Card>

            <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
              About CareerCompass
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Your AI-powered career companion
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              CareerCompass AI helps students and job seekers understand
              their current profile, improve their resumes, identify skill
              gaps and make better career decisions.
            </p>

            <p className="mt-3 leading-7 text-slate-400">
              The goal is simple: understand where you are, where you can
              go and what you should do next.
            </p>

          </Card>

          <Card>

            <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
              Who is it for?
            </p>

            <div className="mt-5 space-y-5">

              <div>
                <h3 className="font-semibold">
                  🎓 Students
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Explore colleges, careers, skills and opportunities.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">
                  💼 Job Seekers
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Improve your resume and become more job-ready.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">
                  🚀 Career Explorers
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Understand your strengths and discover possible
                  career directions.
                </p>
              </div>

            </div>
          </Card>

        </section>

        {/* ================= AUTHOR ================= */}
        <section className="mb-8">

          <Card>

            <div className="text-center">

              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
                About the Project
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Built with AI and modern web technologies
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
                CareerCompass AI combines a modern web application
                with artificial intelligence to provide practical
                career and education guidance.
              </p>

              <div className="mt-6">

                <p className="text-sm text-slate-500">
                  Developed by
                </p>

                <p className="mt-1 text-xl font-bold text-cyan-400">
                  Aditya Jurel
                </p>

              </div>

            </div>

          </Card>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="border-t border-slate-800 py-6 text-center text-sm text-slate-600">
          © {new Date().getFullYear()} CareerCompass AI
        </footer>

      </div>
    </div>
  );
}

export default Dashboard;

