"use client";

import { FacultyLayout } from "@/components/FacultyLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useProctor } from '@/contexts/ProctorContext';
import {
    Award,
    Clock,
    FileText,
    Target,
    TrendingDown,
    TrendingUp,
    User,
    ArrowLeft
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type FacultyResult = {
  id: string;
  examName: string;
  studentName: string;
  studentRollNumber: string;
  score: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  status: 'passed' | 'failed' | 'pending-review';
  feedback?: string;
  submittedAt: string;
  examDate: string;
  specialization: string;
};

export default function ResultDetailsPage() {
  const params = useParams();
  const resultId = params?.resultId as string;
  const router = useRouter();
  const { exams } = useProctor();

  const [result, setResult] = useState<FacultyResult | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data for faculty results - in real app this would come from API
  const mockResults: FacultyResult[] = [
    {
      id: '1',
      examName: 'Data Structures Final Exam',
      studentName: 'John Doe',
      studentRollNumber: 'CS001',
      score: 85,
      totalMarks: 100,
      percentage: 85,
      grade: 'A',
      status: 'passed' as const,
      submittedAt: new Date().toISOString(),
      examDate: new Date().toISOString(),
      specialization: 'Computer Science'
    },
    {
      id: '2',
      examName: 'Algorithms Mid-term',
      studentName: 'Jane Smith',
      studentRollNumber: 'CS002',
      score: 72,
      totalMarks: 100,
      percentage: 72,
      grade: 'B',
      status: 'passed' as const,
      submittedAt: new Date().toISOString(),
      examDate: new Date().toISOString(),
      specialization: 'Computer Science'
    },
    {
      id: '3',
      examName: 'Database Systems',
      studentName: 'Bob Johnson',
      studentRollNumber: 'CS003',
      score: 45,
      totalMarks: 100,
      percentage: 45,
      grade: 'F',
      status: 'failed' as const,
      submittedAt: new Date().toISOString(),
      examDate: new Date().toISOString(),
      specialization: 'Computer Science'
    }
  ];

  useEffect(() => {
    // Find the result by ID
    const foundResult = mockResults.find(r => r.id === resultId);
    if (foundResult) {
      setResult(foundResult);
    }
    setLoading(false);
  }, [resultId]);

  const getGradeColor = (grade: string) => {
    if (grade === 'A') return 'bg-green-100 text-green-800';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending-review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <FacultyLayout>
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading result details...</p>
          </div>
        </div>
      </FacultyLayout>
    );
  }

  if (!result) {
    return (
      <FacultyLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-foreground">Result Not Found</h2>
          <p className="text-muted-foreground mt-2">The requested result could not be found.</p>
          <Button
            onClick={() => router.push('/faculty/results')}
            className="mt-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Results
          </Button>
        </div>
      </FacultyLayout>
    );
  }

  return (
    <FacultyLayout>
      <section className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Exam Result Details</h1>
            <p className="text-muted-foreground mt-2">Detailed performance analysis for {result.studentName}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push('/faculty/results')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Results
          </Button>
        </div>

        {/* Student and Exam Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-4 h-4" />
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{result.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Roll Number:</span>
                <span className="font-medium">{result.studentRollNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Specialization:</span>
                <span className="font-medium">{result.specialization}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Exam Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Exam:</span>
                <span className="font-medium">{result.examName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Submitted:</span>
                <span className="font-medium">{new Date(result.submittedAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  90 minutes
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {result.score}/{result.totalMarks}
                </div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {result.percentage}%
                </div>
                <div className="text-sm text-muted-foreground">Percentage</div>
              </div>
              <div className="text-center">
                <Badge className={`text-lg px-3 py-1 ${getGradeColor(result.grade)}`}>
                  {result.grade}
                </Badge>
                <div className="text-sm text-muted-foreground mt-1">Grade</div>
              </div>
              <div className="text-center">
                <Badge className={`text-lg px-3 py-1 ${getStatusColor(result.status)}`}>
                  {result.status === 'passed' ? 'Passed' :
                   result.status === 'failed' ? 'Failed' : 'Pending Review'}
                </Badge>
                <div className="text-sm text-muted-foreground mt-1">Status</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question-wise Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Question-wise Analysis</CardTitle>
            <CardDescription>Detailed breakdown of individual question performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Mock question data - in real app this would come from the result */}
              {[
                { id: 1, question: "What is a Stack data structure?", marks: 5, obtained: 5, timeSpent: "2:30", difficulty: "Easy" },
                { id: 2, question: "Explain binary search algorithm with example", marks: 10, obtained: 8, timeSpent: "5:45", difficulty: "Medium" },
                { id: 3, question: "What are the advantages of linked lists over arrays?", marks: 5, obtained: 3, timeSpent: "3:15", difficulty: "Medium" },
                { id: 4, question: "Implement a queue using two stacks", marks: 10, obtained: 0, timeSpent: "8:20", difficulty: "Hard" },
                { id: 5, question: "What is the time complexity of quicksort?", marks: 5, obtained: 5, timeSpent: "1:50", difficulty: "Easy" },
                { id: 6, question: "Explain the concept of dynamic programming", marks: 10, obtained: 6, timeSpent: "6:30", difficulty: "Hard" }
              ].map((question) => (
                <div key={question.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">Question {question.id}: {question.question}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-4 mt-1">
                      <span>Difficulty: {question.difficulty}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {question.timeSpent}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {question.obtained}/{question.marks}
                    </div>
                    <div className={`text-sm ${question.obtained === question.marks ? 'text-green-600' :
                                             question.obtained >= question.marks * 0.5 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {question.obtained === question.marks ? 'Correct' :
                       question.obtained > 0 ? 'Partial' : 'Incorrect'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feedback Section */}
        {result.feedback && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Faculty Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground italic">"{result.feedback}"</p>
            </CardContent>
          </Card>
        )}

        {/* Proctoring Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Exam Session Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Start Time:</span>
                <div className="font-medium">{new Date(result.examDate).toLocaleString()}</div>
              </div>
              <div>
                <span className="text-muted-foreground">End Time:</span>
                <div className="font-medium">{new Date(new Date(result.examDate).getTime() + 90 * 60000).toLocaleString()}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Violations:</span>
                <div className="font-medium text-green-600">None detected</div>
              </div>
              <div>
                <span className="text-muted-foreground">Browser:</span>
                <div className="font-medium">Chrome 120.0</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </FacultyLayout>
  );
}