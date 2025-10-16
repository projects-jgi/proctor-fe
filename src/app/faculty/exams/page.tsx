"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

export default function FacultyExamsPage() {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('question_bank_items');
      if (raw) setQuestions(JSON.parse(raw));
    } catch (e) {
      // ignore parsing errors for demo
    }
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Exams / Questions</h1>
          <Link href="/faculty/question_bank">
            <Button variant="ghost">Go to Question Bank</Button>
          </Link>
        </div>

        {questions.length === 0 ? (
          <div className="text-sm text-gray-600">No questions saved yet. Add some from Add Question or Question Bank.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {questions.map((q) => (
              <Card key={q.id} className="p-4">
                <CardContent>
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">{q.questionText}</div>
                      <div className="text-xs text-gray-500">{q.category || 'Uncategorized'} • {q.difficulty || 'N/A'}</div>
                    </div>
                    <div className="text-right text-xs text-gray-400">{q.createdAt ? new Date(q.createdAt).toLocaleString() : ''}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
