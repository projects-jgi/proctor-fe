"use client";

import { FacultyLayout } from '@/components/FacultyLayout';
import FacultyQuestionBank from '@/containers/faculty/dashboard/FacultyQuestionBank';

export default function FacultyQuestionsPage() {
  return (
    <FacultyLayout title="Question Bank" subtitle="Create and manage questions for your exams">
      <FacultyQuestionBank />
    </FacultyLayout>
  );
}