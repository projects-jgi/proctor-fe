import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CalendarDays, Hourglass } from "lucide-react";
import React from "react";
import ExamCard from "./ExamCard";
import Link from "next/link";

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
    }
]


function CompletedExams() {
  return (
    <section className="mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Completed Exams</h2>
        <Link href="/student/exams/completed">
          <Button variant={"outline"}>
            View All
            <span>
              <ArrowRight />
            </span>
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {exams
          .map((exam, index) => (
            <ExamCard key={index} {...exam} action={<Button>View Details</Button>}  />
          ))}
      </div>
    </section>
  );
}

export default CompletedExams;
