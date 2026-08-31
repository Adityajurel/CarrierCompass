import ResumeCard from "./ResumeCard";

function CareerRecommendationCard({ analysis }) {

  const careers = analysis?.careerRecommendations || [];

  return (
    <ResumeCard
      title="Career Recommendations"
      icon="💼"
    >

      <div className="space-y-6">

        {careers.map((career, index) => (

          <div
            key={index}
            className="rounded-xl border border-slate-700 bg-slate-800 p-5"
          >

            <div className="flex flex-col justify-between gap-3 md:flex-row">

              <div>

                <h3 className="text-xl font-bold text-cyan-400">
                  {career.role}
                </h3>

                <p className="mt-2 text-slate-300">
                  {career.reason}
                </p>

              </div>

              <div className="text-right">

                <p className="text-2xl font-bold text-green-400">
                  {career.matchPercentage}%
                </p>

                <p className="text-sm text-slate-400">
                  Match
                </p>

              </div>

            </div>

            <div className="mt-5 h-2 rounded-full bg-slate-700">

              <div
                className="h-2 rounded-full bg-cyan-400"
                style={{
                  width: `${career.matchPercentage}%`,
                }}
              />

            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">

              <div>

                <p className="text-sm text-slate-400">
                  Salary
                </p>

                <p className="font-semibold text-white">
                  {career.salaryRange}
                </p>

              </div>

              <div>

                <p className="text-sm text-slate-400">
                  Difficulty
                </p>

                <p className="font-semibold text-white">
                  {career.difficulty}
                </p>

              </div>

            </div>

            <div className="mt-5">

              <p className="mb-2 text-sm text-slate-400">
                Required Skills
              </p>

              <div className="flex flex-wrap gap-2">

                {career.requiredSkills.map((skill, idx) => (

                  <span
                    key={idx}
                    className="rounded-full border border-cyan-500 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>

            <div className="mt-5 rounded-lg bg-cyan-500/10 p-4">

              <p className="text-sm text-cyan-400">
                Next Step
              </p>

              <p className="mt-1 text-slate-300">
                {career.nextStep}
              </p>

            </div>

          </div>

        ))}

      </div>

    </ResumeCard>
  );

}

export default CareerRecommendationCard;