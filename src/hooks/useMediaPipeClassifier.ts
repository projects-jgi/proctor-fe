"use client";

import { useEffect, useRef, useState } from "react";
import type { ObjectDetector } from "@mediapipe/tasks-vision";

export function useMediaPipeClassifier() {
  const classifierRef = useRef<ObjectDetector | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;

    async function load() {
      try {
        const imported = await import("@mediapipe/tasks-vision");
        const { ObjectDetector, FilesetResolver } = imported;

        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.32/wasm",
        );

        if (canceled) return;

        const detector = await ObjectDetector.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-tasks/object_detector/efficientdet_lite0_uint8.tflite",
          },
          scoreThreshold: 0.5,
          runningMode: "VIDEO",
        });

        if (canceled) {
          detector.close?.();
          return;
        }

        classifierRef.current = detector;
        setIsReady(true);
      } catch (err) {
        if (canceled) return;
        console.error("Failed to load MediaPipe ObjectDetector:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load MediaPipe",
        );
      }
    }

    load();

    return () => {
      canceled = true;
      if (classifierRef.current?.close) {
        classifierRef.current.close();
      }
      classifierRef.current = null;
    };
  }, []);

  return { classifierRef, isReady, error };
}
