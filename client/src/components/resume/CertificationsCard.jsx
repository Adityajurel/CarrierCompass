import ResumeCard from "./ResumeCard";

function CertificationsCard({ analysis }) {

  const certifications = analysis?.certifications || [];

  return (
    <ResumeCard
      title="Recommended Certifications"
      icon="🏆"
    >

      <div className="space-y-4">

        {certifications.map((cert, index) => (

          <div
            key={index}
            className="rounded-xl border border-slate-700 bg-slate-800 p-5"
          >

            <h3 className="text-lg font-bold text-cyan-400">
              {cert.name}
            </h3>

            <div className="mt-3 flex items-center justify-between">

              <span className="text-slate-300">
                {cert.provider}
              </span>

              <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-sm text-yellow-300">
                {cert.priority}
              </span>

            </div>

          </div>

        ))}

      </div>

    </ResumeCard>
  );

}

export default CertificationsCard;