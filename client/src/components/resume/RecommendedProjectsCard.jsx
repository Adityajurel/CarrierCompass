import ResumeCard from "./ResumeCard";

function RecommendedProjectsCard({ analysis }) {

  const projects = analysis?.recommendedProjects || [];

  return (
    <ResumeCard
      title="Recommended Projects"
      icon="🚀"
    >

      <div className="grid gap-6 lg:grid-cols-2">

        {projects.map((project, index) => (

          <div
            key={index}
            className="rounded-xl border border-slate-700 bg-slate-800 p-5"
          >

            <div className="flex items-center justify-between">

              <h3 className="text-xl font-bold text-cyan-400">
                {project.name}
              </h3>

              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
                {project.difficulty}
              </span>

            </div>

            <p className="mt-4 text-slate-300">
              {project.description}
            </p>

            <div className="mt-5">

              <p className="mb-2 text-sm text-slate-400">
                Tech Stack
              </p>

              <div className="flex flex-wrap gap-2">

                {project.techStack.map((tech, idx) => (

                  <span
                    key={idx}
                    className="rounded-full border border-cyan-500 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300"
                  >
                    {tech}
                  </span>

                ))}

              </div>

            </div>

          </div>

        ))}

      </div>

    </ResumeCard>
  );

}

export default RecommendedProjectsCard;