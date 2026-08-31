import ResumeCard from "./ResumeCard";

const RoadmapSection = ({ title, items }) => {

  if (!items || items.length === 0) return null;

  return (

    <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">

      <h3 className="mb-4 text-xl font-bold text-cyan-400">
        {title}
      </h3>

      <ul className="space-y-3">

        {items.map((item, index) => (

          <li
            key={index}
            className="flex items-start gap-3"
          >

            <span className="mt-1 text-green-400">
              ✔
            </span>

            <span className="text-slate-300">
              {item}
            </span>

          </li>

        ))}

      </ul>

    </div>

  );

};

function RoadmapCard({ analysis }) {

  const roadmap = analysis?.roadmap;

  return (

    <ResumeCard
      title="Learning Roadmap"
      icon="🛣️"
    >

      <div className="grid gap-6 lg:grid-cols-3">

        <RoadmapSection
          title="1 Month"
          items={roadmap?.["1Month"]}
        />

        <RoadmapSection
          title="3 Months"
          items={roadmap?.["3Months"]}
        />

        <RoadmapSection
          title="6 Months"
          items={roadmap?.["6Months"]}
        />

      </div>

    </ResumeCard>

  );

}

export default RoadmapCard;