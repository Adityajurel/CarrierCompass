import ResumeCard from "./ResumeCard";

function QuestionSection({ title, questions }) {

  if (!questions || questions.length === 0) return null;

  return (

    <div>

      <h3 className="mb-4 text-xl font-bold text-cyan-400">
        {title}
      </h3>

      <ul className="space-y-3">

        {questions.map((question, index) => (

          <li
            key={index}
            className="rounded-lg border border-slate-700 bg-slate-800 p-4 text-slate-300"
          >
            {question}
          </li>

        ))}

      </ul>

    </div>

  );

}

function InterviewPreparationCard({ analysis }) {

  const interview = analysis?.interviewPreparation;

  return (

    <ResumeCard
      title="Interview Preparation"
      icon="🎤"
    >

      <div className="grid gap-8 lg:grid-cols-2">

        <QuestionSection
          title="Technical Questions"
          questions={interview?.technicalQuestions}
        />

        <QuestionSection
          title="HR Questions"
          questions={interview?.hrQuestions}
        />

      </div>

    </ResumeCard>

  );

}

export default InterviewPreparationCard;