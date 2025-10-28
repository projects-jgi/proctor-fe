'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React, { useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { get_student_exams } from "@/lib/server_api/student";
import ExamCard from "@/components/exam/ExamCard";
import { ExamStatus } from "@/types/exam";
import { setUpcomingExams } from "@/lib/redux/state/ExamList";
import { useDispatch } from "react-redux";

const card_count = 2;

function UpcomingExams() {
  const upcoming_exams = useQuery({
    queryKey: ["exams", {status: ExamStatus.UPCOMING}],
    queryFn: async ({ queryKey }) => await get_student_exams({ status: queryKey[1].status })
  })

  const dispatch = useDispatch();

  useEffect(() => {
      if(upcoming_exams.data){
          dispatch(setUpcomingExams(upcoming_exams.data))
      }
  }, [upcoming_exams.isSuccess])

  if(upcoming_exams.isLoading || upcoming_exams.isError || upcoming_exams.data.length == 0){
    return <></>
  }

  return (
    <section className="mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Upcoming Exams</h2>
        <Link href="/student/exams/status/upcoming">
          <Button variant={"outline"}>
            View All
            <span>
              <ArrowRight />
            </span>
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {
          upcoming_exams.data!.slice(0, card_count).map((exam, index) => (
            <ExamCard key={index} {...exam} action={<Button>View Details</Button>}  />
          ))          
        }
      </div>
    </section>
  );
}

export default UpcomingExams;
