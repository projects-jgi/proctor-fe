"use client";
import { useRouter } from "next/navigation";

export default function SubmissionPage({ params }: { params: { testId: string } }) {
  const router = useRouter();
  const { testId } = params;

  const questions = [
    {
      id: "q1",
      text: "What is E[X]?",
      options: ["5", "10", "15", "20"],
      selected: "10",
      correct: "10",
      explanation: "E[X] is the expected value, calculated as the sum of x * P(X=x).",
    },
    {
      id: "q2",
      text: "Variance formula is?",
      options: ["Var(X)=E[X]^2", "Var(X)=E[X^2]-E[X]^2", "Var(X)=E[X]-E[X^2]"],
      selected: "Var(X)=E[X^2]-E[X]^2",
      correct: "Var(X)=E[X^2]-E[X]^2",
      explanation: "Variance measures the spread of the random variable from its mean.",
    },
    {
      id: "q3",
      text: "2 + 2 = ?",
      options: ["3", "4", "5"],
      selected: "3",
      correct: "4",
      explanation: "Basic arithmetic: 2 + 2 = 4.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-4">Submission for {testId}</h1>

      {questions.map((q) => {
        const isCorrect = q.selected === q.correct;
        return (
          <div key={q.id} className="mb-6 p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <p className="font-semibold mb-2">{q.text}</p>

            <ul className="space-y-2">
              {q.options.map((opt) => {
                const isSelected = opt === q.selected;
                const isAnswer = opt === q.correct;
                return (
                  <li
                    key={opt}
                    className={`p-2 rounded
                      ${isAnswer ? "bg-green-100 border border-green-400" : ""}
                      ${isSelected && !isAnswer ? "bg-red-100 border border-red-400" : ""}
                    `}
                  >
                    {opt} {isSelected ? "(your answer)" : ""}
                  </li>
                );
              })}
            </ul>

            <p className="mt-2 text-sm italic text-gray-700">
              {isCorrect
                ? "✅ Correct! " + q.explanation
                : `❌ Incorrect. Correct answer: ${q.correct}. ${q.explanation}`}
            </p>
          </div>
        );
      })}
    </div>
  );
}
