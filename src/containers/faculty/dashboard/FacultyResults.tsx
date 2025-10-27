import { BarChart3, Download, Eye, Filter, Search, TrendingUp, TrendingDown, Users, Award, Target, Calendar, Clock, FileText, User } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExam, setSelectedExam] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('submittedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedResult, setSelectedResult] = useState<FacultyResult | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

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
    setSelectedResult(result);
    setIsDetailModalOpen(true);
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
                        onClick={() => onViewDetails(result)}
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

      {/* Detailed Result Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Exam Result Details
            </DialogTitle>
            <DialogDescription>
              Detailed performance analysis for {selectedResult?.studentName}
            </DialogDescription>
          </DialogHeader>

          {selectedResult && (
            <div className="space-y-6">
              {/* Student and Exam Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Student Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">{selectedResult.studentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Roll Number:</span>
                      <span className="font-medium">{selectedResult.studentRollNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Specialization:</span>
                      <span className="font-medium">{selectedResult.specialization}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Exam Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Exam:</span>
                      <span className="font-medium">{selectedResult.examName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Submitted:</span>
                      <span className="font-medium">{new Date(selectedResult.submittedAt).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        90 minutes
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Performance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {selectedResult.score}/{selectedResult.totalMarks}
                      </div>
                      <div className="text-sm text-muted-foreground">Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedResult.percentage}%
                      </div>
                      <div className="text-sm text-muted-foreground">Percentage</div>
                    </div>
                    <div className="text-center">
                      <Badge className={`text-lg px-3 py-1 ${getGradeColor(selectedResult.grade)}`}>
                        {selectedResult.grade}
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">Grade</div>
                    </div>
                    <div className="text-center">
                      <Badge className={`text-lg px-3 py-1 ${getStatusColor(selectedResult.status)}`}>
                        {selectedResult.status === 'passed' ? 'Passed' :
                         selectedResult.status === 'failed' ? 'Failed' : 'Pending Review'}
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">Status</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Question-wise Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Question-wise Analysis</CardTitle>
                  <CardDescription>Detailed breakdown of individual question performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Mock question data - in real app this would come from the result */}
                    {[
                      { id: 1, question: "What is a Stack data structure?", marks: 5, obtained: 5, timeSpent: "2:30", difficulty: "Easy" },
                      { id: 2, question: "Explain binary search algorithm with example", marks: 10, obtained: 8, timeSpent: "5:45", difficulty: "Medium" },
                      { id: 3, question: "What are the advantages of linked lists over arrays?", marks: 5, obtained: 3, timeSpent: "3:15", difficulty: "Medium" },
                      { id: 4, question: "Implement a queue using two stacks", marks: 10, obtained: 0, timeSpent: "8:20", difficulty: "Hard" },
                      { id: 5, question: "What is the time complexity of quicksort?", marks: 5, obtained: 5, timeSpent: "1:50", difficulty: "Easy" },
                      { id: 6, question: "Explain the concept of dynamic programming", marks: 10, obtained: 6, timeSpent: "6:30", difficulty: "Hard" }
                    ].map((question) => (
                      <div key={question.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">Question {question.id}: {question.question}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-4 mt-1">
                            <span>Difficulty: {question.difficulty}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {question.timeSpent}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {question.obtained}/{question.marks}
                          </div>
                          <div className={`text-sm ${question.obtained === question.marks ? 'text-green-600' :
                                                   question.obtained >= question.marks * 0.5 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {question.obtained === question.marks ? 'Correct' :
                             question.obtained > 0 ? 'Partial' : 'Incorrect'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Feedback Section */}
              {selectedResult.feedback && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Faculty Feedback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">"{selectedResult.feedback}"</p>
                  </CardContent>
                </Card>
              )}

              {/* Proctoring Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Exam Session Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Start Time:</span>
                      <div className="font-medium">{new Date(selectedResult.examDate).toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">End Time:</span>
                      <div className="font-medium">{new Date(new Date(selectedResult.examDate).getTime() + 90 * 60000).toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Violations:</span>
                      <div className="font-medium text-green-600">None detected</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Browser:</span>
                      <div className="font-medium">Chrome 120.0</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default FacultyResults;