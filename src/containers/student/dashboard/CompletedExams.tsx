"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ExamCard from "./ExamCard";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { get_student_exams } from "@/lib/server_api/student";

function CompletedExams() {
    const completed_exams = useQuery({
        queryKey: ["exams", { status: "completed" }],
        staleTime: 1000 * 20,
        queryFn: async ({ queryKey }) =>
        await get_student_exams({ status: queryKey[1].status }),
    });
    if (
        completed_exams.isLoading ||
        completed_exams.isError ||
        completed_exams.data.length == 0
    ) {
        return <></>;
    }

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
                {completed_exams.data.map((exam, index) => (
                <ExamCard
                    key={index}
                    {...exam}
                    action={
                    <Link href="/student/results">
                        <Button>View Results</Button>
                    </Link>
                    }
                />
                ))}
            </div>
        </section>
    );
}

export default CompletedExams;
