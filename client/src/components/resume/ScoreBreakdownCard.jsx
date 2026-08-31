import ResumeCard from "./ResumeCard";

const ProgressItem = ({ label, value }) => (
  <div className="mb-5">

    <div className="mb-2 flex justify-between">

      <span className="text-slate-300">{label}</span>

      <span className="font-semibold text-cyan-400">
        {value}/100
      </span>

    </div>

    <div className="h-3 w-full rounded-full bg-slate-700">

      <div
        className="h-3 rounded-full bg-cyan-400 transition-all duration-700"
        style={{ width: `${value}%` }}
      />

    </div>

  </div>
);

function ScoreBreakdownCard({ analysis }) {

  const score = analysis.scoreBreakdown;

  return (

    <ResumeCard
      title="ATS Score Breakdown"
      icon="📊"
    >

      <ProgressItem
        label="Formatting"
        value={score.formatting}
      />

      <ProgressItem
        label="Technical Skills"
        value={score.technicalSkills}
      />

      <ProgressItem
        label="Projects"
        value={score.projects}
      />

      <ProgressItem
        label="Experience"
        value={score.experience}
      />

      <ProgressItem
        label="ATS Keywords"
        value={score.atsKeywords}
      />

      <ProgressItem
        label="Achievements"
        value={score.achievements}
      />

    </ResumeCard>

  );

}

export default ScoreBreakdownCard;