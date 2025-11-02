import { useEffect, useRef } from "react"

export default function useCameraCapture(
    isExamActive: boolean
){

    const initialized = useRef(false);
    const streamRef = useRef<MediaStream | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    function endStream(){
        if(intervalRef.current){
            clearInterval(intervalRef.current)
            intervalRef.current = null;
        }
        if(streamRef.current){
            streamRef.current.getTracks().forEach(track => track.stop())
            streamRef.current = null
            initialized.current = false;                
        }
    }
    useEffect(() => {
        if(!isExamActive){
            endStream();
            return;
        }

        if(initialized.current) return;

        initialized.current = true;

        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(stream => {
            const video = document.createElement("video");
            video.muted = true;
            streamRef.current = stream;

            video.srcObject = stream
            video.addEventListener("loadedmetadata", () => {
                video.play()
                intervalRef.current = setInterval(function(){
                    const canvas = document.createElement("canvas")
                    canvas.width = video.videoWidth
                    canvas.height = video.videoHeight
                    const ctx = canvas.getContext('2d')
                    if(!ctx) return;
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                
                    const imageBase64 = canvas.toDataURL('image/jpeg', 0.7);
                    // console.log(imageBase64)
                }, 3000)
            })
        })

        return () => {
            endStream()
        }
    }, [isExamActive])
}