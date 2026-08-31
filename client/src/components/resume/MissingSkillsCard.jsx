import ResumeCard from "./ResumeCard";

function MissingSkillsCard({ analysis }) {

    return (

        <ResumeCard
            title="Missing Skills"
            icon="⚠️"
        >

            <div className="flex flex-wrap gap-3">

                {analysis.missingSkills.map((skill, index) => (

                    <span
                        key={index}
                        className="rounded-full bg-red-500/10 border border-red-500 px-4 py-2 text-red-300"
                    >
                        {skill}
                    </span>

                ))}

            </div>

        </ResumeCard>

    );

}

export default MissingSkillsCard;