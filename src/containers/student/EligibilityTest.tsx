'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useProctor } from '@/contexts/ProctorContext';
import { LoaderCircle, Lock, MoveRight } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useState } from "react";

enum PermissionStatus {
    NOT_CHECKED = "Not Checked",
    CHECKING = "Checking...",
    GRANTED = "Success",
    DENIED = "Failed"
}

function StatusMessage({status}: {status: PermissionStatus}) {
    if(status === PermissionStatus.NOT_CHECKED) {
        return (
            <span className="inline-flex items-center gap-2">
                {status}
            </span>
        )
    }

    if(status === PermissionStatus.CHECKING) {
        return (
            <span className="inline-flex items-center gap-2">
                <LoaderCircle className="animate-spin text-primary" size={15} />
                Checking...
            </span>
        )
    }

    const variant = status === PermissionStatus.GRANTED ? "success" : status === PermissionStatus.DENIED ? "destructive" : "outline";
    return(
        <Badge variant={variant}>{status}</Badge>
    )
}

function EligibilityTest({ exam_id }: { exam_id: string }) {
    const [audioStatus, setAudioStatus] = useState<PermissionStatus>(PermissionStatus.NOT_CHECKED);
    const [videoStatus, setVideoStatus] = useState<PermissionStatus>(PermissionStatus.NOT_CHECKED);
    const [fullscreenStatus, setFullscreenStatus] = useState<PermissionStatus>(PermissionStatus.NOT_CHECKED);
    const [internetStatus, setInternetStatus] = useState<PermissionStatus>(PermissionStatus.NOT_CHECKED);
    const [isEligible, setIsEligible] = useState<boolean>(false);
    const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
    const router = useRouter();

    const { currentUser, createEligibilityTest, updateEligibilityTest, startExamAttempt, startProctoringSession } = useProctor();

    async function audioPrompt(){
        setAudioStatus(PermissionStatus.CHECKING);
        try{
            await navigator.mediaDevices.getUserMedia({audio: true})
            setAudioStatus(PermissionStatus.GRANTED);
            return Promise.resolve('granted')
        }catch(err){
            setAudioStatus(PermissionStatus.DENIED);
            return Promise.reject('denied')
        }
    }

    async function videoPrompt(){
        setVideoStatus(PermissionStatus.CHECKING);

        try{
            await navigator.mediaDevices.getUserMedia({video: true})
            setVideoStatus(PermissionStatus.GRANTED);
            return Promise.resolve('granted')
        }catch(err){
            setVideoStatus(PermissionStatus.DENIED);
            return Promise.reject('denied')
        }
    }

    async function fullscreenPrompt(){
        setFullscreenStatus(PermissionStatus.CHECKING);
        try{
            const elem = document.documentElement;
            if (elem.requestFullscreen) {
                await elem.requestFullscreen();
            }
            setFullscreenStatus(PermissionStatus.GRANTED);
            return Promise.resolve('granted')
        }catch(err){
            setFullscreenStatus(PermissionStatus.DENIED);
            return Promise.reject('denied')
        }
    }

    async function internetCheck(){
        setInternetStatus(PermissionStatus.CHECKING);
        try{
            if(navigator.onLine){
                setInternetStatus(PermissionStatus.GRANTED);
                return Promise.resolve('online')
            }else{
                setInternetStatus(PermissionStatus.DENIED);
                return Promise.reject('offline')
            }
        }catch(err){
            setInternetStatus(PermissionStatus.DENIED);
            return Promise.reject('error')
        }
    }

    async function eligibilityCheck(){
        return Promise.all([audioPrompt(), videoPrompt(), internetCheck(), fullscreenPrompt()]).then((res) => {
            setIsEligible(true);
        }).catch((err) => {
            setIsEligible(false);
            console.log("One or more permissions denied", err)
        })
    }

    const handleEnterExam = () => {
        if (!currentUser) return;

        // Create eligibility test record
        const testId = createEligibilityTest(exam_id, currentUser.id);

        // Update eligibility test with results
        const testResults = {
            cameraWorking: videoStatus === PermissionStatus.GRANTED,
            microphoneWorking: audioStatus === PermissionStatus.GRANTED,
            internetStable: internetStatus === PermissionStatus.GRANTED,
            systemCompatible: fullscreenStatus === PermissionStatus.GRANTED
        };
        updateEligibilityTest(testId, testResults);

        // Start exam attempt
        const attemptId = startExamAttempt(exam_id, currentUser.id);

        // Start proctoring session
        startProctoringSession(attemptId);

        // Navigate to exam
        router.push(`/student/exams/attempt/${exam_id}`);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Enter Exam</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Exam Eligibility Check</DialogTitle>
                </DialogHeader>
                <div>
                    <h3 className="text-lg font-semibold">Terms & Conditions</h3>
                    <ul className="list-disc pl-5 text-sm">
                        <li>
                        I agree to maintain academic integrity throughout this
                        examination.
                        </li>
                        <li>I will not use any unauthorized materials during the exam.</li>
                        <li>
                        I understand that any attempt to cheat will result in immediate
                        disqualification.
                        </li>
                        <li>I consent to video and audio monitoring during the exam.</li>
                        <li>I understand that violations will be recorded and reported.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">System Check</h3>
                    <ul className="text-sm flex flex-col gap-1">
                        <li>Audio System: <StatusMessage status={audioStatus} /></li>
                        <li>Video System: <StatusMessage status={videoStatus} /></li>
                        <li>Fullscreen Mode: <StatusMessage status={fullscreenStatus} /></li>
                        <li>Internet Connection: <StatusMessage status={internetStatus} /></li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-2">NOTE: Click the <Lock className="inline" size={10} /> lock icon in the address bar <MoveRight size={10} className="inline" /> Site settings <MoveRight size={10} className="inline" /> Allow Camera and Microphone access.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Checkbox
                        id="terms"
                        checked={acceptedTerms}
                        onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms">I accept the terms and conditions</Label>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>

                    <div>
                        {
                            !isEligible ?
                            <Button onClick={eligibilityCheck} disabled={!acceptedTerms}>
                                Check Eligibility
                            </Button>
                            :
                            <Button
                                variant="default"
                                onClick={handleEnterExam}
                                disabled={!acceptedTerms}
                            >
                                Enter Exam
                            </Button>
                        }
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default EligibilityTest;
