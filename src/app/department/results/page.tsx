"use client";

import { Download, Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import DepartmentResults from '../../../containers/department/dashboard/DepartmentResults';
import { DepartmentLayout } from '../../../components/DepartmentLayout';
import { useProctor } from '../../../contexts/ProctorContext';

function page() {
    const { results, exams, students } = useProctor();

    const [searchTerm, setSearchTerm] = useState('');

    // Map results to the format expected by DepartmentResults
    const mappedResults = results.map(result => ({
        id: result.id,
        examName: exams.find(e => e.id === result.examId)?.title || 'Unknown Exam',
        studentName: students.find(s => s.id === result.studentId)?.userId || 'Unknown Student',
        score: result.score,
        totalMarks: result.totalMarks,
        status: (result.status === 'passed' ? 'passed' : 'failed') as 'passed' | 'failed',
        submittedAt: result.generatedAt
    }));

    const filteredResults = mappedResults.filter(result =>
        result.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExportAll = () => {
        const csvContent = [
            ['Exam', 'Student', 'Score', 'Total Marks', 'Status', 'Submitted At'],
            ...filteredResults.map(result => [
                result.examName,
                result.studentName,
                result.score.toString(),
                result.totalMarks.toString(),
                result.status,
                result.submittedAt
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'exam-results.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    // Dummy functions since results are read-only
    const handleAddResult = (result: any) => {};
    const handleUpdateResult = (id: string, result: any) => {};
    const handleDeleteResult = (id: string) => {};

    return (
        <DepartmentLayout
            title="Exam Results"
            subtitle="View and analyze student performance"
        >
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                        placeholder="Search results..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="outline" onClick={handleExportAll}>
                    <Download size={16} className="mr-2" />
                    Export All
                </Button>
            </div>
            <DepartmentResults
                results={filteredResults}
                onAdd={handleAddResult}
                onUpdate={handleUpdateResult}
                onDelete={handleDeleteResult}
            />
        </DepartmentLayout>
    )
}

export default page