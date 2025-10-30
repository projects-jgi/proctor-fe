"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FacultyLayout } from "@/components/FacultyLayout";
import { useProctor } from '@/contexts/ProctorContext';
import {
    BookOpen,
    CheckCircle,
    Edit,
    Eye,
    EyeOff,
    FileText,
    Plus,
    Lock,
    Globe,
    PlayCircle,
    Clock,
    Shield,
    Users,
    Settings,
    AlertTriangle,
    CheckSquare,
    X
} from 'lucide-react';
import { useState } from 'react';

export default function FacultyExamsPage() {
  const {
    currentUser,
    faculties,
    exams,
    addExam,
    updateExam,
    publishExam,
    unpublishExam,
    getExamsForFaculty
  } = useProctor();

  // Find current faculty
  const currentFaculty = faculties.find(f => f.userId === currentUser?.id);
  const facultyExams = currentFaculty ? getExamsForFaculty(currentFaculty.id) : [];

  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('');
  const [isCreateExamOpen, setIsCreateExamOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<any>(null);
  const [isViewExamOpen, setIsViewExamOpen] = useState(false);
  const [viewingExam, setViewingExam] = useState<any>(null);

  // Exam form state
  const [examForm, setExamForm] = useState({
    title: '',
    description: '',
    type: 'private' as 'private' | 'public' | 'practice' | 'timed',
    questions: [] as string[],
    duration: 90,
    startTime: '',
    endTime: '',
    instructions: '',
    settings: {
      allowTabSwitch: false,
      allowCopyPaste: false,
      showResults: true,
      maxViolations: 3,
      isPractice: false,
      recordResults: true,
      allowRetake: false,
      showCorrectAnswers: false
    }
  });

  // Helper to reset exam form
  const resetExamForm = () => {
    setExamForm({
      title: '',
      description: '',
      type: 'private',
      questions: [],
      duration: 90,
      startTime: '',
      endTime: '',
      instructions: '',
      settings: {
        allowTabSwitch: false,
        allowCopyPaste: false,
        showResults: true,
        maxViolations: 3,
        isPractice: false,
        recordResults: true,
        allowRetake: false,
        showCorrectAnswers: false
      }
    });
    setEditingExam(null);
  };

  // Populate form for editing exam
  const populateExamForm = (exam: any) => {
    setExamForm({
      title: exam.title,
      description: exam.description,
      type: exam.type,
      questions: exam.questions,
      duration: exam.duration,
      startTime: exam.startTime,
      endTime: exam.endTime,
      instructions: exam.instructions,
      settings: exam.settings
    });
    setEditingExam(exam);
    setIsCreateExamOpen(true);
  };

  const handleCreateExam = () => {
    // Add validation
    if (!examForm.title.trim() || !examForm.description.trim() || !examForm.startTime || !examForm.endTime) {
      alert('Please fill in all required fields: title, description, start time, and end time.');
      return;
    }
    if (new Date(examForm.startTime) >= new Date(examForm.endTime)) {
      alert('Start time must be before end time.');
      return;
    }
    if (examForm.duration <= 0) {
      alert('Duration must be a positive number.');
      return;
    }

    if (currentFaculty) {
      let examQuestions = examForm.questions;
      if (!editingExam) {
        // For new exams, start with empty questions - faculty can add them later
        examQuestions = [];
      }

      // Configure settings based on exam type
      const configuredSettings = {
        ...examForm.settings,
        isPractice: examForm.type === 'practice',
        recordResults: examForm.type !== 'practice',
        allowRetake: examForm.type === 'practice',
        showCorrectAnswers: examForm.type === 'practice',
        allowTabSwitch: examForm.type === 'practice' || examForm.settings.allowTabSwitch,
        allowCopyPaste: examForm.type === 'practice' || examForm.settings.allowCopyPaste,
        maxViolations: examForm.type === 'timed' ? 1 : examForm.settings.maxViolations
      };

      const examData = {
        ...examForm,
        questions: examQuestions,
        totalMarks: examQuestions.length * 5, // Assuming 5 marks per question
        departmentId: currentFaculty.departmentId,
        facultyId: currentFaculty.id,
        status: editingExam ? editingExam.status : 'draft',
        enrolledStudents: editingExam ? editingExam.enrolledStudents : [],
        settings: configuredSettings
      };
      if (editingExam) {
        updateExam(editingExam.id, examData);
      } else {
        addExam(examData);
      }
      resetExamForm();
      setIsCreateExamOpen(false);
    }
  };

  const handleViewExam = (exam: any) => {
    setViewingExam(exam);
    setIsViewExamOpen(true);
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
        <Dialog open={isCreateExamOpen} onOpenChange={(open) => {
          setIsCreateExamOpen(open);
          if (!open) resetExamForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Exam
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{editingExam ? 'Edit Exam' : 'Create New Exam'}</DialogTitle>
              <DialogDescription className="text-base">
                {editingExam ? 'Update the exam details' : 'Create a new exam for your specialization'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="exam-title" className="text-sm font-medium">Exam Title *</Label>
                    <Input
                      id="exam-title"
                      value={examForm.title}
                      onChange={(e) => setExamForm({...examForm, title: e.target.value})}
                      placeholder="Enter exam title"
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="exam-description" className="text-sm font-medium">Description *</Label>
                    <Textarea
                      id="exam-description"
                      value={examForm.description}
                      onChange={(e) => setExamForm({...examForm, description: e.target.value})}
                      placeholder="Brief description of the exam"
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Exam Type Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Exam Type</h3>
                <p className="text-sm text-muted-foreground">Choose the type of exam that best fits your assessment needs</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Private Exam */}
                  <Card 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      examForm.type === 'private' 
                        ? 'ring-2 ring-primary bg-accent border-primary/20' 
                        : 'hover:bg-accent/50'
                    }`}
                    onClick={() => setExamForm({...examForm, type: 'private'})}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          examForm.type === 'private' ? 'bg-primary/10' : 'bg-muted'
                        }`}>
                          <Lock className={`h-5 w-5 ${
                            examForm.type === 'private' ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                        </div>
                        <div>
                          <CardTitle className="text-base">Private Exam</CardTitle>
                          <CardDescription className="text-sm">Manual student enrollment required</CardDescription>
                        </div>
                        {examForm.type === 'private' && (
                          <CheckSquare className="h-5 w-5 text-primary ml-auto" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground">
                        Best for controlled assessments where you need to manually enroll specific students.
                        Provides maximum security and control over exam access.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Public Exam */}
                  <Card 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      examForm.type === 'public' 
                        ? 'ring-2 ring-success bg-success/5 border-success/20' 
                        : 'hover:bg-accent/50'
                    }`}
                    onClick={() => setExamForm({...examForm, type: 'public'})}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          examForm.type === 'public' ? 'bg-success/10' : 'bg-muted'
                        }`}>
                          <Globe className={`h-5 w-5 ${
                            examForm.type === 'public' ? 'text-success' : 'text-muted-foreground'
                          }`} />
                        </div>
                        <div>
                          <CardTitle className="text-base">Public Exam</CardTitle>
                          <CardDescription className="text-sm">Open to all students in specialization</CardDescription>
                        </div>
                        {examForm.type === 'public' && (
                          <CheckSquare className="h-5 w-5 text-success ml-auto" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground">
                        Automatically available to all students in the selected specialization.
                        Ideal for general assessments and maximum participation.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Practice Exam */}
                  <Card 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      examForm.type === 'practice' 
                        ? 'ring-2 ring-purple-500 bg-purple-50 border-purple-200' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setExamForm({...examForm, type: 'practice'})}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          examForm.type === 'practice' ? 'bg-purple-100' : 'bg-gray-100'
                        }`}>
                          <PlayCircle className={`h-5 w-5 ${
                            examForm.type === 'practice' ? 'text-purple-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <CardTitle className="text-base">Practice Exam</CardTitle>
                          <CardDescription className="text-sm">Non-graded learning assessment</CardDescription>
                        </div>
                        {examForm.type === 'practice' && (
                          <CheckSquare className="h-5 w-5 text-purple-600 ml-auto" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600">
                        Non-graded exams for student practice and preparation. Results are not recorded
                        in official transcripts and provide immediate feedback for learning.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Timed Exam */}
                  <Card 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      examForm.type === 'timed' 
                        ? 'ring-2 ring-red-500 bg-red-50 border-red-200' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setExamForm({...examForm, type: 'timed'})}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          examForm.type === 'timed' ? 'bg-red-100' : 'bg-gray-100'
                        }`}>
                          <Clock className={`h-5 w-5 ${
                            examForm.type === 'timed' ? 'text-red-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <CardTitle className="text-base">Timed Exam</CardTitle>
                          <CardDescription className="text-sm">Strict time limits with proctoring</CardDescription>
                        </div>
                        {examForm.type === 'timed' && (
                          <CheckSquare className="h-5 w-5 text-red-600 ml-auto" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600">
                        High-security exams with strict time limits and advanced proctoring features
                        including anti-cheating measures and automatic submission.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Exam Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Exam Configuration</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="exam-duration" className="text-sm font-medium">Duration (minutes) *</Label>
                    <Input
                      id="exam-duration"
                      type="number"
                      value={examForm.duration}
                      onChange={(e) => setExamForm({...examForm, duration: parseInt(e.target.value)})}
                      className="mt-1"
                      min="1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="exam-start" className="text-sm font-medium">Start Time *</Label>
                    <Input
                      id="exam-start"
                      type="datetime-local"
                      value={examForm.startTime}
                      onChange={(e) => setExamForm({...examForm, startTime: e.target.value})}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="exam-end" className="text-sm font-medium">End Time *</Label>
                    <Input
                      id="exam-end"
                      type="datetime-local"
                      value={examForm.endTime}
                      onChange={(e) => setExamForm({...examForm, endTime: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="exam-instructions" className="text-sm font-medium">Instructions</Label>
                  <Textarea
                    id="exam-instructions"
                    value={examForm.instructions}
                    onChange={(e) => setExamForm({...examForm, instructions: e.target.value})}
                    placeholder="Exam instructions for students"
                    rows={4}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Advanced Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Proctoring Settings */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Proctoring Settings
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">Allow Tab Switching</Label>
                          <p className="text-xs text-gray-500">Students can switch browser tabs</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={examForm.settings.allowTabSwitch}
                          onChange={(e) => setExamForm({
                            ...examForm, 
                            settings: {...examForm.settings, allowTabSwitch: e.target.checked}
                          })}
                          className="rounded"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">Allow Copy/Paste</Label>
                          <p className="text-xs text-gray-500">Students can copy and paste content</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={examForm.settings.allowCopyPaste}
                          onChange={(e) => setExamForm({
                            ...examForm, 
                            settings: {...examForm.settings, allowCopyPaste: e.target.checked}
                          })}
                          className="rounded"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Result Settings */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Result Settings
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">Show Results Immediately</Label>
                          <p className="text-xs text-gray-500">Display results after completion</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={examForm.settings.showResults}
                          onChange={(e) => setExamForm({
                            ...examForm, 
                            settings: {...examForm.settings, showResults: e.target.checked}
                          })}
                          className="rounded"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">Max Violations</Label>
                          <p className="text-xs text-gray-500">Auto-terminate after violations</p>
                        </div>
                        <Input
                          type="number"
                          value={examForm.settings.maxViolations}
                          onChange={(e) => setExamForm({
                            ...examForm, 
                            settings: {...examForm.settings, maxViolations: parseInt(e.target.value)}
                          })}
                          className="w-20 h-8"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsCreateExamOpen(false);
                    resetExamForm();
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleCreateExam}>
                  <Plus className="h-4 w-4 mr-2" />
                  {editingExam ? 'Update Exam' : 'Create Exam'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
                    <Button variant="outline" size="sm" onClick={() => populateExamForm(exam)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleViewExam(exam)}>
                      <Eye className="h-4 w-4" />
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
    </FacultyLayout>
  );
}