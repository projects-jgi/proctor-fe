import ExamCard from "@/components/exam/ExamCard";
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
      <Topbar />
      <main>
        <div className="w-full bg-primary">
          <Card className="text-primary-foreground bg-transparent border-0 shadow-none container mx-auto">
            <CardHeader>
              <CardDescription className="text-primary-foreground">
                <Breadcrumb>
                    <BreadcrumbList className="text-primary-foreground">
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/student/dashboard">Dashboard</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-primary-foreground font-bold"><span className="capitalize">{exam_status}</span> Exams</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                    </Breadcrumb>
              </CardDescription>
              <CardTitle className="text-2xl">
                <span className="capitalize">{exam_status}</span> Exams
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
        <section className="container">
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
