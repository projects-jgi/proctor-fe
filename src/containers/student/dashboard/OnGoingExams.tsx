"use client";

import EligibilityTest from "@/containers/student/EligibilityTest";
import { useProctor } from "@/contexts/ProctorContext";
import { useEffect, useState } from "react";
import ExamCard from "./ExamCard";

interface Exam {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  duration: number;
  departmentId: string;
  status: string;
}

function OngoingExams() {
  const { currentUser, apiCall } = useProctor();
  const [ongoingExams, setOngoingExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOngoingExams = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);
        // Mock data for ongoing exams
        const mockExams: Exam[] = [
          {
            id: '3',
            title: 'Database Management Systems',
            description: 'SQL queries and database design exam',
            startTime: new Date(Date.now() - 1800000).toISOString(), // Started 30 min ago
            endTime: new Date(Date.now() + 1800000).toISOString(), // Ends in 30 min
            duration: 60,
            departmentId: 'computer-science-it',
            status: 'active'
          }
        ];

        setOngoingExams(mockExams);
      } catch (error) {
        console.error('Error fetching ongoing exams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOngoingExams();
  }, [currentUser]);

  if (loading) {
    return (
      <section className="">
        <h2 className="text-xl font-bold">Ongoing Exams</h2>
        <div className="grid grid-cols-1 gap-4 mt-4">
          <div className="text-center py-8 text-gray-500">
            Loading ongoing exams...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="">
      <h2 className="text-xl font-bold">Ongoing Exams</h2>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {ongoingExams.length > 0 ? (
          ongoingExams.map((exam) => (
            <ExamCard
              key={exam.id}
              name={exam.title}
              description={exam.description}
              startDate={new Date(exam.startTime).toLocaleDateString()}
              endDate={new Date(exam.endTime).toLocaleDateString()}
              duration={exam.duration.toString()}
              action={<EligibilityTest />}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No ongoing exams found.
          </div>
        )}
      </div>
    </section>
  );
}

export default OngoingExams;
