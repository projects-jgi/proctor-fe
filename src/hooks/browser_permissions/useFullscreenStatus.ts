import { useEffect, useState } from "react";

export function useFullscreenStatus(){
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const handleChange = () => {
            const fullscreen = !!document.fullscreenElement;
            setIsFullscreen(fullscreen);
        }

        handleChange()

        document.addEventListener("fullscreenchange", handleChange);
        document.addEventListener("webkitfullscreenchange", handleChange);
        document.addEventListener("mozfullscreenchange", handleChange);
        document.addEventListener("MSFullscreenChange", handleChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleChange);
            document.removeEventListener("webkitfullscreenchange", handleChange);
            document.removeEventListener("mozfullscreenchange", handleChange);
            document.removeEventListener("MSFullscreenChange", handleChange);
        }
    }, [])

    return isFullscreen
}