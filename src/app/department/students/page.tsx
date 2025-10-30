"use client";

import { Search, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import DepartmentStudents from '../../../containers/department/dashboard/DepartmentStudents';
import { DepartmentLayout } from '../../../components/DepartmentLayout';
import { useProctor } from '../../../contexts/ProctorContext';
import { getAllDepartments, getCoursesForDepartment } from '../../../lib/departments';

function page() {
    const { students, users, addStudent, updateStudent, deleteStudent } = useProctor();

    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState('all');
    const [selectedCourse, setSelectedCourse] = useState('all');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        course: '',
        semester: '1'
    });

    const departments = getAllDepartments();

    const availableCourses = selectedDepartment !== 'all' ? getCoursesForDepartment(selectedDepartment) : [];

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            department: '',
            course: '',
            semester: '1'
        });
        setIsAddModalOpen(false);
    };

        const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newStudent = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            department: formData.department,
            course: formData.course,
            rollNumber: `STU${Date.now()}`,
            examsTaken: 0,
            averageScore: 0
        };
        handleAddStudent(newStudent);
        resetForm();
    };

    // Map students to include user information and filter by selections
    const mappedStudents = students
        .filter(student => {
            // Filter by selected department
            if (selectedDepartment !== 'all' && student.departmentId !== selectedDepartment) {
                return false;
            }
            // Filter by selected course
            if (selectedCourse !== 'all' && student.departmentId !== selectedCourse) {
                return false;
            }
            return true;
        })
        .map(student => ({
            id: student.id,
            name: users.find(u => u.id === student.userId)?.name || 'Unknown',
            email: users.find(u => u.id === student.userId)?.email || 'Unknown',
            phone: users.find(u => u.id === student.userId)?.phone || 'Unknown',
            department: getAllDepartments().find(d => d.id === student.departmentId)?.name || 'Unknown',
            course: getCoursesForDepartment(student.departmentId).find(c => c.id === student.specializationId)?.name || 'Unknown',
            semester: student.semester.toString(),
            examsTaken: student.examsTaken,
            averageScore: student.averageScore
        }));

    const filteredStudents = mappedStudents.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.course.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Wrapper functions to handle type differences
    const handleAddStudent = (student: any) => {
        // Convert from DepartmentStudents format to global Student format
        const globalStudent = {
            userId: '', // Would need to create user first
            rollNumber: student.rollNumber || `STU${Date.now()}`,
            specializationId: student.course, // Course becomes specializationId
            departmentId: student.department,
            schoolId: 'school-1', // Default school
            semester: parseInt(student.semester) || 1,
            enrollmentYear: new Date().getFullYear(),
            examsTaken: 0,
            averageScore: 0,
            isActive: true
        };
        addStudent(globalStudent);
    };

    const handleUpdateStudent = (id: string, student: any) => {
        const updates: any = {};
        if (student.semester) updates.semester = parseInt(student.semester);
        if (student.examsTaken !== undefined) updates.examsTaken = student.examsTaken;
        if (student.averageScore !== undefined) updates.averageScore = student.averageScore;
        updateStudent(id, updates);
    };

    const handleDeleteStudent = (id: string) => {
        deleteStudent(id);
    };

    return (
        <DepartmentLayout
            title="Student Management"
            subtitle="Manage student enrollments and progress"
        >
            {/* Hierarchical Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                    <label className="text-sm font-medium mb-2 block">Department</label>
                    <Select value={selectedDepartment} onValueChange={(value) => {
                        setSelectedDepartment(value);
                        setSelectedCourse('all');
                    }}>
                        <SelectTrigger>
                            <SelectValue placeholder="All Departments" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Departments</SelectItem>
                            {departments.map((dept: any) => (
                                <SelectItem key={dept.id} value={dept.id}>
                                    {dept.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className="text-sm font-medium mb-2 block">Course</label>
                    <Select
                        value={selectedCourse}
                        onValueChange={(value) => {
                            setSelectedCourse(value);
                        }}
                        disabled={selectedDepartment === 'all'}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="All Courses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Courses</SelectItem>
                            {availableCourses.map((course: any) => (
                                <SelectItem key={course.id} value={course.id}>
                                    {course.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-end">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setSelectedDepartment('all');
                            setSelectedCourse('all');
                        }}
                        className="w-full"
                    >
                        Clear Filters
                    </Button>
                </div>
            </div>

            {/* Search and Add Student */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input 
                        placeholder="Search students..." 
                        className="pl-10" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button onClick={() => setIsAddModalOpen(true)}>
                    <UserPlus size={16} className="mr-2" />
                    Add Student
                </Button>
            </div>
            <DepartmentStudents
                students={filteredStudents}
                onAdd={handleAddStudent}
                onUpdate={handleUpdateStudent}
                onDelete={handleDeleteStudent}
            />

            {/* Add Student Modal */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Student</DialogTitle>
                        <DialogDescription>
                            Enter the details for the new student enrollment.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="col-span-3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="col-span-3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-right">
                                    Phone
                                </Label>
                                <Input
                                    id="phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="col-span-3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="department" className="text-right">
                                    Department
                                </Label>
                                <Select
                                    value={formData.department}
                                    onValueChange={(value: string) => setFormData({ ...formData, department: value, course: '' })}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {departments.map((dept: any) => (
                                            <SelectItem key={dept.id} value={dept.id}>
                                                {dept.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="course" className="text-right">
                                    Course
                                </Label>
                                <Select
                                    value={formData.course}
                                    onValueChange={(value: string) => setFormData({ ...formData, course: value })}
                                    disabled={!formData.department}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select course" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {getCoursesForDepartment(formData.department).map((course: any) => (
                                            <SelectItem key={course.id} value={course.id}>
                                                {course.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="semester" className="text-right">
                                    Semester
                                </Label>
                                <Select value={formData.semester} onValueChange={(value: string) => setFormData({ ...formData, semester: value })}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">1</SelectItem>
                                        <SelectItem value="2">2</SelectItem>
                                        <SelectItem value="3">3</SelectItem>
                                        <SelectItem value="4">4</SelectItem>
                                        <SelectItem value="5">5</SelectItem>
                                        <SelectItem value="6">6</SelectItem>
                                        <SelectItem value="7">7</SelectItem>
                                        <SelectItem value="8">8</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={resetForm}>
                                Cancel
                            </Button>
                            <Button type="submit">Add Student</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </DepartmentLayout>
    )
}

export default page