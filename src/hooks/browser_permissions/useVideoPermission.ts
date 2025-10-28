'use client';

import { useEffect, useState } from "react";

export default function useVideoPermission(){
    const [hasAccess, setHasAccess] = useState(false);

    useEffect(() => {
        let video_status: PermissionStatus
        async function setupListeners(){
            try{
                video_status = await navigator.permissions.query({ name: "camera" });

                const handleVideoChange = () => {
                    if(video_status.state != "granted"){
                        setHasAccess(false);
                    }else{
                        setHasAccess(true);
                    }
                }

                handleVideoChange()
                video_status.addEventListener("change", handleVideoChange)

                return () => {
                    video_status.removeEventListener("change", handleVideoChange)
                }
            }catch(err){
                console.log("Error setting up permission listeners: ", err)
            }
        }

        setupListeners()
        
        return () => {
            if(video_status) video_status.onchange = null;
        }
    }, [])

    return hasAccess;
}