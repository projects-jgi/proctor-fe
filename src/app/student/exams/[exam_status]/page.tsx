import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ExamCard from "@/containers/student/dashboard/ExamCard";
import Topbar from "@/containers/student/Topbar";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const exams = [
    {
        name: "MATHEMATICS FINAL EXAM",
        description: "Master of Computer Applications",
        startDate: "01/01/2025",
        endDate: "03/01/2025",
        duration: "90"
    },
    {
        name: "PHYSICS FINAL EXAM",
        description: "Bachelor of Science",
        startDate: "05/01/2025",
        endDate: "07/01/2025",
        duration: "120"
    },
    {
        name: "MATHEMATICS FINAL EXAM",
        description: "Master of Computer Applications",
        startDate: "01/01/2025",
        endDate: "03/01/2025",
        duration: "90"
    },
    {
        name: "PHYSICS FINAL EXAM",
        description: "Bachelor of Science",
        startDate: "05/01/2025",
        endDate: "07/01/2025",
        duration: "120"
    },
    {
        name: "MATHEMATICS FINAL EXAM",
        description: "Master of Computer Applications",
        startDate: "01/01/2025",
        endDate: "03/01/2025",
        duration: "90"
    },
    {
        name: "PHYSICS FINAL EXAM",
        description: "Bachelor of Science",
        startDate: "05/01/2025",
        endDate: "07/01/2025",
        duration: "120"
    },
]


async function page({ params }: { params: Promise<{ exam_status: "upcoming" | "completed" }> }) {
  const { exam_status } = await params;

  if(exam_status !== "upcoming" && exam_status !== "completed") {
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
            <div className="grid grid-cols-1 gap-4 mt-4">
                {exams
                .map((exam, index) => (
                    <ExamCard key={index} {...exam} action={<Button>View Details</Button>}  />
                ))}
            </div>
        </section>
      </main>
    </>
  );
}

export default page;
