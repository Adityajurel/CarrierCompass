import ResumeCard from "./ResumeCard";

function SummaryCard({ analysis }) {
  return (
    <ResumeCard
      title="Resume Summary"
      icon="📝"
    >
      <p className="text-slate-300 leading-7">
        {analysis?.summary}
      </p>
    </ResumeCard>
  );
}

export default SummaryCard;