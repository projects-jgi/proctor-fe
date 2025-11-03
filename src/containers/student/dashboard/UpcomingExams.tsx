"use client";

import { Button } from "@/components/ui/button";
import { useProctor } from "@/contexts/ProctorContext";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
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

function UpcomingExams() {
  const { currentUser, apiCall } = useProctor();
  const [upcomingExams, setUpcomingExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingExams = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);
        // Mock data for upcoming exams
        const mockExams: Exam[] = [
          {
            id: '1',
            title: 'Data Structures Final Exam',
            description: 'Comprehensive exam covering all data structures topics',
            startTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
            endTime: new Date(Date.now() + 86400000 + 7200000).toISOString(), // 2 hours later
            duration: 120,
            departmentId: 'computer-science-it',
            status: 'published'
          },
          {
            id: '2',
            title: 'Web Development Mid-term',
            description: 'HTML, CSS, JavaScript fundamentals',
            startTime: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
            endTime: new Date(Date.now() + 172800000 + 3600000).toISOString(), // 1 hour later
            duration: 60,
            departmentId: 'computer-science-it',
            status: 'published'
          }
        ];

        setUpcomingExams(mockExams);
      } catch (error) {
        console.error('Error fetching upcoming exams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingExams();
  }, [currentUser]);

  if (loading) {
    return (
      <section className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Upcoming Exams</h2>
          <Link href="/student/exams/upcoming">
            <Button variant={"outline"}>
              View All
              <span>
                <ArrowRight />
              </span>
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-4">
          <div className="text-center py-8 text-gray-500">
            Loading upcoming exams...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Upcoming Exams</h2>
        <Link href="/student/exams/upcoming">
          <Button variant={"outline"}>
            View All
            <span>
              <ArrowRight />
            </span>
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {upcomingExams.length > 0 ? (
          upcomingExams.map((exam) => (
            <ExamCard
              key={exam.id}
              name={exam.title}
              description={exam.description}
              startDate={new Date(exam.startTime).toLocaleDateString()}
              endDate={new Date(exam.endTime).toLocaleDateString()}
              duration={exam.duration.toString()}
              action={<Button>View Details</Button>}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No upcoming exams found.
          </div>
        )}
      </div>
    </section>
  );
}

export default UpcomingExams;
