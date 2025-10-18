'use client';

import Loading from '@/components/Loading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { ExamSidebar } from '@/containers/student/exams/attempt/ExamSidebar';
import QuestionCard from '@/containers/student/exams/attempt/QuestionCard';
import Topbar from '@/containers/student/exams/attempt/Topbar'
import { make_student_exam_attempt } from '@/lib/server_api/student';
import { ExamQuestion } from '@/types/exam';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, TriangleAlert } from 'lucide-react';
import React, { useEffect, useState } from 'react'

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
    const [questionCounter, setQuestionCounter] = useState(1);
    const [questionId, setQuestionId] = useState<number | null>(null)
    const [currentQuestion, setCurrentQuestion] = useState<ExamQuestion | null>(null)

    const exam_questions = useQuery({
        queryKey: ["exams", "attempt", 1],
        queryFn: async() => await make_student_exam_attempt({exam_id: 1}),
    })

    useEffect(() => {
        if(exam_questions.isSuccess && exam_questions.data){
            const question = Object.values(Object.values(exam_questions.data).flat()[0] as Object)[0] as ExamQuestion
            setQuestionId(question.id)
        }
    }, [exam_questions.isSuccess])

    useEffect(() => {
        if(exam_questions.data){
            setCurrentQuestion((Object.values(exam_questions.data).flat()[0] as {[key: string]: ExamQuestion})[questionId])
        }
    }, [questionId])

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
                    <ExamSidebar setQuestionCounter={setQuestionCounter} setQuestionId={setQuestionId} questionCounter={questionCounter} questions={exam_questions.data} />
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
                            { currentQuestion && <QuestionCard setQuestionCounter={setQuestionCounter} question_no={questionCounter} question={currentQuestion} /> } 
                        </section>
                    </div>
                </main>
            </SidebarProvider>
        </>
    )
}

export default ExamHall