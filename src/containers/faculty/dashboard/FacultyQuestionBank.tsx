"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProctor } from '@/contexts/ProctorContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  FileText,
  HelpCircle,
  Eye,
  EyeOff,
  Upload,
  FileUp
} from 'lucide-react';

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

export default function FacultyQuestionBank() {
  const {
    currentUser,
    faculties,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion
  } = useProctor();

  const router = useRouter();

  // Find current faculty
  const currentFaculty = faculties.find(f => f.userId === currentUser?.id);

  const facultyQuestions = currentFaculty ? questions.filter(q => q.facultyId === currentFaculty.id) : [];

  // State management
  const [isCreateQuestionOpen, setIsCreateQuestionOpen] = useState(false);
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

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
    categoryId: ''
  });

  // Category form state
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: ''
  });

  // Bulk upload state
  const [bulkUploadFile, setBulkUploadFile] = useState<File | null>(null);
  const [bulkUploadType, setBulkUploadType] = useState<'csv' | 'pdf'>('csv');
  const [isUploading, setIsUploading] = useState(false);

  // Helper to reset question form
  const resetQuestionForm = () => {
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
    setEditingQuestion(null);
  };

  // Populate form for editing question
  const populateQuestionForm = (question: any) => {
    setQuestionForm({
      title: question.title,
      type: question.type,
      content: question.content,
      options: question.options || ['', '', '', ''],
      correctAnswer: question.correctAnswer?.toString() || '',
      marks: question.marks,
      explanation: question.explanation || '',
      difficulty: question.difficulty,
      subject: question.subject,
      categoryId: question.categoryId || 'none'
    });
    setEditingQuestion(question);
    setIsCreateQuestionOpen(true);
  };

  // Handle question creation/update
  const handleQuestionSubmit = () => {
    // Validation
    if (!questionForm.title.trim() || !questionForm.content.trim()) {
      alert('Please fill in all required fields: title and content.');
      return;
    }

    if (questionForm.type === 'multiple-choice') {
      if (questionForm.options.some(option => !option.trim()) || questionForm.correctAnswer === '') {
        alert('For multiple-choice questions, please fill all options and select the correct answer.');
        return;
      }
    } else if (!questionForm.correctAnswer.trim()) {
      alert('Please provide the correct answer.');
      return;
    }

    if (questionForm.marks <= 0) {
      alert('Marks must be a positive number.');
      return;
    }

    if (!currentFaculty) return;

    const questionData = {
      ...questionForm,
      facultyId: currentFaculty.id,
      categoryId: questionForm.categoryId === 'none' ? '' : questionForm.categoryId,
      correctAnswer: questionForm.type === 'multiple-choice' ?
        parseInt(questionForm.correctAnswer) :
        questionForm.correctAnswer,
      isActive: true
    };

    if (editingQuestion) {
      updateQuestion(editingQuestion.id, questionData);
    } else {
      addQuestion(questionData);
    }

    resetQuestionForm();
    setIsCreateQuestionOpen(false);
  };

  // Handle category creation
  const handleCategorySubmit = () => {
    if (!categoryForm.name.trim()) {
      alert('Please enter a category name.');
      return;
    }

    // Check if category already exists
    if (categories.some(cat => cat.name.toLowerCase() === categoryForm.name.toLowerCase())) {
      alert('A category with this name already exists.');
      return;
    }

    addCategory({
      name: categoryForm.name.trim(),
      description: categoryForm.description.trim(),
      isActive: true
    });

    setCategoryForm({ name: '', description: '' });
    setIsCreateCategoryOpen(false);
  };

  // Handle question deletion
  const handleDeleteQuestion = (questionId: string) => {
    if (window.confirm('Are you sure you want to delete this question? This action cannot be undone.')) {
      deleteQuestion(questionId);
    }
  };

  // Handle bulk upload
  const handleBulkUpload = async () => {
    if (!bulkUploadFile || !currentFaculty) return;

    setIsUploading(true);

    try {
      if (bulkUploadType === 'csv') {
        await handleCsvUpload(bulkUploadFile);
      } else {
        await handlePdfUpload(bulkUploadFile);
      }

      setIsBulkUploadOpen(false);
      setBulkUploadFile(null);
      setBulkUploadType('csv');
      alert('Questions uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading questions. Please check the file format and try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Handle CSV upload
  const handleCsvUpload = async (file: File) => {
    const text = await file.text();
    const lines = text.split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
      throw new Error('CSV file must have at least a header row and one data row');
    }

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const expectedHeaders = ['title', 'type', 'content', 'option1', 'option2', 'option3', 'option4', 'correctanswer', 'marks', 'explanation', 'difficulty', 'subject', 'category'];

    // Check if required headers are present
    const requiredHeaders = ['title', 'type', 'content', 'correctanswer', 'marks', 'difficulty', 'subject'];
    for (const required of requiredHeaders) {
      if (!headers.includes(required)) {
        throw new Error(`Missing required column: ${required}`);
      }
    }

    const questionsToAdd = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length !== headers.length) continue; // Skip malformed rows

      const questionData: any = {
        facultyId: currentFaculty.id,
        isActive: true
      };

      headers.forEach((header, index) => {
        const value = values[index];
        
        switch (header) {
          case 'title':
            questionData.title = value;
            break;
          case 'type':
            questionData.type = value;
            break;
          case 'content':
            questionData.content = value;
            break;
          case 'option1':
          case 'option2':
          case 'option3':
          case 'option4':
            if (!questionData.options) questionData.options = [];
            questionData.options.push(value);
            break;
          case 'correctanswer':
            questionData.correctAnswer = questionData.type === 'multiple-choice' ? parseInt(value) : value;
            break;
          case 'marks':
            questionData.marks = parseInt(value) || 5;
            break;
          case 'explanation':
            questionData.explanation = value;
            break;
          case 'difficulty':
            questionData.difficulty = value;
            break;
          case 'subject':
            questionData.subject = value;
            break;
          case 'category':
            // Find category by name
            const category = categories.find(c => c.name.toLowerCase() === value.toLowerCase());
            questionData.categoryId = category ? category.id : '';
            break;
        }
      });

      // Validate required fields
      if (!questionData.title || !questionData.content) {
        console.warn(`Skipping invalid question at row ${i + 1}`);
        continue;
      }

      questionsToAdd.push(questionData);
    }

    // Add all questions
    for (const question of questionsToAdd) {
      addQuestion(question);
    }
  };

  // Handle PDF upload (basic implementation)
  const handlePdfUpload = async (file: File) => {
    // For now, show a message that PDF parsing is not fully implemented
    // In a real implementation, you would use a PDF parsing library like pdf-parse
    alert('PDF upload is not fully implemented yet. Please use CSV format for bulk uploads.');
    
    // Placeholder for future PDF parsing implementation
    // const pdfText = await parsePdf(file);
    // const questions = parseQuestionsFromPdfText(pdfText);
    // questions.forEach(q => addQuestion(q));
  };

  // Filter questions based on category and search
  const filteredQuestions = facultyQuestions.filter(question => {
    const matchesCategory = selectedCategory === 'all' || question.categoryId === selectedCategory || (!question.categoryId && selectedCategory === 'all');
    const matchesSearch = searchQuery === '' ||
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.subject.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="flex justify-end items-center">
        <div className="flex gap-2">
          <Dialog open={isBulkUploadOpen} onOpenChange={setIsBulkUploadOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Bulk Upload
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Bulk Upload Questions</DialogTitle>
                <DialogDescription>
                  Upload questions from a CSV or PDF file.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="upload-type">Upload Type</Label>
                  <Select value={bulkUploadType} onValueChange={(value: 'csv' | 'pdf') => setBulkUploadType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="upload-file">Select File</Label>
                  <Input
                    id="upload-file"
                    type="file"
                    accept={bulkUploadType === 'csv' ? '.csv' : '.pdf'}
                    onChange={(e) => setBulkUploadFile(e.target.files?.[0] || null)}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsBulkUploadOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleBulkUpload} disabled={!bulkUploadFile || isUploading}>
                    {isUploading ? 'Uploading...' : 'Upload'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button onClick={() => router.push('/faculty/questions/create')}>
            <Plus className="h-4 w-4 mr-2" />
            Create Question
          </Button>

          <Dialog open={isCreateQuestionOpen} onOpenChange={(open) => {
            setIsCreateQuestionOpen(open);
            if (!open) resetQuestionForm();
          }}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Question</DialogTitle>
                <DialogDescription>
                  Update the question details
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="q-title">Question Title *</Label>
                  <Input
                    id="q-title"
                    value={questionForm.title}
                    onChange={(e) => setQuestionForm({...questionForm, title: e.target.value})}
                    placeholder="Brief title for the question"
                  />
                </div>

                <div>
                  <Label htmlFor="q-type">Question Type *</Label>
                  <Select value={questionForm.type} onValueChange={(value: any) => setQuestionForm({...questionForm, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                      <SelectItem value="true-false">True/False</SelectItem>
                      <SelectItem value="short-answer">Short Answer</SelectItem>
                      <SelectItem value="essay">Essay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="q-content">Question Content *</Label>
                  <Textarea
                    id="q-content"
                    value={questionForm.content}
                    onChange={(e) => setQuestionForm({...questionForm, content: e.target.value})}
                    placeholder="Enter the full question text"
                    rows={3}
                  />
                </div>

                {questionForm.type === 'multiple-choice' && (
                  <div>
                    <Label>Options *</Label>
                    {questionForm.options.map((option, index) => (
                      <Input
                        key={index}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...questionForm.options];
                          newOptions[index] = e.target.value;
                          setQuestionForm({...questionForm, options: newOptions});
                        }}
                        placeholder={`Option ${index + 1}`}
                        className="mb-2"
                      />
                    ))}
                  </div>
                )}

                <div>
                  <Label htmlFor="q-answer">Correct Answer *</Label>
                  {questionForm.type === 'multiple-choice' ? (
                    <Select value={questionForm.correctAnswer} onValueChange={(value: string) => setQuestionForm({...questionForm, correctAnswer: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select correct option" />
                      </SelectTrigger>
                      <SelectContent>
                        {questionForm.options.map((option, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            Option {index + 1}: {option || `Option ${index + 1}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id="q-answer"
                      value={questionForm.correctAnswer}
                      onChange={(e) => setQuestionForm({...questionForm, correctAnswer: e.target.value})}
                      placeholder="Enter the correct answer"
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="q-marks">Marks *</Label>
                    <Input
                      id="q-marks"
                      type="number"
                      value={questionForm.marks}
                      onChange={(e) => setQuestionForm({...questionForm, marks: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="q-difficulty">Difficulty *</Label>
                    <Select value={questionForm.difficulty} onValueChange={(value: any) => setQuestionForm({...questionForm, difficulty: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="q-subject">Subject *</Label>
                  <Input
                    id="q-subject"
                    value={questionForm.subject}
                    onChange={(e) => setQuestionForm({...questionForm, subject: e.target.value})}
                    placeholder="e.g., Data Structures, Algorithms"
                  />
                </div>

                <div>
                  <Label htmlFor="q-category">Category (Optional)</Label>
                  <Select value={questionForm.categoryId} onValueChange={(value: string) => setQuestionForm({...questionForm, categoryId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Category</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="q-explanation">Explanation (Optional)</Label>
                  <Textarea
                    id="q-explanation"
                    value={questionForm.explanation}
                    onChange={(e) => setQuestionForm({...questionForm, explanation: e.target.value})}
                    placeholder="Explain why this is the correct answer"
                    rows={2}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => {
                    setIsCreateQuestionOpen(false);
                    resetQuestionForm();
                  }}>
                    Cancel
                  </Button>
                  <Button onClick={handleQuestionSubmit}>
                    {editingQuestion ? 'Update Question' : 'Create Question'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{facultyQuestions.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exam Types</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Easy</CardTitle>
            <Badge variant="secondary">Easy</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{facultyQuestions.filter(q => q.difficulty === 'easy').length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medium/Hard</CardTitle>
            <Badge variant="default">M/H</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{facultyQuestions.filter(q => q.difficulty !== 'easy').length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Questions</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by title, content, or subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="category-filter">Exam Type</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All exam types</SelectItem>
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

      {/* Questions Display */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({filteredQuestions.length})</TabsTrigger>
          {categories.slice(0, 4).map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name} ({filteredQuestions.filter(q => q.categoryId === category.id).length})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <HelpCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No questions found</h3>
                <p className="text-muted-foreground text-center mb-4">
                  {searchQuery || selectedCategory !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Start by creating your first question.'}
                </p>
                <Button onClick={() => router.push('/faculty/questions/create')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Question
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredQuestions.map((question) => {
                return (
                  <Card key={question.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{question.title}</CardTitle>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={
                              question.difficulty === 'easy' ? 'secondary' :
                              question.difficulty === 'medium' ? 'default' : 'destructive'
                            }>
                              {question.difficulty}
                            </Badge>
                            <Badge variant="outline">{question.type}</Badge>
                            <Badge variant="outline">{question.subject}</Badge>
                            <Badge variant="outline" className="bg-accent text-accent-foreground border-accent">
                              {categories.find(c => c.id === question.categoryId)?.name || 'Unknown'}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {question.marks} marks
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => populateQuestionForm(question)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Question</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this question? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteQuestion(question.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">{question.content}</p>

                      {question.type === 'multiple-choice' && question.options && (
                        <div className="space-y-1 mb-4">
                          {question.options.map((option: any, index: number) => (
                            <div key={index} className={`text-sm p-2 rounded border ${
                              index === question.correctAnswer ? 'bg-success/10 border-success text-success-foreground' : 'bg-muted'
                            }`}>
                              {index + 1}. {option}
                              {index === question.correctAnswer && (
                                <Badge variant="secondary" className="ml-2">Correct</Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {question.explanation && (
                        <div className="bg-accent p-3 rounded border-l-4 border-accent-foreground/20">
                          <p className="text-sm text-accent-foreground">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      )}

                      <div className="flex justify-between items-center mt-4 pt-4 border-t">
                        <div className="text-sm text-muted-foreground">
                          Created: {new Date(question.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <div className="grid gap-4">
              {filteredQuestions.filter(q => q.categoryId === category.id).map((question) => {
                return (
                  <Card key={question.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{question.title}</CardTitle>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={
                              question.difficulty === 'easy' ? 'secondary' :
                              question.difficulty === 'medium' ? 'default' : 'destructive'
                            }>
                              {question.difficulty}
                            </Badge>
                            <Badge variant="outline">{question.type}</Badge>
                            <Badge variant="outline">{question.subject}</Badge>
                            <Badge variant="outline" className="bg-accent text-accent-foreground border-accent">
                              {category.name}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {question.marks} marks
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => populateQuestionForm(question)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Question</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this question? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteQuestion(question.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">{question.content}</p>

                      {question.type === 'multiple-choice' && question.options && (
                        <div className="space-y-1 mb-4">
                          {question.options.map((option: any, index: number) => (
                            <div key={index} className={`text-sm p-2 rounded border ${
                              index === question.correctAnswer ? 'bg-success/10 border-success text-success-foreground' : 'bg-muted'
                            }`}>
                              {index + 1}. {option}
                              {index === question.correctAnswer && (
                                <Badge variant="secondary" className="ml-2">Correct</Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {question.explanation && (
                        <div className="bg-accent p-3 rounded border-l-4 border-accent-foreground/20">
                          <p className="text-sm text-accent-foreground">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      )}

                      <div className="flex justify-between items-center mt-4 pt-4 border-t">
                        <div className="text-sm text-muted-foreground">
                          Created: {new Date(question.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
