"use client";

import { useState } from 'react';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import DepartmentExams from '../../../containers/department/dashboard/DepartmentExams';
import { DepartmentLayout } from '../../../components/DepartmentLayout';
import { useProctor } from '../../../contexts/ProctorContext';

function page() {
    const { exams, addExam, updateExam, deleteExam, departments, specializations } = useProctor();

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    // Map global Exam objects to DepartmentExams format
    const mappedExams = exams.map(exam => ({
        id: exam.id,
        name: exam.title,
        description: exam.description,
        department: departments.find(d => d.id === exam.departmentId)?.name || 'Unknown',
        course: specializations.find(s => s.id === exam.specializationId)?.name || 'Unknown',
        startDate: exam.startTime,
        endDate: exam.endTime,
        duration: `${exam.duration} min`,
        enrolledStudents: 0, // This would need to be calculated from exam enrollments
        status: (exam.status === 'published' ? 'upcoming' : exam.status === 'active' ? 'active' : 'completed') as 'active' | 'upcoming' | 'completed'
    }));

    const filteredExams = mappedExams.filter(exam => {
        const matchesSearch = exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            exam.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || exam.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Wrapper functions to handle type differences
    const handleAddExam = (exam: any) => {
        // Convert from DepartmentExams format to global Exam format
        const globalExam = {
            title: exam.name,
            description: exam.description,
            type: 'public' as const,
            specializationId: '', // Would need to be set based on course
            departmentId: '', // Would need to be set based on department
            facultyId: '', // Would need to be set
            questions: [],
            totalMarks: 100,
            duration: parseInt(exam.duration) || 60,
            startTime: exam.startDate,
            endTime: exam.endDate,
            instructions: '',
            status: 'draft' as const,
            settings: {
                allowTabSwitch: false,
                allowCopyPaste: false,
                showResults: true,
                maxViolations: 3
            },
            enrolledStudents: []
        };
        addExam(globalExam);
    };

    const handleUpdateExam = (id: string, exam: any) => {
        const updates: any = {};
        if (exam.name) updates.title = exam.name;
        if (exam.description) updates.description = exam.description;
        if (exam.startDate) updates.startTime = exam.startDate;
        if (exam.endDate) updates.endTime = exam.endDate;
        if (exam.duration) updates.duration = parseInt(exam.duration);
        updateExam(id, updates);
    };

    const handleDeleteExam = (id: string) => {
        deleteExam(id);
    };

    return (
        <DepartmentLayout
            title="Exam Management"
            subtitle="Manage and monitor department examinations"
        >
            <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <Input
                        placeholder="Search exams..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-64"
                    />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DepartmentExams
                exams={filteredExams}
                onAdd={handleAddExam}
                onUpdate={handleUpdateExam}
                onDelete={handleDeleteExam}
            />
        </DepartmentLayout>
    );
}

export default page;