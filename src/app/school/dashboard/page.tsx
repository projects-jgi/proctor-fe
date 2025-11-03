"use client";

import { SchoolLayout } from "@/components/SchoolLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useProctor } from "@/contexts/ProctorContext";
import { Award, BookOpen, Building, GraduationCap, TrendingUp, Users } from "lucide-react";

function SchoolDashboard() {
    const { students, exams, faculties } = useProctor();

    // Mock data for school dashboard
    const schoolStats = {
        totalStudents: students.length + 1250, // Mock additional students
        totalExams: exams.length + 45, // Mock additional exams
        totalFaculty: faculties.length + 85, // Mock additional faculty
        totalDepartments: 8,
        averageScore: 76,
        activeExams: 12
    };

    return (
        <SchoolLayout>
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">School Dashboard</h1>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{schoolStats.totalStudents.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">
                                <TrendingUp className="inline w-3 h-3 mr-1" />
                                +12% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{schoolStats.totalFaculty}</div>
                            <p className="text-xs text-muted-foreground">Across all departments</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Departments</CardTitle>
                            <Building className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{schoolStats.totalDepartments}</div>
                            <p className="text-xs text-muted-foreground">Academic departments</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{schoolStats.totalExams}</div>
                            <p className="text-xs text-muted-foreground">Scheduled this semester</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Exams</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{schoolStats.activeExams}</div>
                            <p className="text-xs text-muted-foreground">Currently running</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                            <Award className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{schoolStats.averageScore}%</div>
                            <p className="text-xs text-muted-foreground">School-wide average</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Exams</CardTitle>
                            <CardDescription>Latest exam activities across departments</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Data Structures Final Exam</p>
                                        <p className="text-sm text-muted-foreground">Computer Science • Dr. Smith</p>
                                    </div>
                                    <span className="text-sm text-green-600">Completed</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Algorithms Mid-term</p>
                                        <p className="text-sm text-muted-foreground">Computer Science • Dr. Johnson</p>
                                    </div>
                                    <span className="text-sm text-orange-600">Ongoing</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Database Systems Quiz</p>
                                        <p className="text-sm text-muted-foreground">Information Technology • Dr. Brown</p>
                                    </div>
                                    <span className="text-sm text-blue-600">Scheduled</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Department Performance</CardTitle>
                            <CardDescription>Average scores by department</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">Computer Science</span>
                                    <span className="text-green-600 font-bold">82%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">Information Technology</span>
                                    <span className="text-green-600 font-bold">78%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">Mathematics</span>
                                    <span className="text-yellow-600 font-bold">74%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">Physics</span>
                                    <span className="text-orange-600 font-bold">71%</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </SchoolLayout>
    );
}

export default SchoolDashboard;