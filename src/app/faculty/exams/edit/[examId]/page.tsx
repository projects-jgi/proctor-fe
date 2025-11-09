"use client";

import { FacultyLayout } from "@/components/FacultyLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProctor } from '@/contexts/ProctorContext';
import {
    CheckSquare,
    Clock,
    Globe,
    Lock,
    PlayCircle,
    Save,
    Settings,
    Shield,
    X
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function EditExamPage() {
  const params = useParams();
  const examId = params?.examId as string;
  const { updateExam, currentUser, faculties, exams } = useProctor();
  const router = useRouter();

  // Find current faculty
  const currentFaculty = faculties.find(f => f.userId === currentUser?.id);

  const [examForm, setExamForm] = useState({
    title: '',
    description: '',
    type: 'private',
    duration: 60,
    startTime: '',
    endTime: '',
    instructions: '',
    settings: {
      allowTabSwitch: true,
      allowCopyPaste: true,
      showResults: true,
      maxViolations: 3
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load exam data
  useEffect(() => {
    if (examId && currentFaculty) {
      const exam = exams.find(e => e.id === examId && e.facultyId === currentFaculty.id);
      if (exam) {
        setExamForm({
          title: exam.title,
          description: exam.description,
          type: exam.type,
          duration: exam.duration,
          startTime: exam.startTime ? new Date(exam.startTime).toISOString().slice(0, 16) : '',
          endTime: exam.endTime ? new Date(exam.endTime).toISOString().slice(0, 16) : '',
          instructions: exam.instructions || '',
          settings: exam.settings || {
            allowTabSwitch: true,
            allowCopyPaste: true,
            showResults: true,
            maxViolations: 3
          }
        });
      } else {
        // Exam not found or doesn't belong to current faculty
        router.push('/faculty/exams');
      }
      setIsLoading(false);
    }
  }, [examId, currentFaculty, exams, router]);

  const handleUpdateExam = () => {
    // Basic validation
    if (!examForm.title || !examForm.description || !examForm.startTime || !examForm.endTime) {
      alert('Please fill in all required fields');
      return;
    }

    if (!currentFaculty) {
      alert('Faculty information not found. Please try logging in again.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Update exam object
      const updatedExam = {
        title: examForm.title,
        description: examForm.description,
        type: examForm.type,
        duration: examForm.duration,
        startTime: examForm.startTime,
        endTime: examForm.endTime,
        instructions: examForm.instructions,
        settings: examForm.settings,
        updatedAt: new Date().toISOString()
      };

      updateExam(examId as string, updatedExam);
      router.push('/faculty/exams');
    } catch (error) {
      console.error('Error updating exam:', error);
      alert('Failed to update exam. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <FacultyLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading exam...</div>
        </div>
      </FacultyLayout>
    );
  }

  return (
    <FacultyLayout>
      <section className="space-y-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Edit Exam</h1>
            <p className="text-muted-foreground mt-2">Modify exam details and settings</p>
          </div>

          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="exam-title" className="text-sm font-medium">Exam Title *</Label>
                    <Input
                      id="exam-title"
                      value={examForm.title}
                      onChange={(e) => setExamForm({...examForm, title: e.target.value})}
                      placeholder="Enter exam title"
                      className="mt-1"
                      suppressHydrationWarning
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
                      suppressHydrationWarning
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Exam Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Exam Type</CardTitle>
                <CardDescription>Choose the type of exam that best fits your assessment needs</CardDescription>
              </CardHeader>
              <CardContent>
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
                          <CardDescription className="text-sm">Open to all enrolled students</CardDescription>
                        </div>
                        {examForm.type === 'public' && (
                          <CheckSquare className="h-5 w-5 text-success ml-auto" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground">
                        Automatically available to all enrolled students.
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
                        ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setExamForm({...examForm, type: 'timed'})}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          examForm.type === 'timed' ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <Clock className={`h-5 w-5 ${
                            examForm.type === 'timed' ? 'text-blue-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <CardTitle className="text-base">Timed Exam</CardTitle>
                          <CardDescription className="text-sm">Strict time limits with proctoring</CardDescription>
                        </div>
                        {examForm.type === 'timed' && (
                          <CheckSquare className="h-5 w-5 text-blue-600 ml-auto" />
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
              </CardContent>
            </Card>

            {/* Exam Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Exam Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                      suppressHydrationWarning
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
                      suppressHydrationWarning
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
                      suppressHydrationWarning
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
                    suppressHydrationWarning
                  />
                </div>
              </CardContent>
            </Card>

            {/* Advanced Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Advanced Settings</CardTitle>
              </CardHeader>
              <CardContent>
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
                          suppressHydrationWarning
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => router.push('/faculty/exams')}
                suppressHydrationWarning
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleUpdateExam} disabled={isSubmitting} suppressHydrationWarning>
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Updating...' : 'Update Exam'}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </FacultyLayout>
  );
}