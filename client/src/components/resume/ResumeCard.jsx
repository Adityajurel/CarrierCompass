import React from "react";

function ResumeCard({ title, icon, children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition-all duration-300 hover:border-cyan-400 hover:shadow-cyan-500/10 ${className}`}
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="text-3xl">{icon}</span>

        <h2 className="text-xl font-semibold text-white">
          {title}
        </h2>
      </div>

      {children}
    </div>
  );
}

export default ResumeCard;