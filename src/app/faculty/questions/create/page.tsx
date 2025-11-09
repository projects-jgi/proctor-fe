"use client";

import { FacultyLayout } from "@/components/FacultyLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useProctor } from '@/contexts/ProctorContext';
import {
    ArrowLeft,
    CheckCircle,
    HelpCircle,
    Save,
    Upload,
    X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface QuestionFormData {
  title: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  content: string;
  options: string[];
  correctAnswer: string;
  marks: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  categoryId: string;
}

export default function CreateQuestionPage() {
  const router = useRouter();
  const {
    currentUser,
    faculties,
    categories,
    questions,
    addQuestion
  } = useProctor();

  // Find current faculty
  const currentFaculty = faculties.find(f => f.userId === currentUser?.id);

  // Question form state
  const [questionForm, setQuestionForm] = useState<QuestionFormData>({
    title: '',
    type: 'multiple-choice',
    content: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    marks: 5,
    explanation: '',
    difficulty: 'medium',
    subject: '',
    categoryId: 'none'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bulkQueue, setBulkQueue] = useState<QuestionFormData[]>([]);

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!questionForm.title.trim()) {
      newErrors.title = 'Question title is required';
    }

    if (!questionForm.content.trim()) {
      newErrors.content = 'Question content is required';
    }

    if (questionForm.type === 'multiple-choice') {
      const validOptions = questionForm.options.filter(opt => opt.trim() !== '');
      if (validOptions.length < 2) {
        newErrors.options = 'At least 2 options are required for multiple choice';
      }
      if (!questionForm.correctAnswer.trim()) {
        newErrors.correctAnswer = 'Correct answer is required';
      } else {
        const correctIndex = parseInt(questionForm.correctAnswer);
        if (isNaN(correctIndex) || correctIndex < 0 || correctIndex >= validOptions.length) {
          newErrors.correctAnswer = 'Correct answer must be a valid option index';
        }
      }
    } else if (questionForm.type === 'true-false') {
      if (!['true', 'false'].includes(questionForm.correctAnswer.toLowerCase())) {
        newErrors.correctAnswer = 'Correct answer must be "true" or "false"';
      }
    } else if (questionForm.type === 'short-answer' || questionForm.type === 'essay') {
      if (!questionForm.correctAnswer.trim()) {
        newErrors.correctAnswer = 'Correct answer is required';
      }
    }

    if (questionForm.marks <= 0) {
      newErrors.marks = 'Marks must be greater than 0';
    }

    if (!questionForm.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm() || !currentFaculty) return;

    setIsSubmitting(true);

    try {
      const questionData = {
        ...questionForm,
        categoryId: questionForm.categoryId === 'none' ? '' : questionForm.categoryId,
        facultyId: currentFaculty.id,
        departmentId: currentFaculty.departmentId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      addQuestion(questionData);

      // Reset form
      setQuestionForm({
        title: '',
        type: 'multiple-choice',
        content: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        marks: 5,
        explanation: '',
        difficulty: 'medium',
        subject: '',
        categoryId: 'none'
      });

      // Navigate back to question bank
      router.push('/faculty/questions');
    } catch (error) {
      console.error('Error creating question:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle option changes for multiple choice
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...questionForm.options];
    newOptions[index] = value;
    setQuestionForm({...questionForm, options: newOptions});
  };

  // Handle question type change
  const handleTypeChange = (type: string) => {
    const newType = type as QuestionFormData['type'];
    setQuestionForm({
      ...questionForm,
      type: newType,
      options: newType === 'multiple-choice' ? ['', '', '', ''] : [],
      correctAnswer: ''
    });
  };

  // Handle adding question to bulk queue
  const handleAddToBulkQueue = () => {
    if (!validateForm()) return;

    setBulkQueue(prev => [...prev, {...questionForm}]);
    
    // Reset form for next question
    setQuestionForm({
      title: '',
      type: 'multiple-choice',
      content: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      marks: 5,
      explanation: '',
      difficulty: 'medium',
      subject: '',
      categoryId: 'none'
    });
    
    setErrors({});
  };

  // Handle bulk upload navigation
  const handleBulkUpload = () => {
    router.push('/faculty/questions/bulk-upload');
  };

  return (
    <FacultyLayout
      title="Create New Question"
      subtitle="Design a comprehensive question for your question bank"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => router.push('/faculty/questions')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Question Bank
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleBulkUpload}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Bulk Upload
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/faculty/questions')}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              variant="secondary"
              onClick={handleAddToBulkQueue}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Add to Bulk Queue ({bulkQueue.length})
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {isSubmitting ? 'Creating...' : 'Create Question'}
            </Button>
          </div>
        </div>

        {/* Question Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Question Type
            </CardTitle>
            <CardDescription>
              Choose the type of question you want to create
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  type: 'multiple-choice',
                  title: 'Multiple Choice',
                  description: 'Students select from predefined options',
                  icon: '📝'
                },
                {
                  type: 'true-false',
                  title: 'True/False',
                  description: 'Simple true or false questions',
                  icon: '✓✗'
                },
                {
                  type: 'short-answer',
                  title: 'Short Answer',
                  description: 'Brief text responses from students',
                  icon: '📝'
                },
                {
                  type: 'essay',
                  title: 'Essay',
                  description: 'Long-form written responses',
                  icon: '📄'
                }
              ].map((option) => (
                <Card
                  key={option.type}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    questionForm.type === option.type
                      ? 'ring-2 ring-primary bg-primary/5 border-primary/20'
                      : 'hover:bg-accent/50'
                  }`}
                  onClick={() => handleTypeChange(option.type)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{option.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-medium">{option.title}</h3>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                      {questionForm.type === option.type && (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Provide the core details for your question
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="title">Question Title *</Label>
                <Input
                  id="title"
                  value={questionForm.title}
                  onChange={(e) => setQuestionForm({...questionForm, title: e.target.value})}
                  placeholder="Brief title for the question"
                  className={errors.title ? 'border-red-500' : ''}
                  suppressHydrationWarning
                />
                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
              </div>

              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={questionForm.subject}
                  onChange={(e) => setQuestionForm({...questionForm, subject: e.target.value})}
                  placeholder="e.g., Mathematics, Physics"
                  className={errors.subject ? 'border-red-500' : ''}
                  suppressHydrationWarning
                />
                {errors.subject && <p className="text-sm text-red-500 mt-1">{errors.subject}</p>}
              </div>

              <div>
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select
                  value={questionForm.difficulty}
                  onValueChange={(value) =>
                    setQuestionForm({...questionForm, difficulty: value as 'easy' | 'medium' | 'hard'})
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">Easy</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="hard">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-red-100 text-red-800">Hard</Badge>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="content">Question Content *</Label>
              <Textarea
                id="content"
                value={questionForm.content}
                onChange={(e) => setQuestionForm({...questionForm, content: e.target.value})}
                placeholder="Enter the full question text here..."
                rows={4}
                className={errors.content ? 'border-red-500' : ''}
                suppressHydrationWarning
              />
              {errors.content && <p className="text-sm text-red-500 mt-1">{errors.content}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="marks">Marks *</Label>
                <Input
                  id="marks"
                  type="number"
                  value={questionForm.marks}
                  onChange={(e) => setQuestionForm({...questionForm, marks: parseInt(e.target.value) || 0})}
                  min="1"
                  className={errors.marks ? 'border-red-500' : ''}
                  suppressHydrationWarning
                />
                {errors.marks && <p className="text-sm text-red-500 mt-1">{errors.marks}</p>}
              </div>

              <div>
                <Label htmlFor="examType">Exam Type (Optional)</Label>
                <Select
                  value={questionForm.categoryId}
                  onValueChange={(value) => setQuestionForm({...questionForm, categoryId: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select exam type (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Exam Type</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Answer Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Answer Configuration</CardTitle>
            <CardDescription>
              Set up the correct answer and options for this question
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {questionForm.type === 'multiple-choice' && (
              <div className="space-y-4">
                <Label>Answer Options *</Label>
                {questionForm.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className={errors.options ? 'border-red-500' : ''}
                      suppressHydrationWarning
                    />
                    <Button
                      type="button"
                      variant={questionForm.correctAnswer === index.toString() ? "default" : "outline"}
                      size="sm"
                      onClick={() => setQuestionForm({...questionForm, correctAnswer: index.toString()})}
                    >
                      {questionForm.correctAnswer === index.toString() ? 'Correct' : 'Mark Correct'}
                    </Button>
                  </div>
                ))}
                {errors.options && <p className="text-sm text-red-500">{errors.options}</p>}
                {errors.correctAnswer && <p className="text-sm text-red-500">{errors.correctAnswer}</p>}
              </div>
            )}

            {questionForm.type === 'true-false' && (
              <div className="space-y-4">
                <Label>Correct Answer *</Label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={questionForm.correctAnswer === 'true' ? "default" : "outline"}
                    onClick={() => setQuestionForm({...questionForm, correctAnswer: 'true'})}
                  >
                    True
                  </Button>
                  <Button
                    type="button"
                    variant={questionForm.correctAnswer === 'false' ? "default" : "outline"}
                    onClick={() => setQuestionForm({...questionForm, correctAnswer: 'false'})}
                  >
                    False
                  </Button>
                </div>
                {errors.correctAnswer && <p className="text-sm text-red-500">{errors.correctAnswer}</p>}
              </div>
            )}

            {(questionForm.type === 'short-answer' || questionForm.type === 'essay') && (
              <div>
                <Label htmlFor="correctAnswer">Correct Answer *</Label>
                <Textarea
                  id="correctAnswer"
                  value={questionForm.correctAnswer}
                  onChange={(e) => setQuestionForm({...questionForm, correctAnswer: e.target.value})}
                  placeholder={questionForm.type === 'short-answer' ? 'Expected short answer' : 'Model answer or key points'}
                  rows={questionForm.type === 'essay' ? 4 : 2}
                  className={errors.correctAnswer ? 'border-red-500' : ''}
                  suppressHydrationWarning
                />
                {errors.correctAnswer && <p className="text-sm text-red-500 mt-1">{errors.correctAnswer}</p>}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Explanation */}
        <Card>
          <CardHeader>
            <CardTitle>Explanation (Optional)</CardTitle>
            <CardDescription>
              Provide an explanation to help students understand the correct answer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={questionForm.explanation}
              onChange={(e) => setQuestionForm({...questionForm, explanation: e.target.value})}
              placeholder="Explain why this is the correct answer and provide additional context..."
              rows={4}
              suppressHydrationWarning
            />
          </CardContent>
        </Card>

        {/* Submit Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <Button
            variant="outline"
            onClick={() => router.push('/faculty/questions')}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? 'Creating Question...' : 'Create Question'}
          </Button>
        </div>

        {/* Bulk Queue Section */}
        {bulkQueue.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Bulk Queue ({bulkQueue.length} questions)
              </CardTitle>
              <CardDescription>
                Questions ready for bulk processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bulkQueue.map((question, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{question.title || `Question ${index + 1}`}</div>
                      <div className="text-sm text-muted-foreground">
                        {question.type} • {question.subject} • {question.marks} marks
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setBulkQueue(prev => prev.filter((_, i) => i !== index));
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => {
                      // Process bulk queue - add all questions
                      bulkQueue.forEach(question => {
                        if (currentFaculty) {
                          const questionData = {
                            ...question,
                            facultyId: currentFaculty.id,
                            departmentId: currentFaculty.departmentId,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString()
                          };
                          addQuestion(questionData);
                        }
                      });
                      setBulkQueue([]);
                      router.push('/faculty/questions');
                    }}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Process Bulk Queue
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setBulkQueue([])}
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </FacultyLayout>
  );
}