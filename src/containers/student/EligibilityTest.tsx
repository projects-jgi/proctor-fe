'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { setAudioAccess, setFullScreen, setOnlineStatus, setVideoAccess } from "@/lib/redux/state/ExamEligibilityTest";
import { LoaderCircle, Lock, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

function EligibilityTest({ setStartExam }: {setStartExam: () => void}) {
    const [audioInfo, setAudioInfo] = useState<PermissionStatus>(PermissionStatus.NOT_CHECKED);
    const [videoInfo, setVideoInfo] = useState<PermissionStatus>(PermissionStatus.NOT_CHECKED);
    const [fullscreenInfo, setFullscreenInfo] = useState<PermissionStatus>(PermissionStatus.NOT_CHECKED);
    const [internetInfo, setInternetInfo] = useState<PermissionStatus>(PermissionStatus.NOT_CHECKED);
    const [isEligible, setIsEligible] = useState<boolean>(false);

    const audioAccess: string = useSelector(state => state.exam_eligibility_test.audio_access);
    const videoAccess: string = useSelector(state => state.exam_eligibility_test.video_access); 
    const onlineStatus: string = useSelector(state => state.exam_eligibility_test.online_status); 
    const fullscreenAccess: string = useSelector(state => state.exam_eligibility_test.full_screen);

    const status_permission_mapping: {
        [key: string]: string,
    }= {
        true: PermissionStatus.GRANTED,
        false: PermissionStatus.DENIED,
        null: PermissionStatus.NOT_CHECKED
    }

    useEffect(() => {
        setAudioInfo(status_permission_mapping[audioAccess] as PermissionStatus)
        setVideoInfo(status_permission_mapping[videoAccess] as PermissionStatus)
        setInternetInfo(status_permission_mapping[onlineStatus] as PermissionStatus)
        setFullscreenInfo(status_permission_mapping[fullscreenAccess] as PermissionStatus)

        if(audioAccess && videoAccess && onlineStatus){
            setIsEligible(true)
        }
    }, [audioAccess, videoAccess, onlineStatus, fullscreenAccess])

    const dispatch = useDispatch();

    async function audioPrompt(){
        setAudioInfo(PermissionStatus.CHECKING);
        try{
            await navigator.mediaDevices.getUserMedia({audio: true})
            dispatch(setAudioAccess(true))
            return Promise.resolve('granted')
        }catch(err){
            dispatch(setAudioAccess(false))
            return Promise.reject('denied')
        }
    }

    async function videoPrompt(){
        setVideoInfo(PermissionStatus.CHECKING);

        try{
            await navigator.mediaDevices.getUserMedia({video: true})
            dispatch(setVideoAccess(true))
            return Promise.resolve('granted')
        }catch(err){
            dispatch(setVideoAccess(false))
            return Promise.reject('denied')
        }
    }

    async function fullscreenPrompt(){
        setFullscreenInfo(PermissionStatus.CHECKING);
        try{
            const elem = document.documentElement;
            if (elem.requestFullscreen) {
                await elem.requestFullscreen();
            }
            dispatch(setFullScreen(true))
            return Promise.resolve('granted')
        }catch(err){
            dispatch(setFullScreen(false))
            return Promise.reject('denied')
        }
    }

    async function internetCheck(){
        setInternetInfo(PermissionStatus.CHECKING);
        try{
            if(navigator.onLine){
                dispatch(setOnlineStatus(true));
                return Promise.resolve('online')
            }else{
                dispatch(setOnlineStatus(false));
                return Promise.reject('offline')
            }
        }catch(err){
            dispatch(setOnlineStatus(false));
            return Promise.reject('error')
        }
    }

    async function eligibilityCheck(){
        return Promise.all([audioPrompt(), videoPrompt(), internetCheck()]).then((res) => {
            setIsEligible(true);
        }).catch((err) => { 
            setIsEligible(false);
            console.log("One or more permissions denied", err)
        })
    }

    return (
        <Dialog open={true}>
            <DialogContent>
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
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">System Check</h3>
                    <ul className="text-sm flex flex-col gap-1">
                        <li>Audio System: <StatusMessage status={audioInfo} /></li>
                        <li>Video System: <StatusMessage status={videoInfo} /></li>
                        <li>Fullscreen Mode: <StatusMessage status={fullscreenInfo} /></li>
                        <li>Internet Connection: <StatusMessage status={internetInfo} /></li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-2">NOTE: Click the <Lock className="inline" size={10} /> lock icon in the address bar <MoveRight size={10} className="inline" /> Site settings <MoveRight size={10} className="inline" /> Allow Camera and Microphone access.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
                <DialogFooter>
                    <div>
                        {
                            !isEligible ?
                            <Button onClick={eligibilityCheck}>Check Eligibility</Button>
                            :
                            fullscreenInfo === PermissionStatus.GRANTED ? 
                            <DialogClose asChild>
                                <Button onClick={setStartExam}>Enter Exam</Button>
                            </DialogClose>

                            : 
                            <Button variant="default" onClick={fullscreenPrompt}>Enter Fullscreen Mode</Button>
                        }
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default EligibilityTest;
