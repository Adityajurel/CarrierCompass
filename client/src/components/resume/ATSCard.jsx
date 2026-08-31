import ResumeCard from "./ResumeCard";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

function ATSCard({ analysis }) {

  const score = analysis?.atsScore || 0;

  const getRemark = () => {

    if (score >= 90) return "Excellent";

    if (score >= 75) return "Good";

    if (score >= 60) return "Average";

    return "Needs Improvement";
  };

  return (

    <ResumeCard
      title="ATS Score"
      icon="🎯"
    >

      <div className="mx-auto h-48 w-48">

        <CircularProgressbar
          value={score}
          text={`${score}%`}
          styles={buildStyles({
            textColor: "#22d3ee",
            pathColor: "#06b6d4",
            trailColor: "#334155",
          })}
        />

      </div>

      <h2 className="mt-5 text-center text-2xl font-bold text-cyan-400">

        {getRemark()}

      </h2>

      <p className="mt-2 text-center text-slate-400">

        AI evaluated your resume for ATS compatibility.

      </p>

    </ResumeCard>

  );

}

export default ATSCard;