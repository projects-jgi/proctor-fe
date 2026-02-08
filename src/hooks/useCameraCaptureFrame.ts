import { useEffect, useRef } from "react";

export default function useCameraCaptureFrame(
  isExamActive: boolean,
  onResult: (result: any, getFrameBlob: () => Promise<Blob | null>) => void,
  classifierRef: React.MutableRefObject<any>,
) {
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rafRef = useRef<number | null>(null);

  function stop() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;

    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }

  useEffect(() => {
    console.log("camera capture effect", {
      isExamActive,
      classifierLoaded: !!classifierRef.current,
    });
    if (!isExamActive || !classifierRef.current) {
      stop();
      return;
    }

    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    videoRef.current = video;

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      streamRef.current = stream;
      video.srcObject = stream;

      video.onloadedmetadata = () => {
        video.play();
        runInference();
      };
    });

    function runInference() {
      console.log("inference running");
      if (!classifierRef.current || !videoRef.current) return;

      const getFrameBlob = async () => {
        const currentVideo = videoRef.current;
        if (!currentVideo) return null;

        const width = currentVideo.videoWidth;
        const height = currentVideo.videoHeight;
        if (!width || !height) return null;

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;

        ctx.drawImage(currentVideo, 0, 0, width, height);
        return new Promise<Blob | null>((resolve) => {
          canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.92);
        });
      };

      const now = performance.now();
      const result = classifierRef.current.detectForVideo(
        videoRef.current,
        now,
      );
      console.log(result);
      onResult(result, getFrameBlob);

      rafRef.current = requestAnimationFrame(runInference);
    }

    return stop;
  }, [isExamActive, classifierRef]);
}
