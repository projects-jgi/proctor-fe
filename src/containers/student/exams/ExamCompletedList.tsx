'use client';

import ExamCard from '@/components/exam/ExamCard';
import { Button } from '@/components/ui/button';
import { get_student_exams } from '@/lib/server_api/student';
import { ExamStatus } from '@/types/exam';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import ExamCompletedCard from '../../../components/exam/ExamCompletedCard';
import ExamNotFound from '@/components/exam/ExamNotFound';

function ExamCompletedList({ count = undefined }: { count?: number | undefined }) {
    const exams = useQuery({
        queryKey: ["exams", { status: ExamStatus.COMPLETED }],
        queryFn: async ({ queryKey }) =>{
            const [, { status }] = queryKey as [string, { status: string }]
            return await get_student_exams({ status })
        },
    });

    if (
        exams.isLoading ||
        exams.isError ||
        exams.data.length == 0
    ) {
        return <ExamNotFound/>;
    }

    return (
        <div className="grid grid-cols-1 gap-4 mt-4">
            {exams.data.slice(0, count)
            .map((exam: any, index: number) => (
                <ExamCompletedCard exam={exam} key={index} />
            ))}
        </div>
    )
}

export default ExamCompletedList