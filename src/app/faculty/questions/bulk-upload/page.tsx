"use client";

import { FacultyLayout } from "@/components/FacultyLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useProctor } from '@/contexts/ProctorContext';
import {
    ArrowLeft,
    Download,
    FileText,
    Upload,
    X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface BulkQuestionData {
  title: string;
  type: string;
  content: string;
  options: string[];
  correctAnswer: string;
  marks: number;
  explanation: string;
  difficulty: string;
  subject: string;
  categoryId: string;
}

export default function BulkUploadPage() {
  const router = useRouter();
  const {
    currentUser,
    faculties,
    categories,
    addQuestion
  } = useProctor();

  // Find current faculty
  const currentFaculty = faculties.find(f => f.userId === currentUser?.id);

  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [parsedQuestions, setParsedQuestions] = useState<BulkQuestionData[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [successCount, setSuccessCount] = useState(0);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setErrors([]);
      setParsedQuestions([]);
    }
  };

  // Parse CSV file
  const parseCSV = (content: string): BulkQuestionData[] => {
    const lines = content.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

    const questions: BulkQuestionData[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length < headers.length) continue;

      const question: any = {};
      headers.forEach((header, index) => {
        let value = values[index] || '';

        // Handle special cases
        if (header === 'options' && value) {
          question[header] = value.split(';').map((opt: string) => opt.trim());
        } else if (header === 'marks' || header === 'correctanswer') {
          question[header] = parseInt(value) || 0;
        } else if (header === 'categoryid' || header === 'category') {
          // Find category by name
          const category = categories.find(c => c.name.toLowerCase() === value.toLowerCase());
          question.categoryId = category ? category.id : '';
        } else {
          question[header] = value;
        }
      });

      questions.push(question as BulkQuestionData);
    }

    return questions;
  };

  // Validate questions
  const validateQuestions = (questions: BulkQuestionData[]): string[] => {
    const validationErrors: string[] = [];

    questions.forEach((question, index) => {
      if (!question.title?.trim()) {
        validationErrors.push(`Question ${index + 1}: Title is required`);
      }
      if (!question.content?.trim()) {
        validationErrors.push(`Question ${index + 1}: Content is required`);
      }
      if (!question.type?.trim()) {
        validationErrors.push(`Question ${index + 1}: Type is required`);
      }
      if (question.type === 'multiple-choice') {
        if (!question.options || question.options.length < 2) {
          validationErrors.push(`Question ${index + 1}: Multiple choice requires at least 2 options`);
        }
      }
      if (question.correctAnswer === undefined || question.correctAnswer === null || question.correctAnswer === '') {
        validationErrors.push(`Question ${index + 1}: Correct answer is required`);
      }
    });

    return validationErrors;
  };

  // Handle file upload and parsing
  const handleFileUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    setErrors([]);

    try {
      const content = await file.text();
      setUploadProgress(25);

      const questions = parseCSV(content);
      setUploadProgress(50);

      const validationErrors = validateQuestions(questions);
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        setIsUploading(false);
        return;
      }

      setParsedQuestions(questions);
      setUploadProgress(100);
    } catch (error) {
      setErrors(['Failed to parse file. Please check the format.']);
    } finally {
      setIsUploading(false);
    }
  };

  // Process bulk upload
  const handleBulkUpload = async () => {
    if (!currentFaculty || parsedQuestions.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);
    setSuccessCount(0);

    try {
      for (let i = 0; i < parsedQuestions.length; i++) {
        const question = parsedQuestions[i];

        const questionData = {
          ...question,
          facultyId: currentFaculty.id,
          departmentId: currentFaculty.departmentId,
          categoryId: question.categoryId || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        addQuestion(questionData);
        setSuccessCount(i + 1);
        setUploadProgress(((i + 1) / parsedQuestions.length) * 100);

        // Small delay to show progress
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Redirect after successful upload
      setTimeout(() => {
        router.push('/faculty/questions');
      }, 1000);

    } catch (error) {
      setErrors(['Failed to upload questions. Please try again.']);
    } finally {
      setIsUploading(false);
    }
  };

  // Download sample CSV
  const downloadSampleCSV = () => {
    const sampleData = `title,type,content,options,correctAnswer,marks,explanation,difficulty,subject,categoryId
Sample Multiple Choice,multiple-choice,What is 2+2?,Four;Five;Six;Seven,0,5,Basic arithmetic,easy,Mathematics,Logical Reasoning
Sample True/False,true-false,The sky is blue.,,true,2,Basic observation,easy,Science,General Knowledge
Sample Short Answer,short-answer,What is the capital of France?,,Paris,3,Geography knowledge,medium,Geography,Verbal Ability`;

    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_questions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <FacultyLayout
      title="Bulk Question Upload"
      subtitle="Upload multiple questions at once using CSV format"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => router.push('/faculty/questions/create')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Create Question
          </Button>
        </div>

        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              File Upload
            </CardTitle>
            <CardDescription>
              Upload a CSV file containing your questions. Download the sample format for reference.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={downloadSampleCSV}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Sample CSV
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Select CSV File</Label>
              <Input
                id="file"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </div>

            {file && (
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="text-sm">{file.name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleFileUpload}
                  disabled={isUploading}
                >
                  {isUploading ? 'Processing...' : 'Process File'}
                </Button>
              </div>
            )}

            {isUploading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} />
                <p className="text-sm text-muted-foreground">
                  {uploadProgress < 100 ? 'Processing file...' : 'File processed successfully'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Errors */}
        {errors.length > 0 && (
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Validation Errors</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {errors.map((error, index) => (
                  <li key={index} className="text-sm text-red-600">• {error}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Parsed Questions Preview */}
        {parsedQuestions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Questions Preview ({parsedQuestions.length} questions)
              </CardTitle>
              <CardDescription>
                Review the questions before uploading
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {parsedQuestions.map((question, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{question.title}</h4>
                      <Badge variant="outline">{question.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{question.content}</p>
                    {question.type === 'multiple-choice' && question.options && (
                      <div className="text-sm">
                        <strong>Options:</strong> {question.options.join(', ')}
                      </div>
                    )}
                    <div className="text-sm mt-1">
                      <strong>Answer:</strong> {question.correctAnswer} |
                      <strong> Marks:</strong> {question.marks} |
                      <strong> Difficulty:</strong> {question.difficulty}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-6">
                <Button
                  onClick={handleBulkUpload}
                  disabled={isUploading}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {isUploading ? `Uploading... (${successCount}/${parsedQuestions.length})` : `Upload ${parsedQuestions.length} Questions`}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setParsedQuestions([]);
                    setFile(null);
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>

              {isUploading && (
                <div className="mt-4">
                  <Progress value={uploadProgress} />
                  <p className="text-sm text-muted-foreground mt-2">
                    Uploaded {successCount} of {parsedQuestions.length} questions
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>CSV Format Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>Required columns:</strong> title, type, content, correctAnswer, marks</p>
              <p><strong>Optional columns:</strong> options, explanation, difficulty, subject, examTypeId</p>
              <p><strong>Question types:</strong> multiple-choice, true-false, short-answer, essay</p>
              <p><strong>For multiple choice:</strong> Use semicolon (;) to separate options in the options column</p>
              <p><strong>Correct answer:</strong> For multiple choice, use the option index (0-based). For others, use the actual answer.</p>
              <p><strong>Exam Type ID:</strong> Use the ID from your exam types or leave empty for no category</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </FacultyLayout>
  );
}