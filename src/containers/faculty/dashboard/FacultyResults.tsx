import { BarChart3, Download, Eye, Filter, Search, TrendingUp, TrendingDown, Users, Award, Target, Calendar, Clock, FileText, User } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type FacultyResult = {
  id: string;
  examName: string;
  studentName: string;
  studentRollNumber: string;
  score: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  status: 'passed' | 'failed' | 'pending-review';
  feedback?: string;
  submittedAt: string;
  examDate: string;
  specialization: string;
};

interface FacultyResultsProps {
  results: FacultyResult[];
  exams: any[];
  onViewDetails: (result: FacultyResult) => void;
  onExport: (results: FacultyResult[]) => void;
}

function FacultyResults({ results, exams, onViewDetails, onExport }: FacultyResultsProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExam, setSelectedExam] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('submittedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Filter and sort results
  const filteredResults = results
    .filter(result => {
      const matchesSearch = result.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          result.studentRollNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesExam = selectedExam === 'all' || result.examName === selectedExam;
      const matchesGrade = selectedGrade === 'all' || result.grade === selectedGrade;
      return matchesSearch && matchesExam && matchesGrade;
    })
    .sort((a, b) => {
      let aValue: any = a[sortBy as keyof FacultyResult];
      let bValue: any = b[sortBy as keyof FacultyResult];

      if (sortBy === 'percentage') {
        aValue = a.percentage;
        bValue = b.percentage;
      } else if (sortBy === 'submittedAt') {
        aValue = new Date(a.submittedAt).getTime();
        bValue = new Date(b.submittedAt).getTime();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Calculate statistics
  const stats = {
    totalResults: filteredResults.length,
    averageScore: filteredResults.length > 0 ?
      Math.round(filteredResults.reduce((acc, r) => acc + r.percentage, 0) / filteredResults.length) : 0,
    passRate: filteredResults.length > 0 ?
      Math.round((filteredResults.filter(r => r.status === 'passed').length / filteredResults.length) * 100) : 0,
    topPerformers: filteredResults.filter(r => r.percentage >= 90).length,
    gradeDistribution: {
      A: filteredResults.filter(r => r.grade === 'A').length,
      B: filteredResults.filter(r => r.grade.startsWith('B')).length,
      C: filteredResults.filter(r => r.grade.startsWith('C')).length,
      F: filteredResults.filter(r => r.status === 'failed').length,
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade === 'A') return 'bg-green-100 text-green-800';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending-review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceIcon = (percentage: number) => {
    if (percentage >= 90) return <Award className="w-4 h-4 text-green-600" />;
    if (percentage >= 75) return <TrendingUp className="w-4 h-4 text-blue-600" />;
    if (percentage >= 60) return <Target className="w-4 h-4 text-yellow-600" />;
    return <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  const handleViewDetails = (result: FacultyResult) => {
    router.push(`/faculty/results/${result.id}`);
  };

  return (
    <section className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Results</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalResults}</div>
            <p className="text-xs text-muted-foreground">Student submissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore}%</div>
            <p className="text-xs text-muted-foreground">Class performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.passRate}%</div>
            <p className="text-xs text-muted-foreground">Students passed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.topPerformers}</div>
            <p className="text-xs text-muted-foreground">≥90% scores</p>
          </CardContent>
        </Card>
      </div>

      {/* Grade Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Grade Distribution</CardTitle>
          <CardDescription>Overview of student performance grades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.gradeDistribution.A}</div>
              <div className="text-sm text-muted-foreground">Grade A</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.gradeDistribution.B}</div>
              <div className="text-sm text-muted-foreground">Grade B</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.gradeDistribution.C}</div>
              <div className="text-sm text-muted-foreground">Grade C</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stats.gradeDistribution.F}</div>
              <div className="text-sm text-muted-foreground">Failed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Student Results</CardTitle>
          <CardDescription>View and analyze student performance across your exams</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search by exam, student, or roll number..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedExam} onValueChange={setSelectedExam}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by exam" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Exams</SelectItem>
                {exams.map((exam) => (
                  <SelectItem key={exam.id} value={exam.title}>
                    {exam.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B">B</SelectItem>
                <SelectItem value="C+">C+</SelectItem>
                <SelectItem value="C">C</SelectItem>
                <SelectItem value="F">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="submittedAt">Date</SelectItem>
                <SelectItem value="percentage">Score</SelectItem>
                <SelectItem value="examName">Exam</SelectItem>
                <SelectItem value="studentName">Student</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </Button>
            <Button variant="outline" onClick={() => onExport(filteredResults)}>
              <Download size={16} className="mr-2" />
              Export
            </Button>
          </div>

          {/* Results Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Exam</TableHead>
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
                    <TableCell>
                      <div>
                        <div className="font-medium">{result.examName}</div>
                        <div className="text-sm text-muted-foreground">{result.specialization}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getPerformanceIcon(result.percentage)}
                        <div>
                          <div className="font-medium">{result.score}/{result.totalMarks}</div>
                          <div className="text-sm text-muted-foreground">{result.percentage}%</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getGradeColor(result.grade)}>
                        {result.grade}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(result.status)}>
                        {result.status === 'passed' ? 'Passed' :
                         result.status === 'failed' ? 'Failed' : 'Pending Review'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(result.submittedAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(result)}
                      >
                        <Eye size={14} className="mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredResults.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No results found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

export default FacultyResults;