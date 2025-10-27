"use client";

import { FacultyLayout } from '@/components/FacultyLayout';
import FacultyResults from '@/containers/faculty/dashboard/FacultyResults';
import { useProctor } from '@/contexts/ProctorContext';

export default function FacultyResultsPage() {
  const {
    currentUser,
    faculties,
    specializations,
    exams,
    results,
    students,
    getExamsForFaculty
  } = useProctor();

  // Find current faculty
  const currentFaculty = faculties.find(f => f.userId === currentUser?.id);
  const facultyExams = currentFaculty ? getExamsForFaculty(currentFaculty.id) : [];

  const facultyResults = currentFaculty ? results
    .filter(result => facultyExams.some(exam => exam.id === result.examId))
    .map(result => {
      const exam = exams.find(e => e.id === result.examId);
      const student = students.find(s => s.id === result.studentId);
      const specialization = specializations.find(s => s.id === exam?.specializationId);
      return {
        id: result.id,
        examName: exam?.title || 'Unknown Exam',
        studentName: student?.userId || 'Unknown Student',
        studentRollNumber: student?.rollNumber || 'N/A',
        score: result.score,
        totalMarks: result.totalMarks,
        percentage: result.percentage,
        grade: result.grade,
        status: result.status,
        feedback: result.feedback,
        submittedAt: result.generatedAt,
        examDate: exam?.startTime || result.generatedAt,
        specialization: specialization?.name || 'N/A'
      };
    }) : [];

  return (
    <FacultyLayout title="Exam Results" subtitle="View and manage student exam results">
      <FacultyResults
        results={facultyResults}
        exams={facultyExams}
        onViewDetails={(result) => {
          // Handle view details - could open a modal with more info
          alert(`Student: ${result.studentName}\nExam: ${result.examName}\nScore: ${result.score}/${result.totalMarks} (${result.percentage}%)\nGrade: ${result.grade}\nFeedback: ${result.feedback || 'No feedback provided'}`);
        }}
        onExport={(results) => {
          const csvContent = [
            ['Exam', 'Student', 'Roll Number', 'Score', 'Total Marks', 'Percentage', 'Grade', 'Status', 'Submitted At'],
            ...results.map(result => [
              result.examName,
              result.studentName,
              result.studentRollNumber,
              result.score.toString(),
              result.totalMarks.toString(),
              result.percentage.toString(),
              result.grade,
              result.status,
              result.submittedAt
            ])
          ].map(row => row.join(',')).join('\n');

          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          const link = document.createElement('a');
          const url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', `faculty_results_${new Date().toISOString().split('T')[0]}.csv`);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
      />
    </FacultyLayout>
  );
}