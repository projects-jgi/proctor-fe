import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ExamCompletedList from "@/containers/student/exams/ExamCompletedList";
import ExamOngoingList from "@/containers/student/exams/ExamOngoingList";
import ExamUpcomingList from "@/containers/student/exams/ExamUpcomingList";
import Topbar from "@/containers/student/Topbar";
import { ExamStatus } from "@/types/exam";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

async function page({ params }: { params: any }) {
  let { exam_status } = await params;
  
  if(exam_status !== ExamStatus.UPCOMING && exam_status !== ExamStatus.COMPLETED && exam_status != ExamStatus.ONGOING) { 
    return notFound();
  }

  return (
    <>
      <main>
        <section className="container xl:px-12">
          {
            exam_status == ExamStatus.COMPLETED ? 
            <ExamCompletedList /> :
            exam_status == ExamStatus.UPCOMING ?
            <ExamUpcomingList /> : 
            <ExamOngoingList />
          }
        </section>
      </main>
    </>
  );
}

export default page;
