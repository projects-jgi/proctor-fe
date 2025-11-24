"use client";

import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useCallback,
} from "react";

function useTabActive(): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [isTabActive, setIsTabActive] = useState(true);

  const handleVisibilityChange = useCallback(() => {
    setIsTabActive(document.visibilityState === "visible");
  }, []);

  const handleBlur = useCallback(() => {
    setIsTabActive(false);
  }, []);

  const handleFocus = useCallback(() => {
    setIsTabActive(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("blur", handleBlur);
      window.addEventListener("focus", handleFocus);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("blur", handleBlur);
        window.removeEventListener("focus", handleFocus);
      }
    };
  }, [handleVisibilityChange, handleBlur, handleFocus]);

  return [isTabActive, setIsTabActive];
}

export default useTabActive;
