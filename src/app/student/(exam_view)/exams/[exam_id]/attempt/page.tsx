import React from 'react'
import { signal } from '@preact/signals-react';
import { Button } from '@/components/ui/button';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useQuery } from '@tanstack/react-query';
import { make_student_exam_attempt } from '@/lib/server_api/student';
import ExamContainer from '@/containers/student/exams/attempt/ExamContainer';

interface PageParams {
    exam_id: number
}

// TODO: Exam not found component
function ExamNotFoundScreen(){
    return (
        <p>Exam Not Found</p>
    )
}

async function page({ params }: { params: PageParams}) {
    const {exam_id} = await params

    let exam_questions;

    try{
        exam_questions = await make_student_exam_attempt({ exam_id: exam_id })
    }catch(err){
        return <ExamNotFoundScreen />
    }
    console.log(exam_questions)

    return (
        <>
            <SidebarProvider>
                <ExamContainer exam_id={exam_id} exam_questions={exam_questions} />
            </SidebarProvider>
        </>
    )
}

export default page