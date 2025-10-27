"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ChevronLeft, HelpCircle, XCircle } from "lucide-react";
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

  const correctCount = questions.filter(q => q.selected === q.correct).length;
  const score = Math.round((correctCount / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Test Results
            </h1>
            <p className="text-gray-600">Detailed analysis of your performance</p>
          </div>
        </div>

        {/* Score Summary */}
        <Card className="mb-8 border-2 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">{score}%</div>
                <div className="text-sm text-gray-600">Overall Score</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Correct: {correctCount}</span>
                  <span>Incorrect: {questions.length - correctCount}</span>
                </div>
                {/* <Progress value={(correctCount / questions.length) * 100} className="h-2" /> */}
                <div className="text-xs text-gray-500 text-center">
                  {correctCount} out of {questions.length} questions
                </div>
              </div>
              <div className="text-center">
                <Badge 
                  variant={score >= 70 ? "default" : score >= 50 ? "secondary" : "destructive"}
                  className="text-lg px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                >
                  {score >= 70 ? "Excellent" : score >= 50 ? "Good" : "Needs Improvement"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((q, index) => {
            const isCorrect = q.selected === q.correct;
            return (
              <Card key={q.id} className={`border-l-4 ${
                isCorrect ? "border-l-green-500" : "border-l-red-500"
              } shadow-sm hover:shadow-md transition-all duration-200`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">Q{index + 1}</Badge>
                      <span className="flex-1">{q.text}</span>
                    </CardTitle>
                    <Badge 
                      variant={isCorrect ? "success" : "destructive"}
                      className="flex items-center gap-1"
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      {isCorrect ? "Correct" : "Incorrect"}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Options */}
                  <div className="grid gap-3">
                    {q.options.map((opt) => {
                      const isSelected = opt === q.selected;
                      const isAnswer = opt === q.correct;
                      
                      return (
                        <div
                          key={opt}
                          className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                            isAnswer 
                              ? "bg-green-50 border-green-300 shadow-sm" 
                              : isSelected 
                                ? "bg-red-50 border-red-300 shadow-sm"
                                : "bg-white border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`font-medium ${
                              isAnswer ? "text-green-800" : isSelected ? "text-red-800" : "text-gray-700"
                            }`}>
                              {opt}
                            </span>
                            <div className="flex items-center gap-2">
                              {isSelected && (
                                <Badge variant={isAnswer ? "success" : "destructive"} className="text-xs">
                                  Your Answer
                                </Badge>
                              )}
                              {isAnswer && !isSelected && (
                                <Badge variant="success" className="text-xs">
                                  Correct Answer
                                </Badge>
                              )}
                            </div>
                          </div>
                          {isAnswer && (
                            <div className="mt-2 p-2 rounded bg-green-100 border border-green-200">
                              <div className="flex items-start gap-2">
                                <HelpCircle className="w-4 h-4 mt-0.5 text-green-600" />
                                <div>
                                  <p className="text-sm font-medium text-green-800">
                                    {isCorrect ? "Great job! " : "Explanation: "}
                                  </p>
                                  <p className="text-sm text-green-700">
                                    {q.explanation}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="flex-1 hover:bg-gray-50 transition-colors"
          >
            Back to Results
          </Button>
          <Button 
            onClick={() => router.push('/student/dashboard')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}