'use client';

import React, { useEffect, useMemo, useState } from 'react'
import { signal, useComputed, useSignalEffect } from '@preact/signals-react';
import { ExamSidebar } from './ExamSidebar';
import { ExamQuestion } from '@/types/exam';
import Topbar from './Topbar';
import { Badge } from '@/components/ui/badge';
import QuestionCard from './QuestionCard';

function ExamContainer({ exam_id, exam_questions }: { exam_id: number, exam_questions: any }) {
    const [questionCounter, setQuestionCounter] = useState<number | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<ExamQuestion | null>(null)

    const questions_length = useMemo(() => {
        if(exam_questions){
            return Object.values(Object.assign({}, ...Object.values(exam_questions.questions))).length
        }
        return 0
    }, [exam_questions])
    
    // set initial question counter as first question
    useEffect(() => {
        if(exam_questions && questionCounter == null){
            setQuestionCounter(1);
        }
    }, [exam_questions])
    
    useEffect(() => {
        if(questionCounter != null && questionCounter > 0){
            let current_ele: HTMLElement | null = document.querySelector(`[data-question-counter='${questionCounter}']`)
            let question_id: string | undefined = current_ele?.dataset.questionId
            if(question_id != undefined){
                setCurrentQuestion((Object.assign({}, ...Object.values(exam_questions.questions)) as {[key: string]: ExamQuestion})[question_id])
            }
        }
    }, [questionCounter])

    console.log(questions_length)

    return (
        <>
            <aside>
                <ExamSidebar setQuestionCounter={setQuestionCounter} questionCounter={questionCounter} questions={exam_questions["questions"]} />
            </aside>
                <main className='w-full'>
                    <Topbar startTime={exam_questions.attempt.started_at} duration={exam_questions.attempt.exam.duration_in_minutes} />
                    <div className="m-8">
                        <div className="flex flex-wrap gap-12 items-center">
                            <div className='text-md font-bold'>
                                Questions: <Badge>{questions_length}</Badge>
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
                                    totalQuestions={questions_length}
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
        </>
    )
}

export default ExamContainer