"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { get_student_exams } from "@/lib/server_api/student";
import ExamCard from "@/components/exam/ExamCard";
import { ExamStatus } from "@/types/exam";
import { useDispatch } from "react-redux";
import { setCompletedExams } from "@/lib/redux/state/ExamList";
import { useEffect } from "react";
import ExamCompletedCard from "../../../components/exam/ExamCompletedCard";

const card_count = 2;

function CompletedExams() {
    const completed_exams = useQuery({
        queryKey: ["exams", { status: ExamStatus.COMPLETED }],
        queryFn: async ({ queryKey }) =>{
            const [, { status }] = queryKey as [string, { status: string }]
            return await get_student_exams({ status })
        },
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if(completed_exams.data){
            dispatch(setCompletedExams(completed_exams.data))
        }
    }, [completed_exams.isSuccess])

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
                <Link href="/student/exams/status/completed">
                    <Button variant={"outline"}>
                        View All
                        <span>
                        <ArrowRight />
                        </span>
                    </Button>
                </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4">
                {completed_exams.data.slice(0, card_count).map((exam: any, index: number) => (
                    <ExamCompletedCard exam={exam} key={index} />
                ))}
            </div>
        </section>
    );
}

export default CompletedExams;
