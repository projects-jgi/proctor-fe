"use client";

import React, { useEffect, useState } from "react";

interface CountdownProps {
  startTime: Date | number;
  duration: number; // in seconds
  onEnd?: () => void;
}

export function Countdown({ startTime, duration, onEnd }: CountdownProps) {
    const start = typeof startTime === "number" ? startTime : startTime.getTime();
    const end = start + duration * 1000;

    const getTimeLeft = () => Math.max(0, Math.floor((end - Date.now()) / 1000));
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    useEffect(() => {
        if (timeLeft === 0 && onEnd) onEnd();
        if (timeLeft === 0) return;
        const timer = setInterval(() => {
        setTimeLeft(getTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
        // eslint-disable-next-line
    }, [end, timeLeft]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600)
        .toString()
        .padStart(2, "0");
        const m = Math.floor((seconds % 3600) / 60)
        .toString()
        .padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${h}:${m}:${s}`;
    };

    return (
        <span className="font-mono text-xl">
            {formatTime(timeLeft)}
        </span>
    );
}
