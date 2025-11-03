"use client";

import { SchoolLayout } from "@/components/SchoolLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useProctor } from "@/contexts/ProctorContext";
import { Edit, Eye, Mail, Phone, Plus } from "lucide-react";
import { useState } from "react";

type SchoolFaculty = {
    id: string;
    name: string;
    email: string;
    phone: string;
    department: string;
    designation: string;
    qualification: string;
    experience: number;
    status: 'active' | 'inactive';
    examsCreated: number;
    studentsTaught: number;
};

function SchoolFaculty() {
    const { faculties } = useProctor();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');

    // Mock data for school faculty
    const mockFaculty: SchoolFaculty[] = [
        {
            id: '1',
            name: 'Dr. John Smith',
            email: 'john.smith@university.edu',
            phone: '+1-555-0101',
            department: 'Computer Science',
            designation: 'Professor',
            qualification: 'Ph.D. Computer Science',
            experience: 15,
            status: 'active',
            examsCreated: 45,
            studentsTaught: 320
        },
        {
            id: '2',
            name: 'Dr. Sarah Johnson',
            email: 'sarah.johnson@university.edu',
            phone: '+1-555-0102',
            department: 'Information Technology',
            designation: 'Associate Professor',
            qualification: 'Ph.D. Information Technology',
            experience: 12,
            status: 'active',
            examsCreated: 38,
            studentsTaught: 280
        },
        {
            id: '3',
            name: 'Dr. Michael Brown',
            email: 'michael.brown@university.edu',
            phone: '+1-555-0103',
            department: 'Mathematics',
            designation: 'Assistant Professor',
            qualification: 'Ph.D. Mathematics',
            experience: 8,
            status: 'active',
            examsCreated: 29,
            studentsTaught: 195
        },
        {
            id: '4',
            name: 'Dr. Emily Davis',
            email: 'emily.davis@university.edu',
            phone: '+1-555-0104',
            department: 'Physics',
            designation: 'Lecturer',
            qualification: 'M.Sc. Physics',
            experience: 5,
            status: 'inactive',
            examsCreated: 15,
            studentsTaught: 120
        }
    ];

    // Filter faculty
    const filteredFaculty = mockFaculty.filter(faculty => {
        const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            faculty.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            faculty.department.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment = selectedDepartment === 'all' || faculty.department === selectedDepartment;
        const matchesStatus = selectedStatus === 'all' || faculty.status === selectedStatus;

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

    return (
        <SchoolLayout>
            <div className="container mx-auto py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">School Faculty</h1>
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Faculty
                    </Button>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Filter Faculty</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <Input
                                    placeholder="Search by name, email, or department..."
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
                                <SelectTrigger className="w-full md:w-32">
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Faculty Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Faculty Members ({filteredFaculty.length})</CardTitle>
                        <CardDescription>
                            Manage and monitor all faculty members across departments
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Faculty Details</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Qualification</TableHead>
                                    <TableHead>Experience</TableHead>
                                    <TableHead>Performance</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredFaculty.map((faculty) => (
                                    <TableRow key={faculty.id}>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{faculty.name}</div>
                                                <div className="text-sm text-muted-foreground flex items-center gap-1">
                                                    <Mail className="w-3 h-3" />
                                                    {faculty.email}
                                                </div>
                                                <div className="text-sm text-muted-foreground flex items-center gap-1">
                                                    <Phone className="w-3 h-3" />
                                                    {faculty.phone}
                                                </div>
                                                <div className="text-xs text-muted-foreground mt-1">
                                                    {faculty.designation}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{faculty.department}</TableCell>
                                        <TableCell>{faculty.qualification}</TableCell>
                                        <TableCell>{faculty.experience} years</TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                <div>{faculty.examsCreated} exams created</div>
                                                <div className="text-muted-foreground">{faculty.studentsTaught} students taught</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={faculty.status === 'active' ? 'default' : 'secondary'}>
                                                {faculty.status}
                                            </Badge>
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

export default SchoolFaculty;