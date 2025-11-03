"use client";

import { FacultyLayout } from "@/components/FacultyLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProctor } from '@/contexts/ProctorContext';
import {
    Calendar,
    Clock,
    Eye,
    EyeOff,
    FileText,
    Globe,
    Lock,
    PlayCircle,
    Plus,
    Users
} from 'lucide-react';
import { useState } from 'react';

export default function FacultyExamTypesPage() {
  const {
    currentUser,
    faculties,
    exams,
    categories,
    addCategory,
    getExamsForFaculty
  } = useProctor();

  // Find current faculty
  const currentFaculty = faculties.find(f => f.userId === currentUser?.id);
  const facultyExams = currentFaculty ? getExamsForFaculty(currentFaculty.id) : [];

  const [selectedExamType, setSelectedExamType] = useState<string>('all');
  const [isCreateExamTypeOpen, setIsCreateExamTypeOpen] = useState(false);
  const [examTypeForm, setExamTypeForm] = useState({
    name: '',
    description: ''
  });

  // Get unique exam types from exams
  const examTypes = Array.from(new Set(facultyExams.map(exam => exam.type)));

  // Filter exams based on selected exam type
  const filteredExams = selectedExamType === 'all'
    ? facultyExams
    : facultyExams.filter(exam => exam.type === selectedExamType);

  // Group exams by status for stats
  const stats = {
    totalExams: facultyExams.length,
    draftExams: facultyExams.filter(e => e.status === 'draft').length,
    publishedExams: facultyExams.filter(e => e.status === 'published').length,
    activeExams: facultyExams.filter(e => e.status === 'active').length
  };

  const getExamTypeInfo = (type: string) => {
    switch (type) {
      case 'private':
        return { icon: Lock, color: 'text-blue-600', bgColor: 'bg-blue-100', label: 'Private' };
      case 'public':
        return { icon: Globe, color: 'text-green-600', bgColor: 'bg-green-100', label: 'Public' };
      case 'practice':
        return { icon: PlayCircle, color: 'text-purple-600', bgColor: 'bg-purple-100', label: 'Practice' };
      case 'timed':
        return { icon: Clock, color: 'text-red-600', bgColor: 'bg-red-100', label: 'Timed' };
      default:
        return { icon: FileText, color: 'text-gray-600', bgColor: 'bg-gray-100', label: 'Unknown' };
    }
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'Not scheduled';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle exam type creation
  const handleExamTypeSubmit = () => {
    if (!examTypeForm.name.trim()) {
      alert('Please enter an exam type name.');
      return;
    }

    // Check if exam type already exists
    if (categories.some(cat => cat.name.toLowerCase() === examTypeForm.name.toLowerCase())) {
      alert('An exam type with this name already exists.');
      return;
    }

    addCategory({
      name: examTypeForm.name.trim(),
      description: examTypeForm.description.trim(),
      isActive: true
    });

    setExamTypeForm({ name: '', description: '' });
    setIsCreateExamTypeOpen(false);
  };

  return (
    <FacultyLayout
      title="Exam Types & Schedules"
      subtitle="View all exam types and their scheduled exams"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalExams}</div>
            <p className="text-xs text-muted-foreground">All exams</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft Exams</CardTitle>
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.draftExams}</div>
            <p className="text-xs text-muted-foreground">Not published</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.publishedExams}</div>
            <p className="text-xs text-muted-foreground">Live exams</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <PlayCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeExams}</div>
            <p className="text-xs text-muted-foreground">Running now</p>
          </CardContent>
        </Card>
      </div>

      {/* Exam Type Filter */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Exam Schedules by Type</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Filter by type:</span>
            <select
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              {examTypes.map(type => {
                const typeInfo = getExamTypeInfo(type);
                return (
                  <option key={type} value={type}>
                    {typeInfo.label}
                  </option>
                );
              })}
            </select>
          </div>

          <Dialog open={isCreateExamTypeOpen} onOpenChange={setIsCreateExamTypeOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Exam Type
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Exam Type</DialogTitle>
                <DialogDescription>
                  Create a new exam type for organizing your questions and exams
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="category-name">Exam Type Name *</Label>
                  <Input
                    id="category-name"
                    value={examTypeForm.name}
                    onChange={(e) => setExamTypeForm({...examTypeForm, name: e.target.value})}
                    placeholder="e.g., Verbal, Technical, Reasoning"
                  />
                </div>
                <div>
                  <Label htmlFor="category-description">Description (Optional)</Label>
                  <Textarea
                    id="category-description"
                    value={examTypeForm.description}
                    onChange={(e) => setExamTypeForm({...examTypeForm, description: e.target.value})}
                    placeholder="Brief description of the exam type"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => {
                    setIsCreateExamTypeOpen(false);
                    setExamTypeForm({ name: '', description: '' });
                  }}>
                    Cancel
                  </Button>
                  <Button onClick={handleExamTypeSubmit}>
                    Add Exam Type
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Exams List */}
      <div className="space-y-4">
        {filteredExams.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">No exams found</CardTitle>
              <CardDescription>
                {selectedExamType === 'all'
                  ? 'Create your first exam to get started.'
                  : `No exams found for the selected type. Try selecting "All Types".`}
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          filteredExams.map((exam) => {
            const examTypeInfo = getExamTypeInfo(exam.type);
            const ExamTypeIcon = examTypeInfo.icon;

            return (
              <Card key={exam.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`p-2 rounded-lg ${examTypeInfo.bgColor}`}>
                          <ExamTypeIcon className={`h-5 w-5 ${examTypeInfo.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{exam.title}</CardTitle>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={`${examTypeInfo.bgColor} ${examTypeInfo.color} border-current`}>
                              {examTypeInfo.label}
                            </Badge>
                            <Badge variant={
                              exam.status === 'published' ? 'default' :
                              exam.status === 'active' ? 'secondary' :
                              exam.status === 'completed' ? 'outline' : 'destructive'
                            }>
                              {exam.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="text-sm mb-3">
                        {exam.description}
                      </CardDescription>

                      {/* Schedule Information */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Start Time</div>
                            <div className="text-muted-foreground">{formatDateTime(exam.startTime)}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">End Time</div>
                            <div className="text-muted-foreground">{formatDateTime(exam.endTime)}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Duration</div>
                            <div className="text-muted-foreground">{exam.duration} minutes</div>
                          </div>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                        <div>
                          {exam.questions.length} questions • {exam.totalMarks} marks
                        </div>
                        <div>
                          {exam.enrolledStudents?.length || 0} enrolled students
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      {exam.status === 'draft' && (
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      )}
                      {exam.status === 'published' && (
                        <Button size="sm" variant="outline">
                          <Users className="h-4 w-4 mr-1" />
                          Manage Students
                        </Button>
                      )}
                      {exam.status === 'active' && (
                        <Badge variant="secondary" className="text-xs">
                          <PlayCircle className="h-3 w-3 mr-1" />
                          Live
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })
        )}
      </div>
    </FacultyLayout>
  );
}