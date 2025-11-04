"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";


import {
  LayoutDashboard,
  HelpCircle,
  FileText,
  Tag,
  Users,
  Clock,
  BarChart3,
  ArrowLeft,
  Upload,
  X,
  Plus,
  Check,
} from "lucide-react";
import Topbar from "@/containers/student/Topbar";
import { FacultySidebar } from "@/components/FacultySidebar";

export default function CreateQuestionPage() {
  const [questionType, setQuestionType] = useState("multiple-choice");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const toggleCorrectAnswer = (option: string) => {
    if (correctAnswers.includes(option)) {
      setCorrectAnswers(correctAnswers.filter((a) => a !== option));
    } else {
      setCorrectAnswers([...correctAnswers, option]);
    }
  };

  const handleCreateQuestion = () => {
    console.log("Question Created ✅");
  };

  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <FacultySidebar />
      <div className="pl-64 pt-16 min-h-screen bg-background">
        {/* Page Header */}
        <div className="bg-card border-b border-border px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground">Create New Question</h1>
            <p className="mt-2 text-lg text-muted-foreground">Design a comprehensive question for your question bank</p>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-8 py-6">

        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Question Bank
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Upload className="w-4 h-4" />
              Bulk Upload
            </Button>
            <Button variant="outline" className="gap-2">
              <X className="w-4 h-4" />
              Cancel
            </Button>
            <Button variant="outline" className="gap-2" disabled>
              <Plus className="w-4 h-4" />
              Add to Bulk Queue (0)
            </Button>
            <Button className="gap-2 bg-blue-700 hover:bg-blue-800">
              <Plus className="w-4 h-4" />
              Create Question
            </Button>
          </div>
        </div>

        {/* Question Type Card */}
        <Card className="mb-6">
          <CardHeader className="border-b">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              <CardTitle className="text-lg">Question Type</CardTitle>
            </div>
            <p className="text-sm text-gray-500 mt-1">Choose the type of question you want to create</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Multiple Choice */}
              <button
                onClick={() => setQuestionType("multiple-choice")}
                className={`relative border rounded-lg p-4 text-left transition-all ${
                  questionType === "multiple-choice"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <FileText className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">Multiple Choice</h3>
                    <p className="text-sm text-gray-500">Students select from predefined options</p>
                  </div>
                </div>
                {questionType === "multiple-choice" && (
                  <Check className="absolute top-4 right-4 w-5 h-5 text-blue-600" />
                )}
              </button>

              {/* True/False */}
              <button
                onClick={() => setQuestionType("true-false")}
                className={`relative border rounded-lg p-4 text-left transition-all ${
                  questionType === "true-false"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">True/False</h3>
                    <p className="text-sm text-gray-500">Simple true or false questions</p>
                  </div>
                </div>
                {questionType === "true-false" && (
                  <Check className="absolute top-4 right-4 w-5 h-5 text-blue-600" />
                )}
              </button>

              {/* Short Answer */}
              <button
                onClick={() => setQuestionType("short-answer")}
                className={`relative border rounded-lg p-4 text-left transition-all ${
                  questionType === "short-answer"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <FileText className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">Short Answer</h3>
                    <p className="text-sm text-gray-500">Brief text responses from students</p>
                  </div>
                </div>
                {questionType === "short-answer" && (
                  <Check className="absolute top-4 right-4 w-5 h-5 text-blue-600" />
                )}
              </button>

              {/* Essay */}
              <button
                onClick={() => setQuestionType("essay")}
                className={`relative border rounded-lg p-4 text-left transition-all ${
                  questionType === "essay"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">Essay</h3>
                    <p className="text-sm text-gray-500">Long-form written responses</p>
                  </div>
                </div>
                {questionType === "essay" && (
                  <Check className="absolute top-4 right-4 w-5 h-5 text-blue-600" />
                )}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information Card */}
        <Card className="mb-6">
          <CardHeader className="border-b">
            <CardTitle className="text-lg">Basic Information</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Provide the core details for your question</p>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {/* Question Title */}
            <div>
              <Label className="text-sm font-medium">Question Title *</Label>
              <Input placeholder="Brief title for the question" className="mt-1.5" />
            </div>

            {/* Subject and Difficulty */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Subject *</Label>
                <Input placeholder="e.g., Mathematics, Physics" className="mt-1.5" />
              </div>
              <div>
                <Label className="text-sm font-medium">Difficulty Level</Label>
                <Select defaultValue="medium">
                  <SelectTrigger className="mt-1.5">
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

            {/* Question Content */}
            <div>
              <Label className="text-sm font-medium">Question Content *</Label>
              <Textarea 
                placeholder="Enter the full question text here..." 
                className="mt-1.5 min-h-[120px]"
              />
            </div>

            {/* Marks and Exam Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Marks *</Label>
                <Input type="number" placeholder="5" className="mt-1.5" />
              </div>
              <div>
                <Label className="text-sm font-medium">Exam Type</Label>
                <Select defaultValue="none">
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Exam Type</SelectItem>
                    <SelectItem value="logical">Logical</SelectItem>
                    <SelectItem value="reasoning">Reasoning</SelectItem>
                    <SelectItem value="aptitude">Aptitude</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Answer Configuration Card */}
        <Card className="mb-6">
          <CardHeader className="border-b">
            <CardTitle className="text-lg">Answer Configuration</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Set up the correct answer and options for this question</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div>
              <Label className="text-sm font-medium mb-3 block">Answer Options *</Label>
              <div className="space-y-3">
                {["Option 1", "Option 2", "Option 3", "Option 4"].map((label, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Input 
                      placeholder={label}
                      value={options[idx]}
                      onChange={(e) => handleOptionChange(idx, e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant={correctAnswers.includes(`option-${idx}`) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleCorrectAnswer(`option-${idx}`)}
                      className="whitespace-nowrap"
                    >
                      Mark Correct
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Explanation Card */}
        <Card className="mb-6">
          <CardHeader className="border-b">
            <CardTitle className="text-lg">Explanation (Optional)</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Provide an explanation to help students understand the correct answer</p>
          </CardHeader>
          <CardContent className="pt-6">
            <Textarea 
              placeholder="Explain why this is the correct answer and provide additional context..." 
              className="min-h-[120px]"
            />
          </CardContent>
        </Card>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" className="gap-2">
            <X className="w-4 h-4" />
            Cancel
          </Button>
          <Button onClick={handleCreateQuestion} className="gap-2 bg-blue-700 hover:bg-blue-800">
            <Plus className="w-4 h-4" />
            Create Question
          </Button>
        </div>
        </main>
      </div>
    </div>
  );
}