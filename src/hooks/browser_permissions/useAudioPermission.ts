'use client';

import { useEffect, useState } from "react";

export default function useAudioPermission(){
    const [hasAccess, setHasAccess] = useState(false);

    useEffect(() => {
        let audio_status: PermissionStatus
        async function setupListeners(){
            try{
                audio_status = await navigator.permissions.query({ name: "microphone" });

                const handleMicChange = () => {
                    if(audio_status.state != "granted"){
                        setHasAccess(false);
                    }else{
                        setHasAccess(true);
                    }
                }

                handleMicChange()
                audio_status.addEventListener("change", handleMicChange)

                return () => {
                    audio_status.removeEventListener("change", handleMicChange)
                }
            }catch(err){
                console.log("Error setting up permission listeners: ", err)
            }
        }

        setupListeners()
        
        return () => {
            if(audio_status) audio_status.onchange = null;
        }
    }, [])

    return hasAccess;
}