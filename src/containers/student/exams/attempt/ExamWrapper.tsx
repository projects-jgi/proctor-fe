'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import React, { useEffect } from 'react'
import ExamContainer from './ExamContainer';
import EligibilityTest from '../../EligibilityTest';
import { useDispatch, useSelector } from 'react-redux';
import { setAudioAccess, setFullScreen, setIsEligible, setOnlineStatus, setVideoAccess } from '@/lib/redux/state/ExamEligibilityTest';
import useAudioPermission from '@/hooks/browser_permissions/useAudioPermission';
import useVideoPermission from '@/hooks/browser_permissions/useVideoPermission';
import { useOnlineStatus } from '@/hooks/browser_permissions/useOnlineStatus';
import { useFullscreenStatus } from '@/hooks/browser_permissions/useFullscreenStatus';
import { RootState } from '@/lib/redux/store';
import useCameraCapture from '@/hooks/useCameraCapture';
import { useQuery } from '@tanstack/react-query';
import { exam_camera_upload, get_attempt_violation } from '@/lib/server_api/student';
import { setAttempt, setViolations } from '@/lib/redux/state/ExamAttempt';

function ExamWrapper({ exam_id, exam_questions }: { exam_id: number, exam_questions: any}) {
    const audio_permission = useAudioPermission();
    const video_permission = useVideoPermission();
    const online_status = useOnlineStatus();
    const full_screen = useFullscreenStatus();
    const isEligible = useSelector((state: RootState) => state.exam_eligibility_test.is_eligible);
    const attempt_id = useSelector((state: RootState) => state.exam_attempt.attempt?.id)
    const dispatch = useDispatch();

    const violationQuery = useQuery({
        queryKey: ["exams", parseInt(exam_id.toString()), "attempts", parseInt(attempt_id), "violations"],
        queryFn: async () => {
            return await get_attempt_violation({ exam_id, attempt_id }) 
        },
    })

    useEffect(() => {
        if(violationQuery.isSuccess){
            dispatch(setViolations(violationQuery.data.data))
        }
    }, [violationQuery])

    useEffect(() => {
        dispatch(setAttempt(exam_questions.attempt))
    }, [exam_questions])

    useEffect(() => {
        console.log("Audio access changed: ", audio_permission)
        dispatch(setAudioAccess(audio_permission))
    }, [audio_permission])

    useEffect(() => {
        console.log("video access changed: ", video_permission)
        dispatch(setVideoAccess(video_permission))
    }, [video_permission])

    useEffect(() => {
        console.log("user network changed: ", online_status)
        dispatch(setOnlineStatus(online_status))
    }, [online_status])

    useEffect(() => {
        console.log("full screen changed")
        dispatch(setFullScreen(full_screen))
    }, [full_screen])

    if(!isEligible){
        return <EligibilityTest setStartExam={() => dispatch(setIsEligible(true))} />
    }

    return (
        <>
            <SidebarProvider>
                <ExamContainer exam_id={exam_id} exam_questions={exam_questions} />
            </SidebarProvider>
        </>
    )
}

export default ExamWrapper