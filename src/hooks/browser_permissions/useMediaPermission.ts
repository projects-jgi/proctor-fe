'use client';

import { useEffect, useState } from "react";

export default function useMediaPermission(){
    const [isCameraGranted, setIsCameraGranted] = useState(false);
    const [isMicGranted, setIsMicGranted] = useState(false);

    useEffect(() => {
        let cameraStatus: PermissionStatus, micStatus: PermissionStatus;

        async function setupListeners(){
            try{
                cameraStatus = await navigator.permissions.query({ name: "camera" })
                micStatus = await navigator.permissions.query({ name: "microphone" })

                const handleCameraChange = () => {
                    console.log("Camera: ", cameraStatus.state)
                    if(cameraStatus.state !== "granted"){
                        setIsCameraGranted(false);
                    }else{
                        setIsCameraGranted(true);
                    }
                }

                handleCameraChange()

                const handleMicChange = () => {
                    console.log("Mic: ", micStatus.state)
                    if(micStatus.state != "granted"){
                        setIsMicGranted(false);
                    }else{
                        setIsMicGranted(true);
                    }
                }

                handleMicChange()

                cameraStatus.addEventListener("change", handleCameraChange);
                micStatus.addEventListener("change", handleMicChange)

                return () => {
                    cameraStatus.removeEventListener("change", handleCameraChange);
                    micStatus.removeEventListener("change", handleMicChange)
                }
            }catch(err){
                console.log("Error setting up permission listeners: ", err)
            }
        }


        setupListeners();

        return () => {
            if(cameraStatus) cameraStatus.onchange = null;
            if(micStatus) micStatus.onchange = null;
        }
    }, [])

    return isCameraGranted && isMicGranted;
}