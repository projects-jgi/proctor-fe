"use client";

import EligibilityTest from "@/containers/student/EligibilityTest";
import ExamCard from "./ExamCard";
import { useQuery } from "@tanstack/react-query";
import { get_student_exams } from "@/lib/server_api/student";

function OngoingExams() {
    const ongoing_exams = useQuery({
        queryKey: ["exams", { status: "ongoing" }],
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
                {ongoing_exams.map((exam, index) => (
                <ExamCard key={index} {...exam} action={<EligibilityTest />} />
                ))}
            </div>
        </section>
    );
}

export default OngoingExams;
