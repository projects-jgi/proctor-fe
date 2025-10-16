"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type QuestionItem = {
  id: number;
  questionText: string;
  questionType?: string;
  options?: string[];
  correctAnswer?: string;
  category?: string;
  difficulty?: string;
  createdAt?: string;
};

export default function AddQuestion() {
  const router = useRouter();

  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const [questionsList, setQuestionsList] = useState<QuestionItem[]>([]);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("question_bank_items");
      if (raw) setQuestionsList(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  function handleAddQuestion() {
    if (!questionText.trim()) {
      setStatusMessage("Please enter the question text.");
      setTimeout(() => setStatusMessage(""), 3000);
      return;
    }

    const newQ: QuestionItem = {
      id: Date.now(),
      questionText: questionText.trim(),
      questionType,
      options: [option1, option2, option3, option4].map((o) => o.trim()).filter(Boolean),
      correctAnswer,
      category,
      difficulty,
      createdAt: new Date().toISOString(),
    };

    setQuestionsList((s) => [newQ, ...s]);

    // clear fields
    setQuestionText("");
    setQuestionType("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setCorrectAnswer("");
    setCategory("");
    setDifficulty("");

    setStatusMessage("Question added to list. Click Save to persist.");
    setTimeout(() => setStatusMessage(""), 2500);
  }

  function handleSaveQuestions() {
    try {
      localStorage.setItem("question_bank_items", JSON.stringify(questionsList));
      setStatusMessage("Questions saved locally.");
      setTimeout(() => setStatusMessage(""), 2500);
    } catch (e) {
      setStatusMessage("Failed to save questions.");
      setTimeout(() => setStatusMessage(""), 3000);
    }
  }

  function handleRemoveQuestion(id: number) {
    setQuestionsList((s) => s.filter((q) => q.id !== id));
  }

  const handleBackToQuestionBank = () => router.push("/faculty/question_bank");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto flex">
        <aside className="w-72 p-6">
          <nav>
            <ul className="space-y-2">
              <li>
                <Link href="/faculty/dashboard" className="block px-4 py-3 rounded-lg hover:bg-gray-50">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/faculty/addQuestion" className="block px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                  Add Question
                </Link>
              </li>
              <li>
                <Link href="/faculty/question_bank" className="block px-4 py-3 rounded-lg hover:bg-gray-50">
                  Question Bank
                </Link>
              </li>
              <li>
                <Link href="/faculty/stud_results" className="block px-4 py-3 rounded-lg hover:bg-gray-50">
                  Results
                </Link>
              </li>
              <li>
                <Link href="/faculty/profile" className="block px-4 py-3 rounded-lg hover:bg-gray-50">
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1">Add Question</h1>
              <p className="text-sm text-gray-600">Manually add a single question to the question bank</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={handleBackToQuestionBank} className="px-4 py-2">
                Back to Question Bank
              </Button>
              <Button onClick={handleSaveQuestions}>Save All</Button>
            </div>
          </div>

          <Card className="rounded-2xl shadow-lg border border-gray-200">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label>Question Text</Label>
                  <textarea
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    className="w-full mt-2 p-3 border rounded-lg"
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Question Type</Label>
                  <select value={questionType} onChange={(e) => setQuestionType(e.target.value)} className="w-full mt-2 p-3 border rounded-lg">
                    <option value="">Select</option>
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="true-false">True/False</option>
                    <option value="short-answer">Short Answer</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Option 1</Label>
                    <input value={option1} onChange={(e) => setOption1(e.target.value)} className="w-full mt-2 p-3 border rounded-lg" />
                  </div>
                  <div>
                    <Label>Option 2</Label>
                    <input value={option2} onChange={(e) => setOption2(e.target.value)} className="w-full mt-2 p-3 border rounded-lg" />
                  </div>
                  <div>
                    <Label>Option 3</Label>
                    <input value={option3} onChange={(e) => setOption3(e.target.value)} className="w-full mt-2 p-3 border rounded-lg" />
                  </div>
                  <div>
                    <Label>Option 4</Label>
                    <input value={option4} onChange={(e) => setOption4(e.target.value)} className="w-full mt-2 p-3 border rounded-lg" />
                  </div>
                </div>

                <div>
                  <Label>Correct Answer</Label>
                  <select value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} className="w-full mt-2 p-3 border rounded-lg">
                    <option value="">Select correct answer</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    <option value="option4">Option 4</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full mt-2 p-3 border rounded-lg">
                      <option value="">Select category</option>
                      <option value="mathematics">Mathematics</option>
                      <option value="physics">Physics</option>
                      <option value="chemistry">Chemistry</option>
                      <option value="biology">Biology</option>
                    </select>
                  </div>
                  <div>
                    <Label>Difficulty</Label>
                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full mt-2 p-3 border rounded-lg">
                      <option value="">Select difficulty</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <Button onClick={handleAddQuestion} className="bg-green-600 text-white">
                    Add
                  </Button>
                  <Button variant="outline" onClick={handleSaveQuestions}>
                    Save
                  </Button>
                </div>

                {statusMessage ? <div className="text-sm text-gray-600 mt-2">{statusMessage}</div> : null}

                {questionsList.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold">Questions in list</h3>
                    <div className="mt-2 space-y-2">
                      {questionsList.map((q) => (
                        <div key={q.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{q.questionText}</div>
                            <div className="text-xs text-gray-500">
                              {q.category || "Uncategorized"} • {q.difficulty || "N/A"}
                            </div>
                          </div>
                          <div>
                            <button onClick={() => handleRemoveQuestion(q.id)} className="text-sm text-red-600">
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
```// filepath: c:\Users\Keerthi Mohanraj\MCA-Projects\proctor-fe\src\app\faculty\addQuestion\page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type QuestionItem = {
  id: number;
  questionText: string;
  questionType?: string;
  options?: string[];
  correctAnswer?: string;
  category?: string;
  difficulty?: string;
  createdAt?: string;
};

export default function AddQuestion() {
  const router = useRouter();

  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const [questionsList, setQuestionsList] = useState<QuestionItem[]>([]);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("question_bank_items");
      if (raw) setQuestionsList(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  function handleAddQuestion() {
    if (!questionText.trim()) {
      setStatusMessage("Please enter the question text.");
      setTimeout(() => setStatusMessage(""), 3000);
      return;
    }

    const newQ: QuestionItem = {
      id: Date.now(),
      questionText: questionText.trim(),
      questionType,
      options: [option1, option2, option3, option4].map((o) => o.trim()).filter(Boolean),
      correctAnswer,
      category,
      difficulty,
      createdAt: new Date().toISOString(),
    };

    setQuestionsList((s) => [newQ, ...s]);

    // clear fields
    setQuestionText("");
    setQuestionType("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setCorrectAnswer("");
    setCategory("");
    setDifficulty("");

    setStatusMessage("Question added to list. Click Save to persist.");
    setTimeout(() => setStatusMessage(""), 2500);
  }

  function handleSaveQuestions() {
    try {
      localStorage.setItem("question_bank_items", JSON.stringify(questionsList));
      setStatusMessage("Questions saved locally.");
      setTimeout(() => setStatusMessage(""), 2500);
    } catch (e) {
      setStatusMessage("Failed to save questions.");
      setTimeout(() => setStatusMessage(""), 3000);
    }
  }

  function handleRemoveQuestion(id: number) {
    setQuestionsList((s) => s.filter((q) => q.id !== id));
  }

  const handleBackToQuestionBank = () => router.push("/faculty/question_bank");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto flex">
        <aside className="w-72 p-6">
          <nav>
            <ul className="space-y-2">
              <li>
                <Link href="/faculty/dashboard" className="block px-4 py-3 rounded-lg hover:bg-gray-50">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/faculty/addQuestion" className="block px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                  Add Question
                </Link>
              </li>
              <li>
                <Link href="/faculty/question_bank" className="block px-4 py-3 rounded-lg hover:bg-gray-50">
                  Question Bank
                </Link>
              </li>
              <li>
                <Link href="/faculty/stud_results" className="block px-4 py-3 rounded-lg hover:bg-gray-50">
                  Results
                </Link>
              </li>
              <li>
                <Link href="/faculty/profile" className="block px-4 py-3 rounded-lg hover:bg-gray-50">
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1">Add Question</h1>
              <p className="text-sm text-gray-600">Manually add a single question to the question bank</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={handleBackToQuestionBank} className="px-4 py-2">
                Back to Question Bank
              </Button>
              <Button onClick={handleSaveQuestions}>Save All</Button>
            </div>
          </div>

          <Card className="rounded-2xl shadow-lg border border-gray-200">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label>Question Text</Label>
                  <textarea
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    className="w-full mt-2 p-3 border rounded-lg"
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Question Type</Label>
                  <select value={questionType} onChange={(e) => setQuestionType(e.target.value)} className="w-full mt-2 p-3 border rounded-lg">
                    <option value="">Select</option>
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="true-false">True/False</option>
                    <option value="short-answer">Short Answer</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Option 1</Label>
                    <input value={option1} onChange={(e) => setOption1(e.target.value)} className="w-full mt-2 p-3 border rounded-lg" />
                  </div>
                  <div>
                    <Label>Option 2</Label>
                    <input value={option2} onChange={(e) => setOption2(e.target.value)} className="w-full mt-2 p-3 border rounded-lg" />
                  </div>
                  <div>
                    <Label>Option 3</Label>
                    <input value={option3} onChange={(e) => setOption3(e.target.value)} className="w-full mt-2 p-3 border rounded-lg" />
                  </div>
                  <div>
                    <Label>Option 4</Label>
                    <input value={option4} onChange={(e) => setOption4(e.target.value)} className="w-full mt-2 p-3 border rounded-lg" />
                  </div>
                </div>

                <div>
                  <Label>Correct Answer</Label>
                  <select value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} className="w-full mt-2 p-3 border rounded-lg">
                    <option value="">Select correct answer</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    <option value="option4">Option 4</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full mt-2 p-3 border rounded-lg">
                      <option value="">Select category</option>
                      <option value="mathematics">Mathematics</option>
                      <option value="physics">Physics</option>
                      <option value="chemistry">Chemistry</option>
                      <option value="biology">Biology</option>
                    </select>
                  </div>
                  <div>
                    <Label>Difficulty</Label>
                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full mt-2 p-3 border rounded-lg">
                      <option value="">Select difficulty</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <Button onClick={handleAddQuestion} className="bg-green-600 text-white">
                    Add
                  </Button>
                  <Button variant="outline" onClick={handleSaveQuestions}>
                    Save
                  </Button>
                </div>

                {statusMessage ? <div className="text-sm text-gray-600 mt-2">{statusMessage}</div> : null}

                {questionsList.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold">Questions in list</h3>
                    <div className="mt-2 space-y-2">
                      {questionsList.map((q) => (
                        <div key={q.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{q.questionText}</div>
                            <div className="text-xs text-gray-500">
                              {q.category || "Uncategorized"} • {q.difficulty || "N/A"}
                            </div>
                          </div>
                          <div>
                            <button onClick={() => handleRemoveQuestion(q.id)} className="text-sm text-red-600">
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}