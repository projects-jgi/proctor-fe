"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Types
interface Question {
  id: number;
  text: string;
  options: string[];
  answer?: string;
  markedForReview?: boolean;
}

interface Section {
  name: string;
  total: number;
  questions: Question[];
}

export default function ExamInterface() {
  const sections: Section[] = [
    {
      name: "Quantitative Aptitude",
      total: 30,
      questions: Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        text: `Quantitative Aptitude Question ${i + 1}`,
        options: ["Option A", "Option B", "Option C", "Option D"],
      })),
    },
    {
      name: "English",
      total: 30,
      questions: Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        text: `English Question ${i + 1}`,
        options: ["Option A", "Option B", "Option C", "Option D"],
      })),
    },
    {
      name: "Reasoning",
      total: 25,
      questions: Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        text: `Reasoning Question ${i + 1}`,
        options: ["Option A", "Option B", "Option C", "Option D"],
      })),
    },
    {
      name: "General Awareness",
      total: 30,
      questions: Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        text: `General Awareness Question ${i + 1}`,
        options: ["Option A", "Option B", "Option C", "Option D"],
      })),
    },
  ];

  const [currentSection, setCurrentSection] = useState<Section>(sections[0]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60); // 3 hours
  const [score, setScore] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

  const candidate = { name: "Rajesh Kumar", studentId: "24MCAR0111" };

  // Timer effect with auto-submit
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  // Update answer for a question
  const selectAnswer = (qid: number, option: string) => {
    setCurrentSection((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === qid ? { ...q, answer: option } : q
      ),
    }));
  };

  // Toggle mark for review
  const toggleReview = (qid: number) => {
    setCurrentSection((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === qid ? { ...q, markedForReview: !q.markedForReview } : q
      ),
    }));
  };

  // Switch section
  const switchSection = (sectionName: string) => {
    const section = sections.find((s) => s.name === sectionName);
    if (section) {
      setCurrentSection(section);
      setCurrentQuestion(1);
    }
  };

  // Summary for current section only
  const getSectionSummary = (section: Section) => {
    let answered = 0;
    let marked = 0;
    let notAnswered = 0;

    section.questions.forEach((q) => {
      if (q.answer) answered++;
      else notAnswered++;
      if (q.markedForReview) marked++;
    });

    return { answered, notAnswered, marked };
  };

  // Submit exam
  const submitExam = () => {
    const examData = {
      candidate,
      timeLeft,
      submittedAt: new Date().toISOString(),
      sections: sections.map((section) => ({
        name: section.name,
        totalQuestions: section.total,
        questions: section.questions.map((q) => ({
          id: q.id,
          text: q.text,
          selectedAnswer: q.answer || null,
          markedForReview: q.markedForReview || false,
        })),
      })),
    };

    console.log("✅ Exam Submitted:", examData);
    alert("Exam Submitted Successfully!");
  };

  const handleSaveNextSection = () => {
    setShowDialog(true);
  };

  const confirmSaveNextSection = () => {
    setShowDialog(false);
    const currentIndex = sections.findIndex(
      (s) => s.name === currentSection.name
    );
    const nextSection = sections[currentIndex + 1];
    if (nextSection) {
      setCurrentSection(nextSection);
      setCurrentQuestion(1);
    } else {
      submitExam();
    }
  };

  const question = currentSection.questions[currentQuestion - 1];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 flex flex-col overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold">
            JGI
          </div>
        </div>

        <h2 className="font-semibold text-sm text-gray-600 mb-2">
          Exam Section
        </h2>

        <div className="flex flex-col gap-2">
          {sections.map((sec) => (
            <Button
              key={sec.name}
              onClick={() => switchSection(sec.name)}
              variant={currentSection.name === sec.name ? "default" : "outline"}
              className={`w-full ${
                currentSection.name === sec.name ? "bg-blue-900 text-white" : ""
              }`}
            >
              {sec.name} ({sec.total})
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-2 mt-6">
          {currentSection.questions.map((q) => (
            <Button
              key={q.id}
              onClick={() => setCurrentQuestion(q.id)}
              variant="outline"
              className={`w-12 h-12 text-sm
                ${currentQuestion === q.id ? "bg-blue-900 text-white" : ""}
                ${q.answer ? "bg-gray-800 text-white" : ""}
                ${q.markedForReview ? "bg-yellow-400 text-black" : ""}
              `}
            >
              {q.id}
            </Button>
          ))}
        </div>

        <div className="mt-6 text-sm space-y-1">
          <p>
            <span className="inline-block w-4 h-4 bg-blue-900 mr-2"></span>
            Current
          </p>
          <p>
            <span className="inline-block w-4 h-4 bg-gray-800 mr-2"></span>
            Answered
          </p>
          <p>
            <span className="inline-block w-4 h-4 bg-yellow-400 mr-2"></span>
            Marked
          </p>
          <p>
            <span className="inline-block w-4 h-4 bg-gray-400 mr-2"></span>
            Not answered
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="bg-blue-900 text-white px-4 py-2 rounded font-mono">
            {formatTime(timeLeft)}
          </div>
          <div className="text-right">
            <p className="font-semibold">Candidate Name: {candidate.name}</p>
            <p className="text-sm text-gray-600">Student ID: {candidate.studentId}</p>
          </div>
        </div>

        <Card className="flex-1">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {currentSection.name} - Question {currentQuestion} of {currentSection.total}
              </h2>
              <span className="font-semibold">Score: {score}</span>
            </div>

            <Separator className="mb-4" />

            <p className="mb-6">{question.text}</p>

            <div className="space-y-3">
              {question.options.map((opt, idx) => (
                <Button
                  key={idx}
                  onClick={() => selectAnswer(question.id, opt)}
                  variant="outline"
                  className={`w-full justify-start text-left ${
                    question.answer === opt ? "bg-blue-900 text-white" : ""
                  }`}
                >
                  {String.fromCharCode(65 + idx)}. {opt}
                </Button>
              ))}
            </div>

            <div className="mt-auto flex justify-between pt-6">
              <Button
                className="bg-blue-900 text-white"
                onClick={() =>
                  setCurrentQuestion((prev) => Math.max(1, prev - 1))
                }
                disabled={currentQuestion === 1}
              >
                Previous
              </Button>

              {/* Save & Next Section with confirmation */}
              <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                <AlertDialogTrigger asChild>
                  <Button
                    className="bg-green-600 text-white"
                    onClick={handleSaveNextSection}
                  >
                    {currentSection.name === "General Awareness"
                      ? "Finish Exam"
                      : "Save & Next Section"}
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {currentSection.name === "General Awareness"
                        ? "Confirm Exam Submission"
                        : "Confirm Next Section"}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Please review your section summary before proceeding.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  {/* Section Summary */}
                  {(() => {
                    const { answered, notAnswered, marked } = getSectionSummary(currentSection);
                    return (
                      <div className="space-y-2 mt-4">
                        <p><strong>Answered:</strong> {answered}</p>
                        <p><strong>Not Answered:</strong> {notAnswered}</p>
                        <p><strong>Marked for Review:</strong> {marked}</p>
                      </div>
                    );
                  })()}

                  <AlertDialogFooter className="mt-6">
                    <AlertDialogCancel>Go Back</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={confirmSaveNextSection}
                      className="bg-green-600 text-white hover:bg-green-700"
                    >
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button
                className="bg-orange-500 text-white"
                onClick={() => toggleReview(question.id)}
              >
                Mark for Review
              </Button>

              <Button
                className="bg-blue-900 text-white"
                onClick={() =>
                  setCurrentQuestion((prev) =>
                    Math.min(currentSection.total, prev + 1)
                  )
                }
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
