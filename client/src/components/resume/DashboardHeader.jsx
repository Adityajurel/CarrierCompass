import {
  Award,
  Briefcase,
  Brain,
  TriangleAlert,
  TrendingUp,
} from "lucide-react";
import { Download, RotateCcw, Upload } from "lucide-react";
import { generateReport } from "../../utils/generateReport";

function DashboardHeader({ analysis, onAnalyzeAgain,onReplaceResume,}) {
  const score = analysis?.atsScore || 0;

  const skills =
    Object.values(analysis?.skills || {})
      .flat()
      .length;

  const missingSkills =
    analysis?.missingSkills?.length || 0;

  const careers =
    analysis?.careerRecommendations?.length || 0;

  const getStatus = () => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Average";
    return "Needs Improvement";
  };

  return (
    <div className="mb-10 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950 p-8">

      <div className="flex flex-col justify-between gap-8 lg:flex-row">

        <div>

          <h1 className="text-4xl font-bold text-white">
            AI Resume Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Analyze your resume, discover career opportunities,
            identify missing skills and receive a personalized roadmap
            to crack top product companies.
          </p>

        </div>

        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-6 py-4">

          <div className="flex items-center gap-2">

            <TrendingUp className="text-cyan-400" />

            <span className="text-slate-300">
              Resume Health
            </span>

          </div>

     

          <h2 className="mt-3 text-5xl font-bold text-cyan-400">
            {score}
          </h2>

          <p className="mt-2 font-semibold text-white">
            {getStatus()}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">

  <button
    onClick={() => generateReport(analysis)}
    className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
  >
    <Download size={18} />
    Download Report
  </button>

<button
  onClick={onReplaceResume}
  className="flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 font-semibold text-white transition hover:bg-indigo-600"
>
  <Upload size={18} />
  Replace Resume
</button>

  <button
    onClick={onAnalyzeAgain}
    className="flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800 px-5 py-3 font-semibold text-white transition hover:border-cyan-500 hover:bg-slate-700"
  >
    <RotateCcw size={18} />
    Analyze Again
  </button>

</div>

        </div>

      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          icon={<Award size={28} />}
          title="ATS Score"
          value={`${score}/100`}
          color="cyan"
        />

        <StatCard
          icon={<Brain size={28} />}
          title="Skills"
          value={skills}
          color="green"
        />

        <StatCard
          icon={<TriangleAlert size={28} />}
          title="Missing Skills"
          value={missingSkills}
          color="red"
        />

        <StatCard
          icon={<Briefcase size={28} />}
          title="Career Matches"
          value={careers}
          color="yellow"
        />

      </div>

    </div>
  );
}

function StatCard({ icon, title, value, color }) {

  const colors = {
    cyan: "text-cyan-400",
    green: "text-green-400",
    red: "text-red-400",
    yellow: "text-yellow-400",
  };

  return (

    <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500">

      <div className={colors[color]}>

        {icon}

      </div>

      <p className="mt-5 text-slate-400">

        {title}

      </p>

      <h3 className={`mt-2 text-3xl font-bold ${colors[color]}`}>

        {value}

      </h3>

    </div>

  );

}

export default DashboardHeader;