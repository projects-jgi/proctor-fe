'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import React, { useEffect, useState } from 'react'
import ExamContainer from './ExamContainer';
import useTabActive from '@/hooks/useTabActive';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import EligibilityTest from '../../EligibilityTest';
import { useDispatch, useSelector } from 'react-redux';
import { setAudioAccess, setFullScreen, setIsEligible, setOnlineStatus, setVideoAccess } from '@/lib/redux/state/ExamEligibilityTest';
import useAudioPermission from '@/hooks/browser_permissions/useAudioPermission';
import useVideoPermission from '@/hooks/browser_permissions/useVideoPermission';
import { useOnlineStatus } from '@/hooks/browser_permissions/useOnlineStatus';
import { useFullscreenStatus } from '@/hooks/browser_permissions/useFullscreenStatus';

function ExamWrapper({ exam_id, exam_questions }: { exam_id: number, exam_questions: any}) {
    const [isActiveTab, setIsActiveTab] = useTabActive();
    const audio_permission = useAudioPermission();
    const video_permission = useVideoPermission();
    const online_status = useOnlineStatus();
    const full_screen = useFullscreenStatus();
    const isEligible = useSelector(state => state.exam_eligibility_test.is_eligible);
    
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Active tab changed: ", isActiveTab)        
    }, [isActiveTab])

    useEffect(() => {
        console.log("Audio access changed")
        dispatch(setAudioAccess(audio_permission))
    }, [audio_permission])

    useEffect(() => {
        console.log("video access changed")
        dispatch(setVideoAccess(video_permission))
    }, [video_permission])

    useEffect(() => {
        console.log("user network changed")
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
            <Dialog open={isActiveTab === false}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Violation Alert</DialogTitle>
                        <DialogDescription>Tab Switch Detected</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button onClick={() => setIsActiveTab(true)}>Continue</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <SidebarProvider>
                <ExamContainer exam_id={exam_id} exam_questions={exam_questions} />
            </SidebarProvider>
        </>
    )
}

export default ExamWrapper