"use client";

import { DepartmentLayout } from "@/components/DepartmentLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useProctor } from "@/contexts/ProctorContext";
import { Download, Eye } from "lucide-react";
import { useState } from "react";

type DepartmentResult = {
    id: string;
    studentName: string;
    studentRollNumber: string;
    examName: string;
    score: number;
    totalMarks: number;
    percentage: number;
    grade: string;
    status: 'passed' | 'failed';
    submittedAt: string;
    facultyName: string;
};

function DepartmentResults() {
    const { exams } = useProctor();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedExam, setSelectedExam] = useState<string>('all');
    const [selectedGrade, setSelectedGrade] = useState<string>('all');

    // Mock data for department results
    const mockResults: DepartmentResult[] = [
        {
            id: '1',
            studentName: 'John Doe',
            studentRollNumber: 'CS001',
            examName: 'Data Structures Final',
            score: 85,
            totalMarks: 100,
            percentage: 85,
            grade: 'A',
            status: 'passed',
            submittedAt: new Date().toISOString(),
            facultyName: 'Dr. Smith'
        },
        {
            id: '2',
            studentName: 'Jane Smith',
            studentRollNumber: 'CS002',
            examName: 'Algorithms Mid-term',
            score: 72,
            totalMarks: 100,
            percentage: 72,
            grade: 'B',
            status: 'passed',
            submittedAt: new Date().toISOString(),
            facultyName: 'Dr. Johnson'
        },
        {
            id: '3',
            studentName: 'Bob Wilson',
            studentRollNumber: 'CS003',
            examName: 'Database Systems',
            score: 45,
            totalMarks: 100,
            percentage: 45,
            grade: 'F',
            status: 'failed',
            submittedAt: new Date().toISOString(),
            facultyName: 'Dr. Brown'
        }
    ];

    // Filter results
    const filteredResults = mockResults.filter(result => {
        const matchesSearch = result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            result.studentRollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            result.examName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesExam = selectedExam === 'all' || result.examName === selectedExam;
        const matchesGrade = selectedGrade === 'all' ||
                           (selectedGrade === 'F' ? result.status === 'failed' : result.grade.startsWith(selectedGrade));

        return matchesSearch && matchesExam && matchesGrade;
    });

    return (
        <DepartmentLayout
            title="Department Results"
            subtitle="View and manage student exam results"
        >
            <div className="container mx-auto py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Department Results</h1>
                    <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export Results
                    </Button>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Filter Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <Input
                                    placeholder="Search by student name, roll number, or exam..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                            <Select value={selectedExam} onValueChange={setSelectedExam}>
                                <SelectTrigger className="w-full md:w-48">
                                    <SelectValue placeholder="All Exams" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Exams</SelectItem>
                                    {exams.map(exam => (
                                        <SelectItem key={exam.id} value={exam.title}>
                                            {exam.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                                <SelectTrigger className="w-full md:w-32">
                                    <SelectValue placeholder="All Grades" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Grades</SelectItem>
                                    <SelectItem value="A">A Grade</SelectItem>
                                    <SelectItem value="B">B Grade</SelectItem>
                                    <SelectItem value="C">C Grade</SelectItem>
                                    <SelectItem value="D">D Grade</SelectItem>
                                    <SelectItem value="F">F Grade</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Results Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Exam Results ({filteredResults.length})</CardTitle>
                        <CardDescription>
                            View and manage department-wide exam results
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Exam</TableHead>
                                    <TableHead>Faculty</TableHead>
                                    <TableHead>Score</TableHead>
                                    <TableHead>Grade</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Submitted</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredResults.map((result) => (
                                    <TableRow key={result.id}>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{result.studentName}</div>
                                                <div className="text-sm text-muted-foreground">{result.studentRollNumber}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{result.examName}</TableCell>
                                        <TableCell>{result.facultyName}</TableCell>
                                        <TableCell>{result.score}/{result.totalMarks} ({result.percentage}%)</TableCell>
                                        <TableCell>
                                            <Badge variant={result.grade === 'F' ? 'destructive' : 'default'}>
                                                {result.grade}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={result.status === 'passed' ? 'default' : 'destructive'}>
                                                {result.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{new Date(result.submittedAt).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="sm">
                                                <Eye className="w-4 h-4" />
                                            </Button>
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

export default DepartmentResults;