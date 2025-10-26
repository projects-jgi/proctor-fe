import ResultList from '@/containers/student/exams/result/ResultList';
import Topbar from '@/containers/student/Topbar';
import { get_student_attempt_result } from '@/lib/server_api/student'
import React from 'react'

interface PageParams{
    exam_id: string
}

async function page({ params }: {params: PageParams}) {
    const { exam_id} = await params;

    const result = await get_student_attempt_result({ exam_id: parseInt(exam_id) });

    return (
        <>
        <Topbar />  
        <ResultList result={result.data} />
        </>
    )
}

export default page