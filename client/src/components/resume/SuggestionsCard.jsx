import ResumeCard from "./ResumeCard";

function SuggestionsCard({ analysis }) {

  const suggestions = analysis?.suggestions || [];

  return (

    <ResumeCard
      title="AI Suggestions"
      icon="💡"
    >

      <ul className="space-y-3">

        {suggestions.map((item, index) => (

          <li
            key={index}
            className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-4 text-slate-300"
          >

            💡 {item}

          </li>

        ))}

      </ul>

    </ResumeCard>

  );

}

export default SuggestionsCard;