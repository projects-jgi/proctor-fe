"use client";

import { DepartmentLayout } from "@/components/DepartmentLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useProctor } from "@/contexts/ProctorContext";
import { Calendar, Edit, Eye, Plus, Users } from "lucide-react";
import { useState } from "react";

type DepartmentExam = {
    id: string;
    title: string;
    description: string;
    facultyName: string;
    startTime: string;
    endTime: string;
    duration: number;
    totalStudents: number;
    status: 'draft' | 'published' | 'ongoing' | 'completed';
    type: 'public' | 'private';
};

function DepartmentExams() {
    const { exams } = useProctor();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [selectedFaculty, setSelectedFaculty] = useState<string>('all');

    // Mock data for department exams
    const mockExams: DepartmentExam[] = [
        {
            id: '1',
            title: 'Data Structures Final Exam',
            description: 'Comprehensive final examination covering all data structures topics',
            facultyName: 'Dr. Smith',
            startTime: new Date(Date.now() + 86400000).toISOString(),
            endTime: new Date(Date.now() + 86400000 + 7200000).toISOString(),
            duration: 120,
            totalStudents: 45,
            status: 'published',
            type: 'public'
        },
        {
            id: '2',
            title: 'Algorithms Mid-term',
            description: 'Mid-term examination on algorithm design and analysis',
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
            facultyName: 'Dr. Brown',
            startTime: new Date(Date.now() - 86400000).toISOString(),
            endTime: new Date(Date.now() - 86400000 + 1800000).toISOString(),
            duration: 30,
            totalStudents: 38,
            status: 'completed',
            type: 'private'
        }
    ];

    // Filter exams
    const filteredExams = mockExams.filter(exam => {
        const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            exam.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            exam.facultyName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === 'all' || exam.status === selectedStatus;
        const matchesFaculty = selectedFaculty === 'all' || exam.facultyName === selectedFaculty;

        return matchesSearch && matchesStatus && matchesFaculty;
    });

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
        <DepartmentLayout
            title="Department Exams"
            subtitle="Manage and monitor department examinations"
        >
            <div className="container mx-auto py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Department Exams</h1>
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
                            <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
                                <SelectTrigger className="w-full md:w-40">
                                    <SelectValue placeholder="All Faculty" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Faculty</SelectItem>
                                    <SelectItem value="Dr. Smith">Dr. Smith</SelectItem>
                                    <SelectItem value="Dr. Johnson">Dr. Johnson</SelectItem>
                                    <SelectItem value="Dr. Brown">Dr. Brown</SelectItem>
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
                            Manage and monitor all department exams
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Exam Details</TableHead>
                                    <TableHead>Faculty</TableHead>
                                    <TableHead>Schedule</TableHead>
                                    <TableHead>Students</TableHead>
                                    <TableHead>Status</TableHead>
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
        </DepartmentLayout>
    );
}

export default DepartmentExams;