"use client";

import { CalendarDays, Edit, Hourglass, Trash2, Users } from 'lucide-react';
import React, { useState } from 'react';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { getAllDepartments, getCourseName, getCoursesForDepartment, getDepartmentName } from '../../../lib/departments';

type Exam = {
    id: string;
    name: string;
    description: string;
    department: string;
    course: string;
    startDate: string;
    endDate: string;
    duration: string;
    enrolledStudents: number;
    status: 'active' | 'upcoming' | 'completed';
};

interface DepartmentExamsProps {
    exams: Exam[];
    onAdd: (exam: Exam) => void;
    onUpdate: (id: string, exam: Partial<Exam>) => void;
    onDelete: (id: string) => void;
}

function DepartmentExams({ exams, onAdd, onUpdate, onDelete }: DepartmentExamsProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingExam, setEditingExam] = useState<Exam | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        department: '',
        course: '',
        startDate: '',
        endDate: '',
        duration: '',
        status: 'upcoming' as Exam['status']
    });

    const departments = getAllDepartments();
    const availableCourses = formData.department ? getCoursesForDepartment(formData.department) : [];

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            department: '',
            course: '',
            startDate: '',
            endDate: '',
            duration: '',
            status: 'upcoming'
        });
        setEditingExam(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingExam) {
            onUpdate(editingExam.id, formData);
            setEditingExam(null);
        } else {
            const newExam: Exam = {
                id: `exam-${Date.now()}`,
                ...formData,
                enrolledStudents: 0
            };
            onAdd(newExam);
            setIsCreateOpen(false);
        }
        resetForm();
    };

    const handleEdit = (exam: Exam) => {
        setEditingExam(exam);
        setFormData({
            name: exam.name,
            description: exam.description,
            department: exam.department,
            course: exam.course,
            startDate: exam.startDate,
            endDate: exam.endDate,
            duration: exam.duration,
            status: exam.status
        });
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this exam?')) {
            onDelete(id);
        }
    };

    return (
        <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Manage Exams</h2>
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => { resetForm(); setIsCreateOpen(true); }}>Create New Exam</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create New Exam</DialogTitle>
                            <DialogDescription>
                                Add a new exam to the system.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
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
                                    <Label htmlFor="description" className="text-right">
                                        Description
                                    </Label>
                                    <Input
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                                            {departments.map((dept) => (
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
                                            {availableCourses.map((course) => (
                                                <SelectItem key={course.id} value={course.id}>
                                                    {course.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="startDate" className="text-right">
                                        Start Date
                                    </Label>
                                    <Input
                                        id="startDate"
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="endDate" className="text-right">
                                        End Date
                                    </Label>
                                    <Input
                                        id="endDate"
                                        type="date"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="duration" className="text-right">
                                        Duration (min)
                                    </Label>
                                    <Input
                                        id="duration"
                                        type="number"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="status" className="text-right">
                                        Status
                                    </Label>
                                    <Select value={formData.status} onValueChange={(value: Exam['status']) => setFormData({ ...formData, status: value })}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="upcoming">Upcoming</SelectItem>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save Exam</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exams.map((exam) => (
                    <Card key={exam.id} className="w-full">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">{exam.name}</CardTitle>
                                <Badge variant={exam.status === 'active' ? 'default' : exam.status === 'upcoming' ? 'secondary' : 'outline'}>
                                    {exam.status}
                                </Badge>
                            </div>
                            <CardDescription>{exam.description}</CardDescription>
                            <div className="text-sm text-gray-600 mt-2">
                                <div><strong>Department:</strong> {getDepartmentName(exam.department)}</div>
                                <div><strong>Course:</strong> {getCourseName(exam.department, exam.course)}</div>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm">
                            <div className="flex gap-4 flex-wrap">
                                <div className="flex gap-2 items-center">
                                    <CalendarDays size={16} />
                                    <span>{exam.startDate} to {exam.endDate}</span>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <Hourglass size={16} />
                                    <span>{exam.duration} min</span>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <Users size={16} />
                                    <span>{exam.enrolledStudents} students</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(exam)}>
                                <Edit size={14} className="mr-1" />
                                Edit
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDelete(exam.id)}>
                                <Trash2 size={14} className="mr-1" />
                                Delete
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Edit Dialog */}
            {editingExam && (
                <Dialog open={!!editingExam} onOpenChange={() => setEditingExam(null)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Exam</DialogTitle>
                            <DialogDescription>
                                Update exam details.
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
                                    <Label htmlFor="edit-description" className="text-right">
                                        Description
                                    </Label>
                                    <Input
                                        id="edit-description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-startDate" className="text-right">
                                        Start Date
                                    </Label>
                                    <Input
                                        id="edit-startDate"
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-endDate" className="text-right">
                                        End Date
                                    </Label>
                                    <Input
                                        id="edit-endDate"
                                        type="date"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-duration" className="text-right">
                                        Duration (min)
                                    </Label>
                                    <Input
                                        id="edit-duration"
                                        type="number"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-status" className="text-right">
                                        Status
                                    </Label>
                                    <Select value={formData.status} onValueChange={(value: Exam['status']) => setFormData({ ...formData, status: value })}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="upcoming">Upcoming</SelectItem>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Update Exam</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
        </section>
    )
}

export default DepartmentExams