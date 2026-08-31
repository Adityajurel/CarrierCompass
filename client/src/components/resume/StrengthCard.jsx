import ResumeCard from "./ResumeCard";

function StrengthCard({ analysis }) {

  const strengths = analysis?.strengths || [];

  return (
    <ResumeCard
      title="Strengths"
      icon="💪"
    >
      <ul className="space-y-3">

        {strengths.map((item, index) => (

          <li
            key={index}
            className="flex items-start gap-3 rounded-lg bg-green-500/10 p-3"
          >

            <span className="text-green-400">✔</span>

            <span className="text-slate-300">
              {item}
            </span>

          </li>

        ))}

      </ul>

    </ResumeCard>
  );
}

export default StrengthCard;