"use client";

import React, { useState } from 'react';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { getAllDepartments, getCoursesForDepartment, getDepartmentName } from '../../../lib/departments';

type Student = {
    id: string;
    name: string;
    email: string;
    phone: string;
    department: string;
    semester: string;
    examsTaken: number;
    averageScore: number;
};

interface DepartmentStudentsProps {
    students: Student[];
    onAdd: (student: Student) => void;
    onUpdate: (id: string, student: Partial<Student>) => void;
    onDelete: (id: string) => void;
}

function DepartmentStudents({ students, onAdd, onUpdate, onDelete }: DepartmentStudentsProps) {
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        semester: '1'
    });

    const departments = getAllDepartments();
    const availableCourses = formData.department ? getCoursesForDepartment(formData.department) : [];

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            department: '',
            semester: '1'
        });
        setEditingStudent(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingStudent) {
            onUpdate(editingStudent.id, formData);
            setEditingStudent(null);
        } else {
            const newStudent: Student = {
                id: `stu-${Date.now()}`,
                ...formData,
                examsTaken: 0,
                averageScore: 0
            };
            onAdd(newStudent);
        }
        resetForm();
    };

    const handleEdit = (student: Student) => {
        setEditingStudent(student);
        setFormData({
            name: student.name,
            email: student.email,
            phone: student.phone,
            department: student.department,
            semester: student.semester
        });
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this student?')) {
            onDelete(id);
        }
    };

    return (
        <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Student Management</h2>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Students List</CardTitle>
                    <CardDescription>Manage enrolled students and their progress</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Semester</TableHead>
                                <TableHead>Exams Taken</TableHead>
                                <TableHead>Avg Score</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell className="font-medium">{student.name}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>{getDepartmentName(student.department)}</TableCell>
                                    <TableCell>{student.semester}</TableCell>
                                    <TableCell>{student.examsTaken}</TableCell>
                                    <TableCell>
                                        <Badge variant={student.averageScore >= 80 ? 'default' : student.averageScore >= 60 ? 'secondary' : 'destructive'}>
                                            {student.averageScore}%
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(student)}>Edit</Button>
                                        <Button variant="outline" size="sm" onClick={() => handleDelete(student.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Edit Dialog */}
            {editingStudent && (
                <Dialog open={!!editingStudent} onOpenChange={() => setEditingStudent(null)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Student</DialogTitle>
                            <DialogDescription>
                                Update student details.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-name" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="edit-name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-email" className="text-right">
                                        Email
                                    </Label>
                                    <Input
                                        id="edit-email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-phone" className="text-right">
                                        Phone
                                    </Label>
                                    <Input
                                        id="edit-phone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-department" className="text-right">
                                        Department
                                    </Label>
                                    <Select
                                        value={formData.department}
                                        onValueChange={(value: string) => setFormData({ ...formData, department: value })}
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
                                    <Label htmlFor="edit-semester" className="text-right">
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
                                <Button type="submit">Update Student</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
        </section>
    )
}

export default DepartmentStudents