"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FacultyLayout } from "@/components/FacultyLayout";
import { useProctor } from '@/contexts/ProctorContext';
import {
    BookOpen,
    CheckCircle,
    Eye,
    EyeOff,
    FileText,
    Plus,
    Lock,
    Globe,
    PlayCircle,
    Clock,
    Edit,
    Trash2
} from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FacultyExamsPage() {
  const {
    currentUser,
    faculties,
    exams,
    addExam,
    updateExam,
    deleteExam,
    publishExam,
    unpublishExam,
    getExamsForFaculty
  } = useProctor();

  const router = useRouter();

  // Find current faculty
  const currentFaculty = faculties.find(f => f.userId === currentUser?.id);
  const facultyExams = currentFaculty ? getExamsForFaculty(currentFaculty.id) : [];

  const [isViewExamOpen, setIsViewExamOpen] = useState(false);
  const [viewingExam, setViewingExam] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [examToDelete, setExamToDelete] = useState<any>(null);

  const handleViewExam = (exam: any) => {
    setViewingExam(exam);
    setIsViewExamOpen(true);
  };

  const handleEditExam = (exam: any) => {
    router.push(`/faculty/exams/edit/${exam.id}`);
  };

  const handleDeleteExam = (exam: any) => {
    setExamToDelete(exam);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteExam = () => {
    if (examToDelete) {
      deleteExam(examToDelete.id);
      setIsDeleteDialogOpen(false);
      setExamToDelete(null);
    }
  };

  const stats = {
    exams: facultyExams.length,
    publishedExams: facultyExams.filter(e => e.status === 'published').length,
    activeExams: facultyExams.filter(e => e.status === 'active').length
  };

  return (
    <FacultyLayout
      title="Exam Management"
      subtitle="Create and manage exams for your students"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.exams}</div>
            <p className="text-xs text-muted-foreground">Created exams</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.publishedExams}</div>
            <p className="text-xs text-muted-foreground">Live exams</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeExams}</div>
            <p className="text-xs text-muted-foreground">Running now</p>
          </CardContent>
        </Card>
      </div>

      {/* Exam Management */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Exams</h2>
        <Button onClick={() => router.push('/faculty/exams/create')}>
          <Plus className="h-4 w-4 mr-2" />
          Create Exam
        </Button>
      </div>

      <div className="grid gap-4">
        {facultyExams.map((exam) => {
          // Get exam type icon and color
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
                          </div>
                        </div>
                    </div>
                    <CardDescription className="text-sm">
                      {exam.questions.length} questions • {exam.totalMarks} marks • {exam.duration} min
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={
                      exam.status === 'published' ? 'default' :
                      exam.status === 'active' ? 'secondary' :
                      exam.status === 'completed' ? 'outline' : 'destructive'
                    }>
                      {exam.status}
                    </Badge>
                    {exam.status === 'draft' && (
                      <Button
                        size="sm"
                        onClick={() => publishExam(exam.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Publish
                      </Button>
                    )}
                    {exam.status === 'published' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => unpublishExam(exam.id)}
                      >
                        <EyeOff className="h-4 w-4 mr-1" />
                        Unpublish
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-medium">{exam.duration} min</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Marks</p>
                    <p className="font-medium">{exam.totalMarks}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Students</p>
                    <p className="font-medium">{exam.enrolledStudents.length}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Start Date</p>
                    <p className="font-medium">{new Date(exam.startTime).toLocaleDateString()}</p>
                  </div>
                </div>
                
                {/* Exam Type Specific Info */}
                <div className="mb-4 p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-2 mb-2">
                    <ExamTypeIcon className={`h-4 w-4 ${examTypeInfo.color}`} />
                    <span className="font-medium text-sm">{examTypeInfo.label} Exam Features</span>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    {exam.type === 'practice' && (
                      <>
                        <p>• Non-graded assessment for practice</p>
                        <p>• Immediate feedback and correct answers shown</p>
                        <p>• Relaxed proctoring settings</p>
                      </>
                    )}
                    {exam.type === 'timed' && (
                      <>
                        <p>• Strict time limits with auto-submission</p>
                        <p>• Enhanced proctoring and anti-cheating measures</p>
                        <p>• Maximum 1 violation allowed</p>
                      </>
                    )}
                    {exam.type === 'private' && (
                      <>
                        <p>• Manual student enrollment required</p>
                        <p>• Controlled access for specific students</p>
                        <p>• Maximum security and privacy</p>
                      </>
                    )}
                    {exam.type === 'public' && (
                      <>
                        <p>• Open to all students in specialization</p>
                        <p>• Automatic enrollment available</p>
                        <p>• Maximum participation opportunity</p>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Created: {new Date(exam.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewExam(exam)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEditExam(exam)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteExam(exam)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* View Exam Dialog */}
      <Dialog open={isViewExamOpen} onOpenChange={setIsViewExamOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>View Exam: {viewingExam?.title}</DialogTitle>
            <DialogDescription>
              Exam details and settings
            </DialogDescription>
          </DialogHeader>
          {viewingExam && (
            <div className="space-y-4">
              <p><strong>Description:</strong> {viewingExam.description}</p>
              <p><strong>Instructions:</strong> {viewingExam.instructions}</p>
              <p><strong>Duration:</strong> {viewingExam.duration} min</p>
              <p><strong>Total Marks:</strong> {viewingExam.totalMarks}</p>
              <p><strong>Questions:</strong> {viewingExam.questions.length}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Exam</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{examToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteExam}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </FacultyLayout>
  );
}