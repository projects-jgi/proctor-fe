"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProctor } from '@/contexts/ProctorContext';
import {
    BarChart3,
    Building2,
    FileText,
    GraduationCap,
    Plus,
    Settings,
    TrendingUp,
    Users
} from 'lucide-react';
import { useEffect, useState } from "react";

interface School {
  id: string;
  name: string;
  code: string;
  address: string;
  phone: string;
  email: string;
  principal: string;
  establishedYear: number;
  isActive: boolean;
}

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
  enrolledStudents: any;
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  specializationId: string;
  departmentId: string;
  facultyId: string;
  questions: string[];
  totalMarks: number;
  duration: number;
  startTime: string;
  endTime: string;
  instructions: string;
  settings: any;
  createdAt: string;
  updatedAt: string;
}

export default function CampusDashboard() {
  const { currentUser, apiCall } = useProctor();
  const [schools, setSchools] = useState<School[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);

        // Mock data for dashboard
        const mockSchools: School[] = [
          {
            id: '1',
            name: 'Jain University School of Engineering',
            code: 'JUSE',
            address: 'Jain University, Bangalore',
            phone: '+91 9876543210',
            email: 'engineering@jainuniversity.ac.in',
            principal: 'Dr. Rajesh Kumar',
            establishedYear: 2010,
            isActive: true
          }
        ];

        const mockDepartments: Department[] = [
          {
            id: 'computer-science-it',
            name: 'Department of Computer Science & IT',
            code: 'CSIT',
            schoolId: '1',
            headOfDepartment: 'Dr. Priya Sharma',
            description: 'Leading department for computer science education',
            isActive: true
          }
        ];

        const mockSpecializations: Specialization[] = [
          {
            id: 'bca',
            name: 'Bachelor of Computer Applications',
            code: 'BCA',
            departmentId: 'computer-science-it',
            description: 'Comprehensive BCA program',
            duration: 6
          }
        ];

        const mockStudents: Student[] = [
          {
            id: '1',
            userId: 'user1',
            rollNumber: 'BCA2024001',
            specializationId: 'bca',
            departmentId: 'computer-science-it',
            schoolId: '1',
            semester: 4,
            enrollmentYear: 2024,
            examsTaken: 5,
            averageScore: 85.5,
            isActive: true,
            createdAt: new Date().toISOString()
          }
        ];

        const mockFaculties: Faculty[] = [
          {
            id: '1',
            userId: 'faculty1',
            employeeId: 'FAC001',
            departmentId: 'computer-science-it',
            designation: 'Associate Professor',
            qualification: 'PhD Computer Science',
            experience: 8,
            isActive: true,
            createdAt: new Date().toISOString()
          }
        ];

        const mockExams: Exam[] = [
          {
            id: '1',
            title: 'Data Structures Final Exam',
            description: 'Comprehensive exam covering all data structures topics',
            type: 'private',
            specializationId: 'bca',
            departmentId: 'computer-science-it',
            facultyId: '1',
            questions: ['q1', 'q2', 'q3'],
            totalMarks: 100,
            duration: 120,
            startTime: new Date(Date.now() + 86400000).toISOString(),
            endTime: new Date(Date.now() + 86400000 + 7200000).toISOString(),
            instructions: 'Answer all questions',
            status: 'published',
            settings: {
              allowTabSwitch: false,
              allowCopyPaste: false,
              showResults: true,
              maxViolations: 3
            },
            enrolledStudents: ['1'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];

        setSchools(mockSchools);
        setDepartments(mockDepartments);
        setSpecializations(mockSpecializations);
        setStudents(mockStudents);
        setFaculties(mockFaculties);
        setExams(mockExams);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUser]);

  const stats = {
    schools: schools.length,
    departments: departments.length,
    specializations: specializations.length,
    students: students.length,
    faculties: faculties.length,
    activeExams: exams.filter(e => e.status === 'active' || e.status === 'published').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Campus Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {currentUser?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Reports
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Schools</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.schools}</div>
              <p className="text-xs text-muted-foreground">Total institutions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.departments}</div>
              <p className="text-xs text-muted-foreground">Across all schools</p>
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
              <CardTitle className="text-sm font-medium">Faculty</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.faculties}</div>
              <p className="text-xs text-muted-foreground">Teaching staff</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Specializations</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.specializations}</div>
              <p className="text-xs text-muted-foreground">Academic programs</p>
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

        {/* Main Content Tabs */}
        <Tabs defaultValue="schools" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="schools">Schools</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
          </TabsList>

          <TabsContent value="schools" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Schools Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add School
              </Button>
            </div>
            <div className="grid gap-4">
              {schools.map((school) => (
                <Card key={school.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{school.name}</CardTitle>
                        <CardDescription>{school.address}</CardDescription>
                      </div>
                      <Badge variant={school.isActive ? "default" : "secondary"}>
                        {school.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Code</p>
                        <p className="font-medium">{school.code}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Principal</p>
                        <p className="font-medium">{school.principal}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Phone</p>
                        <p className="font-medium">{school.phone}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Established</p>
                        <p className="font-medium">{school.establishedYear}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Departments Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Department
              </Button>
            </div>
            <div className="grid gap-4">
              {departments.map((dept) => {
                const school = schools.find(s => s.id === dept.schoolId);
                return (
                  <Card key={dept.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{dept.name}</CardTitle>
                          <CardDescription>{school?.name} • {dept.headOfDepartment}</CardDescription>
                        </div>
                        <Badge variant={dept.isActive ? "default" : "secondary"}>
                          {dept.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{dept.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">User Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
            <div className="grid gap-4">
              {/* User management interface would go here */}
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    User management interface coming soon...
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="exams" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Exam Dashboard</h2>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                View All Exams
              </Button>
            </div>
            <div className="grid gap-4">
              {exams.slice(0, 5).map((exam) => {
                const department = departments.find(d => d.id === exam.departmentId);
                return (
                  <Card key={exam.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{exam.title}</CardTitle>
                          <CardDescription>{department?.name} • {exam.type}</CardDescription>
                        </div>
                        <Badge variant={
                          exam.status === 'published' ? 'default' :
                          exam.status === 'active' ? 'secondary' :
                          exam.status === 'completed' ? 'outline' : 'destructive'
                        }>
                          {exam.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Duration</p>
                          <p className="font-medium">{exam.duration} min</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Students</p>
                          <p className="font-medium">{exam.enrolledStudents.length}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Start Time</p>
                          <p className="font-medium">{new Date(exam.startTime).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Marks</p>
                          <p className="font-medium">{exam.totalMarks}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}