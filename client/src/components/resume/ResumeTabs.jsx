import {
  BarChart3,
  BrainCircuit,
  Briefcase,
  GraduationCap,
} from "lucide-react";

const tabs = [
  {
    id: "Analysis",
    label: "Analysis",
    icon: BarChart3,
  },
  {
    id: "Skills",
    label: "Skills",
    icon: BrainCircuit,
  },
  {
    id: "Career",
    label: "Career",
    icon: Briefcase,
  },
  {
    id: "Interview",
    label: "Interview",
    icon: GraduationCap,
  },
];

function ResumeTabs({ activeTab, setActiveTab }) {
  return (
    <div className="mb-10">

      <div className="flex flex-wrap gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-3">

        {tabs.map((tab) => {

          const Icon = tab.icon;

          return (

            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 font-medium transition-all duration-300

              ${
                activeTab === tab.id
                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >

              <Icon size={20} />

              {tab.label}

            </button>

          );

        })}

      </div>

    </div>
  );
}

export default ResumeTabs;