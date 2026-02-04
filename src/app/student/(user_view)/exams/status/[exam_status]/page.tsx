import ExamCompletedList from "@/containers/student/exams/ExamCompletedList";
import ExamOngoingList from "@/containers/student/exams/ExamOngoingList";
import ExamUpcomingList from "@/containers/student/exams/ExamUpcomingList";
import { ExamStatus } from "@/types/exam";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({ params }: { params: any }) {
  let { exam_status } = await params;

  if (
    exam_status !== ExamStatus.UPCOMING &&
    exam_status !== ExamStatus.COMPLETED &&
    exam_status != ExamStatus.ONGOING
  ) {
    return notFound();
  }

  return {
    title:
      exam_status.charAt(0).toUpperCase() + exam_status.slice(1) + " Exams",
  };
}

async function page({ params }: { params: any }) {
  let { exam_status } = await params;

  if (
    exam_status !== ExamStatus.UPCOMING &&
    exam_status !== ExamStatus.COMPLETED &&
    exam_status != ExamStatus.ONGOING
  ) {
    return notFound();
  }

  return (
    <>
      <main>
        <section className="container xl:px-12">
          {exam_status == ExamStatus.COMPLETED ? (
            <ExamCompletedList />
          ) : exam_status == ExamStatus.UPCOMING ? (
            <ExamUpcomingList />
          ) : (
            <ExamOngoingList />
          )}
        </section>
      </main>
    </>
  );
}

export default page;
