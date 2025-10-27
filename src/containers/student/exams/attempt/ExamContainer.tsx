'use client';

import React, { useEffect } from 'react'
import { ExamSidebar } from './ExamSidebar';
import { ExamQuestion } from '@/types/exam';
import Topbar from './Topbar';
import { Badge } from '@/components/ui/badge';
import QuestionCard from './QuestionCard';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentQuestion, setQuestionCounter, setQuestionsLength } from '@/lib/redux/state/ExamAttempt';
import { SidebarInset } from '@/components/ui/sidebar';

function ExamContainer({ exam_id, exam_questions }: { exam_id: number, exam_questions: any }) {
    const questionCounter = useSelector(state => state.exam_attempt.questionCounter);
    const totalQuestions = useSelector(state => state.exam_attempt.questionsLength);
    const currentQuestion = useSelector(state => state.exam_attempt.currentQuestion);

    const dispatch = useDispatch();
    
    // set initial question counter as first question
    useEffect(() => {
        if(exam_questions && questionCounter == null){
            dispatch(setQuestionCounter(1));
            dispatch(setQuestionsLength(Object.values(Object.assign({}, ...Object.values(exam_questions.questions))).length))
        }
    }, [exam_questions])
    
    useEffect(() => {
        if(questionCounter != null && questionCounter > 0){
            let current_ele: HTMLElement | null = document.querySelector(`[data-question-counter='${questionCounter}']`)
            let question_id: string | undefined = current_ele?.dataset.questionId
            if(question_id != undefined){
                const question = (Object.assign({}, ...Object.values(exam_questions.questions)) as {[key: string]: ExamQuestion})[question_id];
                dispatch(setCurrentQuestion(question))
            }
        }
    }, [questionCounter])

    return (
        <>
            <ExamSidebar questions={exam_questions["questions"]} />
            <SidebarInset>
                <main className='w-full'>
                    <Topbar startTime={exam_questions.attempt.started_at} duration={exam_questions.attempt.exam.duration_in_minutes} />
                    <div className="m-8">
                        <div className="flex flex-wrap gap-12 items-center">
                            <div className='text-md font-bold'>
                                Questions: <Badge>{totalQuestions}</Badge>
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
                                <QuestionCard />
                                ) 
                            } 
                        </section>
                    </div>
                </main>
            </SidebarInset>
        </>
    )
}

export default ExamContainer