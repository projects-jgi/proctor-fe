"use client";

import { SchoolLayout } from "@/components/SchoolLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useProctor } from "@/contexts/ProctorContext";
import { Building, Calendar, Edit, Eye, Plus, Users } from "lucide-react";
import { useState } from "react";

type SchoolExam = {
    id: string;
    title: string;
    description: string;
    department: string;
    facultyName: string;
    startTime: string;
    endTime: string;
    duration: number;
    totalStudents: number;
    status: 'draft' | 'published' | 'ongoing' | 'completed';
    type: 'public' | 'private';
    averageScore?: number;
};

function SchoolExams() {
    const { exams } = useProctor();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');

    // Mock data for school exams
    const mockExams: SchoolExam[] = [
        {
            id: '1',
            title: 'Data Structures Final Exam',
            description: 'Comprehensive final examination covering all data structures topics',
            department: 'Computer Science',
            facultyName: 'Dr. Smith',
            startTime: new Date(Date.now() + 86400000).toISOString(),
            endTime: new Date(Date.now() + 86400000 + 7200000).toISOString(),
            duration: 120,
            totalStudents: 45,
            status: 'published',
            type: 'public',
            averageScore: 82
        },
        {
            id: '2',
            title: 'Algorithms Mid-term',
            description: 'Mid-term examination on algorithm design and analysis',
            department: 'Computer Science',
            facultyName: 'Dr. Johnson',
            startTime: new Date(Date.now() + 172800000).toISOString(),
            endTime: new Date(Date.now() + 172800000 + 3600000).toISOString(),
            duration: 60,
            totalStudents: 42,
            status: 'ongoing',
            type: 'public'
        },
        {
            id: '3',
            title: 'Database Systems Quiz',
            description: 'Weekly quiz on SQL and database concepts',
            department: 'Information Technology',
            facultyName: 'Dr. Brown',
            startTime: new Date(Date.now() - 86400000).toISOString(),
            endTime: new Date(Date.now() - 86400000 + 1800000).toISOString(),
            duration: 30,
            totalStudents: 38,
            status: 'completed',
            type: 'private',
            averageScore: 78
        },
        {
            id: '4',
            title: 'Calculus Final Exam',
            description: 'Advanced calculus concepts and applications',
            department: 'Mathematics',
            facultyName: 'Dr. Wilson',
            startTime: new Date(Date.now() + 259200000).toISOString(),
            endTime: new Date(Date.now() + 259200000 + 9000000).toISOString(),
            duration: 150,
            totalStudents: 52,
            status: 'draft',
            type: 'public'
        },
        {
            id: '5',
            title: 'Physics Lab Assessment',
            description: 'Practical assessment for physics laboratory work',
            department: 'Physics',
            facultyName: 'Dr. Davis',
            startTime: new Date(Date.now() + 345600000).toISOString(),
            endTime: new Date(Date.now() + 345600000 + 7200000).toISOString(),
            duration: 120,
            totalStudents: 28,
            status: 'published',
            type: 'private'
        }
    ];

    // Filter exams
    const filteredExams = mockExams.filter(exam => {
        const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            exam.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            exam.facultyName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment = selectedDepartment === 'all' || exam.department === selectedDepartment;
        const matchesStatus = selectedStatus === 'all' || exam.status === selectedStatus;

        return matchesSearch && matchesDepartment && matchesStatus;
    });

    const departments = [
        'Computer Science',
        'Information Technology',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
        'English',
        'History'
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'draft':
                return <Badge variant="secondary">Draft</Badge>;
            case 'published':
                return <Badge variant="default">Published</Badge>;
            case 'ongoing':
                return <Badge variant="destructive">Ongoing</Badge>;
            case 'completed':
                return <Badge variant="outline">Completed</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <SchoolLayout>
            <div className="container mx-auto py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">School Exams</h1>
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Exam
                    </Button>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Filter Exams</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <Input
                                    placeholder="Search by exam title, description, or faculty..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                                <SelectTrigger className="w-full md:w-48">
                                    <SelectValue placeholder="All Departments" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Departments</SelectItem>
                                    {departments.map(dept => (
                                        <SelectItem key={dept} value={dept}>
                                            {dept}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger className="w-full md:w-40">
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="ongoing">Ongoing</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Exams Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Exams ({filteredExams.length})</CardTitle>
                        <CardDescription>
                            Monitor and manage all exams across departments
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Exam Details</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Faculty</TableHead>
                                    <TableHead>Schedule</TableHead>
                                    <TableHead>Students</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Performance</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredExams.map((exam) => (
                                    <TableRow key={exam.id}>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{exam.title}</div>
                                                <div className="text-sm text-muted-foreground">{exam.description}</div>
                                                <div className="text-xs text-muted-foreground mt-1">
                                                    {exam.duration} minutes • {exam.type}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Building className="w-4 h-4" />
                                                {exam.department}
                                            </div>
                                        </TableCell>
                                        <TableCell>{exam.facultyName}</TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(exam.startTime).toLocaleDateString()}
                                                </div>
                                                <div className="text-muted-foreground">
                                                    {new Date(exam.startTime).toLocaleTimeString()} - {new Date(exam.endTime).toLocaleTimeString()}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                {exam.totalStudents}
                                            </div>
                                        </TableCell>
                                        <TableCell>{getStatusBadge(exam.status)}</TableCell>
                                        <TableCell>
                                            {exam.averageScore ? (
                                                <div className="text-sm font-medium">
                                                    {exam.averageScore}%
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="sm">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </SchoolLayout>
    );
}

export default SchoolExams;