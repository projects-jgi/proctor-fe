"use client";

import { FacultyLayout } from "@/components/FacultyLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useProctor } from '@/contexts/ProctorContext';
import {
    ArrowRight,
    BarChart3,
    BookOpen,
    Calendar,
    CheckCircle,
    Clock,
    FileText,
    TrendingUp,
    Users
} from 'lucide-react';
import Link from 'next/link';

function FacultyDashboard() {
  const {
    currentUser,
    faculties,
    exams,
    results,
    students,
    getExamsForFaculty
  } = useProctor();

  // Find current faculty
  const currentFaculty = faculties.find(f => f.userId === currentUser?.id);
  const facultyExams = currentFaculty ? getExamsForFaculty(currentFaculty.id) : [];

  const facultyResults = currentFaculty ? results
    .filter(result => facultyExams.some(exam => exam.id === result.examId)) : [];

  const stats = {
    exams: facultyExams.length,
    publishedExams: facultyExams.filter(e => e.status === 'published').length,
    activeExams: facultyExams.filter(e => e.status === 'active').length,
    totalStudents: students.length,
    completedResults: facultyResults.filter(r => r.status === 'graded').length
  };

  // Get upcoming exams (next 7 days)
  const upcomingExams = facultyExams
    .filter(exam => {
      const examDate = new Date(exam.startTime);
      const now = new Date();
      const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      return examDate >= now && examDate <= nextWeek && exam.status !== 'completed';
    })
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .slice(0, 3);

  // Get recent results (last 5)
  const recentResults = facultyResults
    .sort((a, b) => {
      const dateA = a.generatedAt ? new Date(a.generatedAt).getTime() : 0;
      const dateB = b.generatedAt ? new Date(b.generatedAt).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  return (
    <FacultyLayout
      title="Faculty Dashboard"
      subtitle="Welcome back! Manage your teaching activities"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.exams}</div>
            <p className="text-xs text-muted-foreground">{stats.publishedExams} published</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Exams</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeExams}</div>
            <p className="text-xs text-muted-foreground">Running now</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Enrolled students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Results</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedResults}</div>
            <p className="text-xs text-muted-foreground">Results processed</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Exams & Recent Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Upcoming Exams */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Upcoming Exams
            </CardTitle>
            <CardDescription>Exams scheduled to start in the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingExams.length > 0 ? (
                upcomingExams.map((exam) => {
                  const examDate = new Date(exam.startTime);
                  const timeUntil = Math.ceil((examDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={exam.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{exam.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {examDate.toLocaleDateString()} • {exam.questions.length} questions
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs">
                          {timeUntil === 1 ? 'Tomorrow' : `${timeUntil} days`}
                        </Badge>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-6">
                  <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No upcoming exams</p>
                </div>
              )}
            </div>
            {upcomingExams.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <Link href="/faculty/exams">
                  <Button variant="outline" className="w-full">
                    View All Exams
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Recent Results
            </CardTitle>
            <CardDescription>Latest student exam submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentResults.length > 0 ? (
                recentResults.map((result) => {
                  const exam = exams.find(e => e.id === result.examId);
                  const student = students.find(s => s.id === result.studentId);
                  
                  return (
                    <div key={result.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{student?.userId || 'Unknown Student'}</h4>
                        <p className="text-xs text-muted-foreground">
                          {exam?.title || 'Unknown Exam'} • {result.generatedAt ? new Date(result.generatedAt).toLocaleDateString() : 'Unknown Date'}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={result.grade === 'A' || result.grade === 'B' ? 'default' : 
                                  result.grade === 'C' || result.grade === 'D' ? 'secondary' : 'destructive'}
                          className="text-xs"
                        >
                          {result.grade} ({result.percentage}%)
                        </Badge>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-6">
                  <TrendingUp className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No recent results</p>
                </div>
              )}
            </div>
            {recentResults.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <Link href="/faculty/results">
                  <Button variant="outline" className="w-full">
                    View All Results
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest exam activities and results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {facultyExams.slice(0, 3).map((exam) => (
              <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{exam.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {exam.status} • {exam.questions.length} questions • {exam.enrolledStudents.length} students
                  </p>
                </div>
                <Badge variant={
                  exam.status === 'published' ? 'default' :
                  exam.status === 'active' ? 'secondary' :
                  exam.status === 'completed' ? 'outline' : 'destructive'
                }>
                  {exam.status}
                </Badge>
              </div>
            ))}
            {facultyExams.length === 0 && (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No exams yet</h3>
                <p className="text-muted-foreground mb-4">Start by creating your first exam</p>
                <Link href="/faculty/exams">
                  <Button>Create Exam</Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </FacultyLayout>
  );
}

export default FacultyDashboard;