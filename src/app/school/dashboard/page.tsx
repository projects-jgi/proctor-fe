"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SchoolLayout } from "@/components/SchoolLayout";
import { useProctor } from '@/contexts/ProctorContext';
import {
    Building2,
    Users,
    FileText,
    TrendingUp,
    ArrowRight,
    Clock,
    Calendar,
    AlertCircle,
    BarChart3,
    Plus
} from 'lucide-react';
import Link from 'next/link';

function SchoolDashboard() {
  const {
    currentUser,
    faculties,
    exams,
    results,
    students,
    departments
  } = useProctor();

  const stats = {
    departments: departments.length,
    faculty: faculties.length,
    students: students.length,
    exams: exams.length,
    activeExams: exams.filter(e => e.status === 'active' || e.status === 'published').length,
    completedResults: results.filter(r => r.status === 'passed' || r.status === 'failed').length
  };

  // Get upcoming exams (next 7 days)
  const upcomingExams = exams
    .filter(exam => {
      const examDate = new Date(exam.startTime);
      const now = new Date();
      const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      return examDate >= now && examDate <= nextWeek && exam.status !== 'completed';
    })
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .slice(0, 3);

  // Get recent results (last 5)
  const recentResults = results
    .sort((a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime())
    .slice(0, 5);

  return (
    <SchoolLayout
      title="School Dashboard"
      subtitle="School of CS&IT Administration"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.departments}</div>
            <p className="text-xs text-muted-foreground">MCA, MSC, BCA</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faculty</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.faculty}</div>
            <p className="text-xs text-muted-foreground">Teaching staff</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.students}</div>
            <p className="text-xs text-muted-foreground">Enrolled students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Exams</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeExams}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
      </div>

      {/* Departments Overview & Faculty Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Departments Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="h-5 w-5 mr-2" />
              Departments Overview
            </CardTitle>
            <CardDescription>Academic departments in School of CS&IT</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departments.map((dept) => {
                const deptFaculty = faculties.filter(f => f.departmentId === dept.id);
                const deptStudents = students.filter(s => s.departmentId === dept.id);

                return (
                  <div key={dept.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{dept.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {deptFaculty.length} faculty • {deptStudents.length} students
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">
                        {dept.code}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Link href="/school/departments">
                <Button variant="outline" className="w-full">
                  Manage Departments
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Faculty Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Faculty Overview
            </CardTitle>
            <CardDescription>Faculty distribution by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departments.map((dept) => {
                const deptFaculty = faculties.filter(f => f.departmentId === dept.id);

                return (
                  <div key={dept.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{dept.code} Department</h4>
                      <p className="text-xs text-muted-foreground">
                        {deptFaculty.length} faculty members
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="default" className="text-xs">
                        {deptFaculty.length}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Link href="/school/faculty">
                <Button variant="outline" className="w-full">
                  View All Faculty
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest school activities and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {exams.slice(0, 3).map((exam) => {
              const department = departments.find(d => d.id === exam.departmentId);
              return (
                <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{exam.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {department?.name} • {exam.questions.length} questions • {exam.enrolledStudents.length} students
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
              );
            })}
            {exams.length === 0 && (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No exams yet</h3>
                <p className="text-muted-foreground mb-4">School exams will appear here</p>
                <Link href="/school/exams">
                  <Button>View Exams</Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </SchoolLayout>
  );
}

export default SchoolDashboard;