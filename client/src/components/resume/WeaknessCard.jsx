import ResumeCard from "./ResumeCard";

function WeaknessCard({ analysis }) {

  const weaknesses = analysis?.weaknesses || [];

  return (
    <ResumeCard
      title="Areas to Improve"
      icon="⚠️"
    >
      <ul className="space-y-3">

        {weaknesses.map((item, index) => (

          <li
            key={index}
            className="flex items-start gap-3 rounded-lg bg-red-500/10 p-3"
          >

            <span className="text-red-400">✖</span>

            <span className="text-slate-300">
              {item}
            </span>

          </li>

        ))}

      </ul>

    </ResumeCard>
  );
}

export default WeaknessCard;