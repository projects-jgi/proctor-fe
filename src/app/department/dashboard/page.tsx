"use client";

import { DepartmentLayout } from "@/components/DepartmentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DepartmentStudents from "@/containers/department/dashboard/DepartmentStudents";
import { useProctor } from "@/contexts/ProctorContext";
import { Award, BookOpen, GraduationCap, Users } from "lucide-react";

function DepartmentDashboard() {
    const { students, exams } = useProctor();

    // Mock data for department dashboard
    const departmentStats = {
        totalStudents: students.length,
        totalExams: exams.length,
        totalFaculty: 15,
        averageScore: 78
    };

    return (
        <DepartmentLayout
            title="Department Dashboard"
            subtitle="Overview of department activities and statistics"
        >
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Department Dashboard</h1>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{departmentStats.totalStudents}</div>
                            <p className="text-xs text-muted-foreground">Enrolled this semester</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{departmentStats.totalExams}</div>
                            <p className="text-xs text-muted-foreground">Scheduled this month</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Faculty Members</CardTitle>
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{departmentStats.totalFaculty}</div>
                            <p className="text-xs text-muted-foreground">Active faculty</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                            <Award className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{departmentStats.averageScore}%</div>
                            <p className="text-xs text-muted-foreground">Department average</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Students Management */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Student Management</h2>
                    <DepartmentStudents
                        students={students}
                        onAdd={(student) => console.log('Add student:', student)}
                        onUpdate={(id, student) => console.log('Update student:', id, student)}
                        onDelete={(id) => console.log('Delete student:', id)}
                    />
                </div>
            </div>
        </DepartmentLayout>
    );
}

export default DepartmentDashboard;