import ResumeCard from "./ResumeCard";

function ATSImprovementsCard({ analysis }) {

  const improvements = analysis?.atsImprovements || [];

  return (

    <ResumeCard
      title="ATS Improvements"
      icon="📈"
    >

      <ul className="space-y-3">

        {improvements.map((item, index) => (

          <li
            key={index}
            className="rounded-lg border border-slate-700 bg-slate-800 p-4 text-slate-300"
          >

            ✅ {item}

          </li>

        ))}

      </ul>

    </ResumeCard>

  );

}

export default ATSImprovementsCard;