"use client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    <div className="max-w-3xl mx-auto p-6 mt-6">
      {/* Back Button */}
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => router.back()}
      >
        ← Back
      </Button>

      <h1 className="text-2xl font-bold mb-4">Submission for {testId}</h1>

      <div className="space-y-6">
        {questions.map((q) => {
          const isCorrect = q.selected === q.correct;
          return (
            <Card key={q.id} className="hover:shadow-md transition">
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  {q.text}
                  <Badge variant={isCorrect ? "success" : "destructive"}>
                    {isCorrect ? "Correct" : "Incorrect"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-2">
                  {q.options.map((opt) => {
                    const isSelected = opt === q.selected;
                    const isAnswer = opt === q.correct;
                    return (
                      <li
                        key={opt}
                        className={`p-2 rounded flex items-center gap-2 border
                          ${isAnswer ? "bg-green-100 border-green-400" : ""}
                          ${isSelected && !isAnswer ? "bg-red-100 border-red-400" : ""}
                        `}
                      >
                        <span>{opt}</span>
                        {isSelected && (
                          <Badge variant={isAnswer ? "success" : "secondary"}>your answer</Badge>
                        )}
                        {isAnswer && <Badge variant="success">correct</Badge>}
                      </li>
                    );
                  })}
                </ul>
                <p className="text-sm italic text-muted-foreground">
                  {isCorrect
                    ? "✅ Correct! " + q.explanation
                    : `❌ Incorrect. Correct answer: ${q.correct}. ${q.explanation}`}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
