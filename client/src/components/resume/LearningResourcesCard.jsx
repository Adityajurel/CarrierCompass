import ResumeCard from "./ResumeCard";

function LearningResourcesCard({ analysis }) {

  const resources = analysis?.learningResources || [];

  return (

    <ResumeCard
      title="Learning Resources"
      icon="📚"
    >

      <div className="space-y-5">

        {resources.map((resource, index) => (

          <div
            key={index}
            className="rounded-xl border border-slate-700 bg-slate-800 p-5"
          >

            <div className="flex items-center justify-between">

              <h3 className="text-lg font-bold text-cyan-400">
                {resource.skill}
              </h3>

              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
                {resource.type}
              </span>

            </div>

            <p className="mt-3 text-slate-300">
              {resource.resource}
            </p>

          </div>

        ))}

      </div>

    </ResumeCard>

  );

}

export default LearningResourcesCard;