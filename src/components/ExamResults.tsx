"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    AlertTriangle,
    Award,
    BarChart3,
    CheckCircle,
    Clock,
    FileText,
    Target,
    TrendingUp,
    Trophy,
    XCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface ExamResult {
  examId: string;
  studentId: string;
  attemptId: string;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  totalScore: number;
  maxScore: number;
  percentage: number;
  grade: string;
  timeTaken: number; // in minutes
  violations: number;
  submittedAt: string;
}

interface QuestionReview {
  id: number;
  text: string;
  selectedAnswer: string[];
  correctAnswer: string[];
  isCorrect: boolean;
  score: number;
  maxScore: number;
}

interface ExamResultsProps {
  result: ExamResult;
  questionReviews: QuestionReview[];
}

export const ExamResults: React.FC<ExamResultsProps> = ({ result, questionReviews }) => {
  const router = useRouter();

  const getGradeColor = (grade: string) => {
    switch (grade.toUpperCase()) {
      case 'A+': case 'A': return 'text-green-600 bg-green-50 border-green-200';
      case 'B+': case 'B': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'C+': case 'C': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'D+': case 'D': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'F': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPerformanceMessage = (percentage: number) => {
    if (percentage >= 90) return "Outstanding performance! 🎉";
    if (percentage >= 80) return "Excellent work! 👏";
    if (percentage >= 70) return "Good job! 👍";
    if (percentage >= 60) return "Satisfactory performance.";
    if (percentage >= 50) return "You passed, but there's room for improvement.";
    return "You need to retake this exam.";
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <CardTitle className="text-2xl md:text-3xl">Exam Results</CardTitle>
            </div>
            <p className="text-muted-foreground">
              Your performance summary and detailed analysis
            </p>
          </CardHeader>
        </Card>

        {/* Overall Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Overall Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Score Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1">
                  {result.percentage}%
                </div>
                <div className="text-sm text-muted-foreground">Percentage Score</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${result.percentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {result.correctAnswers}/{result.totalQuestions}
                </div>
                <div className="text-sm text-muted-foreground">Correct Answers</div>
              </div>

              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className={`text-3xl font-bold mb-1 px-3 py-1 rounded-full border ${getGradeColor(result.grade)}`}>
                  {result.grade}
                </div>
                <div className="text-sm text-muted-foreground">Grade</div>
              </div>
            </div>

            {/* Performance Message */}
            <div className="text-center p-4 bg-primary/5 rounded-lg border">
              <p className="text-lg font-medium">{getPerformanceMessage(result.percentage)}</p>
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">Total Score</span>
                </div>
                <div className="text-lg font-semibold">{result.totalScore}/{result.maxScore}</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Answered</span>
                </div>
                <div className="text-lg font-semibold">{result.answeredQuestions}/{result.totalQuestions}</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium">Time Taken</span>
                </div>
                <div className="text-lg font-semibold">{formatTime(result.timeTaken)}</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium">Violations</span>
                </div>
                <div className="text-lg font-semibold">{result.violations}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Proctoring Summary */}
        {result.violations > 0 && (
          <Card className="border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                Proctoring Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-medium mb-2">
                  {result.violations} proctoring violation{result.violations !== 1 ? 's' : ''} detected
                </p>
                <p className="text-red-700 text-sm">
                  Your exam was monitored throughout the session. The violations have been recorded
                  and may affect your final grade. Please review the exam policies for more information.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Question Review */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Question Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {questionReviews.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">Q{index + 1}</Badge>
                        <Badge variant={question.isCorrect ? "default" : "destructive"}>
                          {question.isCorrect ? (
                            <><CheckCircle className="w-3 h-3 mr-1" /> Correct</>
                          ) : (
                            <><XCircle className="w-3 h-3 mr-1" /> Incorrect</>
                          )}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {question.score}/{question.maxScore} points
                        </span>
                      </div>
                      <p className="text-sm font-medium mb-2">{question.text}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">YOUR ANSWER</p>
                      <div className="text-sm">
                        {question.selectedAnswer.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1">
                            {question.selectedAnswer.map((answer, idx) => (
                              <li key={idx}>{answer}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-muted-foreground italic">Not answered</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">CORRECT ANSWER</p>
                      <div className="text-sm">
                        <ul className="list-disc list-inside space-y-1">
                          {question.correctAnswer.map((answer, idx) => (
                            <li key={idx} className="text-green-700 font-medium">{answer}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push('/student/dashboard')}
                className="flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                Back to Dashboard
              </Button>

              <Button
                variant="outline"
                onClick={() => window.print()}
                className="flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Print Results
              </Button>

              <Button
                variant="outline"
                onClick={() => router.push('/student/exams')}
                className="flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                View All Exams
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExamResults;