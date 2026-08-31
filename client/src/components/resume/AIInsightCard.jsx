import { Sparkles } from "lucide-react";

function AIInsightCard({ analysis }) {

  const career = analysis?.careerRecommendations?.[0];

  return (
    <div className="mb-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-slate-900 p-6">

      <div className="flex items-center gap-3">

        <Sparkles className="text-cyan-400" />

        <h2 className="text-2xl font-bold text-white">

          AI Insight

        </h2>

      </div>

      <p className="mt-5 text-lg leading-8 text-slate-300">

        Your resume is best suited for

        <span className="font-bold text-cyan-400">

          {" "}{career?.role}

        </span>

        {" "}roles with a

        <span className="font-bold text-green-400">

          {" "}{career?.matchPercentage}% match

        </span>.

      </p>

      <p className="mt-4 text-slate-400">

        Focus on improving the missing skills,
        complete the recommended roadmap,
        and optimize ATS keywords to push your score above 90.

      </p>

    </div>
  );
}

export default AIInsightCard;