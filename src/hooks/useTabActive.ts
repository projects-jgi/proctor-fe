'use client';

import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

function useTabActive(): [boolean, Dispatch<SetStateAction<boolean>>]{
    const [isTabActive, setIsTabActive] = useState(true);

    const handleVisibilityChange = useCallback(() => {
        setIsTabActive(document.visibilityState !== "visible");
    }, []);

    useEffect(() => {
        if(typeof window != undefined){
            window.addEventListener('visibilitychange', handleVisibilityChange);
            window.addEventListener('blur', handleVisibilityChange);
        }
        return () => {
            window.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', handleVisibilityChange);
        };
    }, []);

    return [isTabActive, setIsTabActive];
}

export default useTabActive;