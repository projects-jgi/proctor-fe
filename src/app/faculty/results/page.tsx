"use client";

import { FacultyLayout } from "@/components/FacultyLayout";
import FacultyResults from "@/containers/faculty/dashboard/FacultyResults";
import { useProctor } from "@/contexts/ProctorContext";

function FacultyResultsPage() {
    const { exams } = useProctor();

    // Mock data for faculty results
    const mockResults = [
        {
            id: '1',
            examName: 'Data Structures Final Exam',
            studentName: 'John Doe',
            studentRollNumber: 'CS001',
            score: 85,
            totalMarks: 100,
            percentage: 85,
            grade: 'A',
            status: 'passed' as const,
            submittedAt: new Date().toISOString(),
            examDate: new Date().toISOString(),
            specialization: 'Computer Science'
        },
        {
            id: '2',
            examName: 'Algorithms Mid-term',
            studentName: 'Jane Smith',
            studentRollNumber: 'CS002',
            score: 72,
            totalMarks: 100,
            percentage: 72,
            grade: 'B',
            status: 'passed' as const,
            submittedAt: new Date().toISOString(),
            examDate: new Date().toISOString(),
            specialization: 'Computer Science'
        },
        {
            id: '3',
            examName: 'Database Systems',
            studentName: 'Bob Johnson',
            studentRollNumber: 'CS003',
            score: 45,
            totalMarks: 100,
            percentage: 45,
            grade: 'F',
            status: 'failed' as const,
            submittedAt: new Date().toISOString(),
            examDate: new Date().toISOString(),
            specialization: 'Computer Science'
        }
    ];

    return (
        <FacultyLayout title="Exam Results" subtitle="View and analyze student performance">
            <FacultyResults
                results={mockResults}
                exams={exams}
                onViewDetails={(result) => console.log('View details:', result)}
                onExport={(results) => console.log('Export:', results)}
            />
        </FacultyLayout>
    );
}

export default FacultyResultsPage;