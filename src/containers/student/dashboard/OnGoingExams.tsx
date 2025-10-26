"use client";

import EligibilityTest from "@/containers/student/EligibilityTest";
import { useQuery } from "@tanstack/react-query";
import { get_student_exams } from "@/lib/server_api/student";
import ExamCard from "@/components/exam/ExamCard";
import { ExamStatus } from "@/types/exam";

const card_count = 2;

function OngoingExams() {
    const ongoing_exams = useQuery({
        queryKey: ["exams", { status: ExamStatus.ONGOING }],
        queryFn: async ({ queryKey }) =>
        await get_student_exams({ status: queryKey[1].status }),
    });

    if (
        ongoing_exams.isLoading ||
        ongoing_exams.isError ||
        ongoing_exams.data.length == 0
    ) {
        return <></>;
    }

    return (
        <section className="">
            <h2 className="text-xl font-bold">Ongoing Exams</h2>
            <div className="grid grid-cols-1 gap-4 mt-4">
                {ongoing_exams.data.slice(0, card_count).map((exam, index) => (
                <ExamCard key={index} {...exam} action={<EligibilityTest exam_url={`/student/exams/${exam.id}/attempt/`} />} />
                ))}
            </div>
        </section>
    );
}

export default OngoingExams;
