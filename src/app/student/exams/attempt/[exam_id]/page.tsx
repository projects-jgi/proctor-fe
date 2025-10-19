'use client';

import Loading from '@/components/Loading';
import { Badge } from '@/components/ui/badge';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { ExamSidebar } from '@/containers/student/exams/attempt/ExamSidebar';
import QuestionCard from '@/containers/student/exams/attempt/QuestionCard';
import Topbar from '@/containers/student/exams/attempt/Topbar'
import { make_student_exam_attempt } from '@/lib/server_api/student';
import { ExamQuestion } from '@/types/exam';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo, useState } from 'react'

function ExamLoadingScreen(){
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <p className='mb-4'><Loading /></p>
            <p>Please wait while we load questions...</p>
        </div>
    )
}

function ExamErrorScreen(){
    // TODO: support team contact details
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <p>Unable to load exam questions. Please contact support team!</p>
        </div>
    )
}

function ExamHall() {
    const [questionCounter, setQuestionCounter] = useState<number | null>(null);
    // const [questionId, setQuestionId] = useState<number | null>(null)
    const [currentQuestion, setCurrentQuestion] = useState<ExamQuestion | null>(null)

    const exam_questions = useQuery({
        queryKey: ["exams", "attempt", 1],
        queryFn: async() => await make_student_exam_attempt({exam_id: 1}),
    })

    const questions_length = useMemo(() => {
        if(exam_questions.data){
            return Object.keys(Object.values(exam_questions.data).flat()[0] as object).length
        }
        return 0
    }, [exam_questions.isSuccess])

    useEffect(() => {
        if(exam_questions.data && questionCounter == null){
            setQuestionCounter(1);
        }    
    }, [exam_questions.isSuccess])

    useEffect(() => {
        if(questionCounter != null && questionCounter > 0){
            let current_ele: HTMLElement | null = document.querySelector(`[data-question-counter='${questionCounter}']`)
            console.log(current_ele)
            let question_id: string | undefined = current_ele?.dataset.questionId
            if(question_id != undefined){
                setCurrentQuestion((Object.values(exam_questions.data).flat()[0] as {[key: string]: ExamQuestion})[question_id])
            }
            // setQuestionId(question_id);
        }
    }, [questionCounter])

    if(exam_questions.isLoading){
        return <ExamLoadingScreen />
    }

    if(exam_questions.isError){
        return <ExamErrorScreen />
    }

    return (
        <>
            <SidebarProvider>
                <aside>
                    <ExamSidebar setQuestionCounter={setQuestionCounter} questionCounter={questionCounter} questions={exam_questions.data} />
                </aside>
                <main className='w-full'>
                    <Topbar />
                    <div className="m-8">
                        <div className="flex flex-wrap gap-12 items-center">
                            <div className='text-md font-bold'>
                                Questions: <Badge>40</Badge>
                            </div>
                            <div className='text-md font-bold'>
                                Answered: <Badge variant="success">30</Badge>
                            </div>
                            <div className='text-md font-bold'>
                                Skipped: <Badge variant="destructive">05</Badge>
                            </div>
                            <div className='text-md font-bold'>
                                Marked for Review: <Badge variant="warning">05</Badge>
                            </div>
                        </div>
                        <section className='mt-4'>
                            { currentQuestion && (
                                <QuestionCard 
                                    setQuestionCounter={setQuestionCounter} 
                                    questionCounter={questionCounter}
                                    question={currentQuestion}
                                    hasNext={questionCounter != null && questionCounter < questions_length}
                                    hasPrev={questionCounter != null && questionCounter > 1}
                                />
                                ) 
                            } 
                        </section>
                    </div>
                </main>
            </SidebarProvider>
        </>
    )
}

export default ExamHall