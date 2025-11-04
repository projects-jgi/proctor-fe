'use client';

import React, { useEffect, useState } from 'react'
import { ExamSidebar } from './ExamSidebar';
import { ExamQuestion } from '@/types/exam';
import Topbar from './Topbar';
import { Badge } from '@/components/ui/badge';
import QuestionCard from './QuestionCard';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentQuestion, setQuestionCounter, setQuestionsLength } from '@/lib/redux/state/ExamAttempt';
import { SidebarInset } from '@/components/ui/sidebar';
import useTabActive from '@/hooks/useTabActive';
import { RootState } from '@/lib/redux/store';
import ViolationAlert from './ViolationAlert';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { exam_camera_upload, save_student_exam_attempt } from '@/lib/server_api/student';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import SubmissionLoading from './SubmissionLoading';
import { useSocket } from '@/hooks/useSocket';
import useCameraCapture from '@/hooks/useCameraCapture';
import useVideoPermission from '@/hooks/browser_permissions/useVideoPermission';

function ExamContainer({ exam_id, exam_questions }: { exam_id: number, exam_questions: any }) {
    const [isActiveTab, setIsActiveTab] = useTabActive();
    const questionCounter = useSelector((state: RootState) => state.exam_attempt.questionCounter);
    const totalQuestions = useSelector((state: RootState) => state.exam_attempt.questionsLength);
    const currentQuestion = useSelector((state: RootState) => state.exam_attempt.currentQuestion);
    const violations = useSelector((state: RootState) => state.exam_attempt.violations);
    const attempt = useSelector((state: RootState) => state.exam_attempt.attempt);
    const [violation, setViolation] = useState<string | null>(null);
    const video_permission = useVideoPermission();

    const queryClient = useQueryClient();

    const router = useRouter()
    const dispatch = useDispatch();

    async function onImageCapture(image: string){
        const res = await exam_camera_upload({ exam_id, attempt_id: attempt.id, file: image})
        console.log(res)
    }

    useCameraCapture(video_permission, onImageCapture);

    useEffect(() => {
        if(violations.length >= attempt.exam.max_violation_count){
            onFinish();
        }
    }, [violations])

    useEffect(() => {
        const socket = useSocket();

        // TODO: Change the listener name
        socket.on("exam-attempt-violation", (message) => {
            console.log(message)
            if(message.data.is_violation){
                toast.warning(message.data.violations[0].description)
                setViolation(message.data.violations[0].description)
                queryClient.invalidateQueries({
                    queryKey: ["exams", parseInt(exam_id.toString()), "attempts", parseInt(attempt.id), "violations"],
                })
            }
        })

        return () => {
            socket.off("exam-attempt-violation")
        }
    }, [])

        
    function onFinish(){
        const local_storage = localStorage.getItem("user_answers");
        let data: object = {};
        if(local_storage){
            data = JSON.parse(local_storage)
        }

        onFinishMutation.mutate({ exam_id: 1, answers: data})
    }

    const onFinishMutation = useMutation({
        mutationFn: save_student_exam_attempt,
        onSuccess: async (data) => {
            localStorage.removeItem("user_answers")

            if (document.fullscreenElement) {
                await document.exitFullscreen();
            }
            
            router.push("/student/dashboard")
        },
        onError: (error) => {
            toast.error("Unable to submit exam answers", {
                description: error.message
            })
        }
    })

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

    useEffect(() => {
        console.log("Active tab changed: ", isActiveTab === false)        
    }, [isActiveTab])


    return (
        <>
            {onFinishMutation.isPending && <SubmissionLoading />}
            {!isActiveTab && <ViolationAlert description='Tab Switch Violation' onClose={() => setIsActiveTab(true)} />}
            {violation != null && <ViolationAlert description={violation as string} onClose={() => setViolation(null)} />}
            <ExamSidebar questions={exam_questions["questions"]} />
            <SidebarInset>
                <main className='w-full'>
                    <Topbar onFinish={onFinish} onFinishMutation={onFinishMutation} startTime={exam_questions.attempt.started_at} duration={exam_questions.attempt.exam.duration_in_minutes} />
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