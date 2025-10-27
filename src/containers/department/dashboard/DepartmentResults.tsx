import { BarChart3, Download, Eye } from 'lucide-react'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table'

type Result = {
    id: string;
    examName: string;
    studentName: string;
    score: number;
    totalMarks: number;
    status: 'passed' | 'failed';
    submittedAt: string;
};

interface DepartmentResultsProps {
    results: Result[];
    onAdd: (result: Result) => void;
    onUpdate: (id: string, result: Partial<Result>) => void;
    onDelete: (id: string) => void;
}

function DepartmentResults({ results }: DepartmentResultsProps) {
    const handleExport = () => {
        // Create CSV content
        const csvContent = [
            ['Exam', 'Student', 'Score', 'Total Marks', 'Status', 'Submitted At'],
            ...results.map(result => [
                result.examName,
                result.studentName,
                result.score.toString(),
                result.totalMarks.toString(),
                result.status,
                result.submittedAt
            ])
        ].map(row => row.join(',')).join('\n');

        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `exam_results_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleViewDetails = (result: Result) => {
        // In a real app, this would open a modal or navigate to a detail page
        alert(`Exam: ${result.examName}\nStudent: ${result.studentName}\nScore: ${result.score}/${result.totalMarks}\nStatus: ${result.status}\nSubmitted: ${result.submittedAt}`);
    };

    return (
        <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Exam Results</h2>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <BarChart3 size={16} className="mr-1" />
                        Analytics
                    </Button>
                    <Button onClick={handleExport}>
                        <Download size={16} className="mr-1" />
                        Export CSV
                    </Button>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Results</CardTitle>
                    <CardDescription>View and manage student exam results</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Exam</TableHead>
                                <TableHead>Student</TableHead>
                                <TableHead>Score</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Submitted At</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {results.map((result) => (
                                <TableRow key={result.id}>
                                    <TableCell className="font-medium">{result.examName}</TableCell>
                                    <TableCell>{result.studentName}</TableCell>
                                    <TableCell>{result.score}/{result.totalMarks}</TableCell>
                                    <TableCell>
                                        <Badge variant={result.status === 'passed' ? 'default' : 'destructive'}>
                                            {result.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{result.submittedAt}</TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(result)}>
                                            <Eye size={14} className="mr-1" />
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </section>
    )
}

export default DepartmentResults