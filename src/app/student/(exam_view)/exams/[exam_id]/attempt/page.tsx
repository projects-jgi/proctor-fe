import React from 'react'
import { make_student_exam_attempt } from '@/lib/server_api/student';
import ExamWrapper from '@/containers/student/exams/attempt/ExamWrapper';

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
        <ExamWrapper exam_id={exam_id} exam_questions={exam_questions} />
    )
}

export default page