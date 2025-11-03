"use client";

import { FacultyLayout } from "@/components/FacultyLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FacultyQuestionBank from "@/containers/faculty/dashboard/FacultyQuestionBank";
import FacultyResults from "@/containers/faculty/dashboard/FacultyResults";
import { useProctor } from "@/contexts/ProctorContext";

function FacultyDashboard() {
    const { exams, results } = useProctor();

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
            examDate: new Date().toISOString()
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
            examDate: new Date().toISOString()
        }
    ];

    return (
        <FacultyLayout>
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Faculty Dashboard</h1>

                <Tabs defaultValue="questions" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="questions">Question Bank</TabsTrigger>
                        <TabsTrigger value="results">Results</TabsTrigger>
                    </TabsList>

                    <TabsContent value="questions" className="mt-6">
                        <FacultyQuestionBank />
                    </TabsContent>

                    <TabsContent value="results" className="mt-6">
                        <FacultyResults
                            results={mockResults}
                            exams={exams}
                            onViewDetails={(result) => console.log('View details:', result)}
                            onExport={(results) => console.log('Export:', results)}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </FacultyLayout>
    );
}

export default FacultyDashboard;