"use client";

import {
  BookOpen,
  FileText,
  GraduationCap,
  Users,
  TrendingUp,
  Calendar,
  Award,
  Activity,
  BarChart3,
  Clock,
  Target,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Progress } from '../../../components/ui/progress';
import { DepartmentLayout } from '../../../components/DepartmentLayout';
import { useProctor } from '../../../contexts/ProctorContext';

interface Department {
  id: string;
  name: string;
  code: string;
  schoolId: string;
  headOfDepartment: string;
  description: string;
  isActive: boolean;
}

interface Specialization {
  id: string;
  name: string;
  code: string;
  departmentId: string;
  description: string;
  duration: number;
  isActive: boolean;
}

interface Student {
  id: string;
  rollNumber: string;
  semester: number;
  enrollmentYear: number;
  userId: string;
  departmentId: string;
  specializationId: string;
  schoolId: string;
  phone: string;
  examsTaken: number;
  averageScore: number;
  isActive: boolean;
  createdAt: string;
}

interface Faculty {
  id: string;
  employeeId: string;
  departmentId: string;
  specializationId?: string;
  designation: string;
  qualification: string;
  experience: number;
  userId: string;
  isActive: boolean;
  createdAt: string;
}

interface Exam {
  id: string;
  title: string;
  description: string;
  type: string;
  departmentId: string;
  specializationId: string;
  facultyId: string;
  questions: string[];
  duration: number;
  totalMarks: number;
  startTime: string;
  endTime: string;
  instructions: string;
  status: string;
  settings: any;
  enrolledStudents: string[];
  createdAt: string;
  updatedAt: string;
}

function DepartmentDashboard() {
  const { currentUser, apiCall, departments, specializations, students, faculties, exams } = useProctor();
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState<Department | null>(null);

  useEffect(() => {
    const fetchDepartmentData = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);

        // Find current department from context
        const currentDepartment = departments.length > 0 ? departments[0] : null;
        setDepartment(currentDepartment);

      } catch (error) {
        console.error('Error fetching department data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartmentData();
  }, [currentUser, departments]);

  // Filter data for current department
  const deptStudents = students.filter(s => s.departmentId === department?.id);
  const deptFaculties = faculties.filter(f => f.departmentId === department?.id);
  const deptSpecializations = specializations.filter(s => s.departmentId === department?.id);
  const deptExams = exams.filter(e => e.departmentId === department?.id);

  const stats = {
    students: deptStudents.length,
    faculties: deptFaculties.length,
    specializations: deptSpecializations.length,
    exams: deptExams.length,
    activeExams: deptExams.filter(e => e.status === 'active' || e.status === 'published').length
  };

  return (
    <DepartmentLayout
      title="Department Dashboard"
      subtitle="Comprehensive overview of department activities, students, faculty, and academic programs"
    >
      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-3xl" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.students}</div>
            <p className="text-xs text-muted-foreground">
              {deptStudents.filter(s => s.isActive).length} active students
            </p>
            <div className="mt-2">
              <Progress
                value={(deptStudents.filter(s => s.isActive).length / Math.max(stats.students, 1)) * 100}
                className="h-1"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-success/10 rounded-bl-3xl" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faculty Members</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.faculties}</div>
            <p className="text-xs text-muted-foreground">
              {deptFaculties.filter(f => f.isActive).length} active faculty
            </p>
            <div className="mt-2">
              <Progress
                value={(deptFaculties.filter(f => f.isActive).length / Math.max(stats.faculties, 1)) * 100}
                className="h-1"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-warning/10 rounded-bl-3xl" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Specializations</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.specializations}</div>
            <p className="text-xs text-muted-foreground">
              {deptSpecializations.filter(s => s.isActive).length} active programs
            </p>
            <div className="mt-2">
              <Progress
                value={(deptSpecializations.filter(s => s.isActive).length / Math.max(stats.specializations, 1)) * 100}
                className="h-1"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/50 rounded-bl-3xl" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.exams}</div>
            <p className="text-xs text-muted-foreground">{stats.activeExams} currently active</p>
            <div className="mt-2">
              <Progress
                value={(stats.activeExams / Math.max(stats.exams, 1)) * 100}
                className="h-1"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Student Performance
            </CardTitle>
            <CardDescription>Average scores across all exams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Average Score</span>
                <span className="text-2xl font-bold">
                  {deptStudents.length > 0
                    ? Math.round(deptStudents.reduce((acc, s) => acc + s.averageScore, 0) / deptStudents.length)
                    : 0}%
                </span>
              </div>
              <Progress
                value={deptStudents.length > 0
                  ? deptStudents.reduce((acc, s) => acc + s.averageScore, 0) / deptStudents.length
                  : 0}
                className="h-2"
              />
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-success">
                    {deptStudents.filter(s => s.averageScore >= 80).length}
                  </div>
                  <div className="text-xs text-muted-foreground">Excellent (80%+)</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-warning">
                    {deptStudents.filter(s => s.averageScore >= 60 && s.averageScore < 80).length}
                  </div>
                  <div className="text-xs text-muted-foreground">Good (60-79%)</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-destructive">
                    {deptStudents.filter(s => s.averageScore < 60).length}
                  </div>
                  <div className="text-xs text-muted-foreground">Needs Attention (&lt;60%)</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Exam Activity
            </CardTitle>
            <CardDescription>Recent exam statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Completion Rate</span>
                <span className="text-2xl font-bold">
                  {deptExams.length > 0
                    ? Math.round((deptExams.filter(e => e.status === 'completed').length / deptExams.length) * 100)
                    : 0}%
                </span>
              </div>
              <Progress
                value={deptExams.length > 0
                  ? (deptExams.filter(e => e.status === 'completed').length / deptExams.length) * 100
                  : 0}
                className="h-2"
              />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Active Exams</span>
                  <Badge variant="secondary">{stats.activeExams}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Completed Exams</span>
                  <Badge variant="outline">{deptExams.filter(e => e.status === 'completed').length}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Draft Exams</span>
                  <Badge variant="destructive">{deptExams.filter(e => e.status === 'draft').length}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Department Goals
            </CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Student Satisfaction</span>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold">87%</span>
                  <TrendingUp className="h-4 w-4 text-success" />
                </div>
              </div>
              <Progress value={87} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Faculty Engagement</span>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold">92%</span>
                  <TrendingUp className="h-4 w-4 text-success" />
                </div>
              </div>
              <Progress value={92} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Pass Rate Target</span>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold">85%</span>
                  <CheckCircle className="h-4 w-4 text-success" />
                </div>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest department activities and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deptExams.slice(0, 3).map((exam) => {
                const specialization = specializations.find(s => s.id === exam.specializationId);
                const faculty = faculties.find(f => f.id === exam.facultyId);
                return (
                  <div key={exam.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{exam.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {specialization?.name} • {faculty?.employeeId} • {new Date(exam.createdAt).toLocaleDateString()}
                      </p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {exam.status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
              {deptExams.length === 0 && (
                <div className="text-center py-6">
                  <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No recent exam activity</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Management Tabs */}
    </DepartmentLayout>
  );
}

export default DepartmentDashboard;