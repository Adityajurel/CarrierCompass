import ResumeCard from "./ResumeCard";

function SkillCategory({ title, items }) {

  if (!items || items.length === 0) return null;

  return (

    <div className="mb-6">

      <h3 className="mb-3 text-lg font-semibold text-cyan-400">
        {title}
      </h3>

      <div className="flex flex-wrap gap-3">

        {items.map((item, index) => (

          <span
            key={index}
            className="rounded-full border border-cyan-500 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300"
          >
            {item}
          </span>

        ))}

      </div>

    </div>

  );

}

function SkillsCard({ analysis }) {

  const skills = analysis.skills;

  return (

    <ResumeCard
      title="Skills"
      icon="💻"
    >

      <SkillCategory
        title="Programming Languages"
        items={skills.programmingLanguages}
      />

      <SkillCategory
        title="Frontend"
        items={skills.frontend}
      />

      <SkillCategory
        title="Backend"
        items={skills.backend}
      />

      <SkillCategory
        title="Databases"
        items={skills.databases}
      />

      <SkillCategory
        title="Tools"
        items={skills.tools}
      />

      <SkillCategory
        title="Core Subjects"
        items={skills.coreSubjects}
      />

      <SkillCategory
        title="Other"
        items={skills.other}
      />

    </ResumeCard>

  );

}

export default SkillsCard;