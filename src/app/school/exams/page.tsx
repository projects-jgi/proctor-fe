"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SchoolLayout } from "@/components/SchoolLayout";
import { useProctor } from '@/contexts/ProctorContext';
import {
    FileText,
    Clock,
    Users,
    TrendingUp,
    Calendar,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';

function SchoolExams() {
  const { currentUser, exams, departments, faculties } = useProctor();

  // Get department name by ID
  const getDepartmentName = (departmentId: string) => {
    const dept = departments.find(d => d.id === departmentId);
    return dept ? dept.name : 'Unknown Department';
  };

  // Get faculty name by ID
  const getFacultyName = (facultyId: string) => {
    const faculty = faculties.find(f => f.id === facultyId);
    return faculty ? faculty.employeeId : 'Unknown Faculty';
  };

  // Get upcoming exams (next 7 days)
  const upcomingExams = exams
    .filter(exam => {
      const examDate = new Date(exam.startTime);
      const now = new Date();
      const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      return examDate >= now && examDate <= nextWeek && exam.status !== 'completed';
    })
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  // Get recent exams (last 10)
  const recentExams = exams
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  return (
    <SchoolLayout
      title="Exam Monitoring"
      subtitle="School of CS&IT - Monitor all exams and their progress"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exams.length}</div>
            <p className="text-xs text-muted-foreground">All departments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Exams</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exams.filter(e => e.status === 'published').length}</div>
            <p className="text-xs text-muted-foreground">Available to students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Exams</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exams.filter(e => e.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {exams.reduce((total, exam) => total + exam.enrolledStudents.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Enrolled across exams</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Exams & Recent Exams */}
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
                          {getDepartmentName(exam.departmentId)} • {exam.questions.length} questions
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Faculty: {getFacultyName(exam.facultyId)}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs mb-1">
                          {timeUntil === 1 ? 'Tomorrow' : `${timeUntil} days`}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {examDate.toLocaleDateString()}
                        </p>
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
          </CardContent>
        </Card>

        {/* Recent Exams */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Recent Exams
            </CardTitle>
            <CardDescription>Latest exams created in the school</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentExams.length > 0 ? (
                recentExams.map((exam) => (
                  <div key={exam.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{exam.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {getDepartmentName(exam.departmentId)} • {exam.questions.length} questions
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Faculty: {getFacultyName(exam.facultyId)}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          exam.status === 'published' ? 'default' :
                          exam.status === 'active' ? 'secondary' :
                          exam.status === 'completed' ? 'outline' : 'destructive'
                        }
                        className="text-xs mb-1"
                      >
                        {exam.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {exam.enrolledStudents.length} students
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No exams yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Exams List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>All Exams</CardTitle>
              <CardDescription>Complete list of all exams in School of CS&IT</CardDescription>
            </div>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              View Detailed Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {exams.length > 0 ? (
              exams.map((exam) => (
                <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium">{exam.title}</h4>
                      <Badge
                        variant={
                          exam.status === 'published' ? 'default' :
                          exam.status === 'active' ? 'secondary' :
                          exam.status === 'completed' ? 'outline' : 'destructive'
                        }
                      >
                        {exam.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Department:</span> {getDepartmentName(exam.departmentId)}
                      </div>
                      <div>
                        <span className="font-medium">Faculty:</span> {getFacultyName(exam.facultyId)}
                      </div>
                      <div>
                        <span className="font-medium">Questions:</span> {exam.questions.length}
                      </div>
                      <div>
                        <span className="font-medium">Students:</span> {exam.enrolledStudents.length}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>Duration: {exam.duration} min</span>
                      <span>•</span>
                      <span>Marks: {exam.totalMarks}</span>
                      <span>•</span>
                      <span>Start: {new Date(exam.startTime).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No exams found</h3>
                <p className="text-muted-foreground mb-4">
                  No exams have been created in the school yet.
                </p>
                <Button>
                  Create First Exam
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </SchoolLayout>
  );
}

export default SchoolExams;