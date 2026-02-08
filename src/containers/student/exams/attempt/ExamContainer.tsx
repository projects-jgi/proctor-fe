"use client";

import React, { useEffect, useState } from "react";
import { ExamSidebar } from "./ExamSidebar";
import { ExamQuestion, ExamStatus } from "@/types/exam";
import Topbar from "./Topbar";
import { Badge } from "@/components/ui/badge";
import QuestionCard from "./QuestionCard";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentQuestion,
  setQuestionCounter,
  setQuestionsLength,
} from "@/lib/redux/state/ExamAttempt";
import { SidebarInset } from "@/components/ui/sidebar";
import useTabActive from "@/hooks/useTabActive";
import { RootState } from "@/lib/redux/store";
import ViolationAlert from "./ViolationAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  create_attempt_violation,
  exam_proctor_analysis_frame,
  exam_proctor_analysis_start,
  exam_proctor_analysis_stop,
  save_student_exam_attempt,
} from "@/lib/server_api/student";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SubmissionLoading from "./SubmissionLoading";
import { useSocket } from "@/hooks/useSocket";
import useCameraCapture from "@/hooks/useCameraCapture";
import useVideoPermission from "@/hooks/browser_permissions/useVideoPermission";
import { current } from "@reduxjs/toolkit";

function ExamContainer({
  isProctored,
  exam_id,
  exam_questions,
}: {
  isProctored: boolean;
  exam_id: number;
  exam_questions: any;
}) {
  // listen for active tab violation
  const [isActiveTab, setIsActiveTab] = useTabActive();
  const [violationQueue, setViolationQueue] = useState<{
    [key: string]: [string, object];
  }>({});
  const [currentViolation, setCurrentViolation] = useState<string | undefined>(
    undefined,
  );

  const questionCounter = useSelector(
    (state: RootState) => state.exam_attempt.questionCounter,
  );
  const totalQuestions = useSelector(
    (state: RootState) => state.exam_attempt.questionsLength,
  );
  const currentQuestion = useSelector(
    (state: RootState) => state.exam_attempt.currentQuestion,
  );
  const violations = useSelector(
    (state: RootState) => state.exam_attempt.violations,
  );
  const attempt = useSelector((state: RootState) => state.exam_attempt.attempt);
  const attempt_id = useSelector(
    (state: RootState) => state.exam_attempt.attempt.id,
  );
  const video_permission = useVideoPermission();

  const queryClient = useQueryClient();

  const router = useRouter();
  const dispatch = useDispatch();

  const store_violation_mutation = useMutation({
    mutationFn: create_attempt_violation,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [
          "exams",
          parseInt(variables.exam_id.toString()),
          "attempts",
          attempt.id,
          "violations",
        ],
      });
      // violation_count = violations.length
    },
    onError: (error) => {
      console.log(error);
    },
  });

  async function store_violation() {
    const params = {
      description: "Tab switch",
      exam_id: exam_id,
      attempt_id: attempt_id,
    };

    // store_violation_mutation.mutate({ ...params });
    setViolationQueue((prev) => ({
      ...prev,
      tab_switch: ["Tab Switch Violation", params],
    }));
  }

  useEffect(() => {
    if (isActiveTab === false) {
      store_violation();
    }
  }, [isActiveTab]);

  useEffect(() => {
    if (Object.keys(violationQueue).length > 0) {
      const first_value = Object.values(violationQueue)[0];
      if (currentViolation === first_value[0]) {
        return;
      }
      store_violation_mutation.mutate(first_value[1] as any);
      setCurrentViolation(first_value[0]);
    } else {
      setCurrentViolation(undefined);
    }
  }, [violationQueue]);

  async function onImageCapture(image: Blob) {
    const res = await exam_proctor_analysis_frame({
      exam_id,
      attempt_id: attempt.id,
      file: image,
    });

    if (res.status) {
      if (res.data.action != "none") {
        console.log("Violation detected: ", res.data);
        const params = {
          exam_id,
          attempt_id: attempt.id,
          description: res.data.event,
          reference_file: image,
        };
        // store_violation_mutation.mutate({ ...params });
        setViolationQueue((prev) => ({
          ...prev,
          [res.data.event]: [res.data.event, params],
        }));
      }
    }
  }

  useEffect(() => {
    if (violations.length >= attempt.exam.max_violation_count) {
      onFinish();
    }
  }, [violations]);

  if (isProctored) useCameraCapture(video_permission, onImageCapture);

  async function startProctoring() {
    const res = await exam_proctor_analysis_start({
      exam_id,
      attempt_id,
    });
    console.log("Exam proctoring started: ", res);
  }

  async function stopProctoring() {
    const res = await exam_proctor_analysis_stop({
      exam_id,
      attempt_id,
    });
    console.log("Exam proctoring stopped: ", res);
  }

  // listen for proctoring violation
  useEffect(() => {
    if (!isProctored) return;

    startProctoring();

    // const socket = useSocket();
    // const emit_name =
    //   "exam-attempt-violation_exam-" + exam_id + "_attempt-" + attempt.id;
    // socket.on(emit_name, (message) => {
    //   // console.log(message);
    //   if (message.data.is_violation) {
    //     toast.warning(message.data.violations[0].description);
    //     setViolation(message.data.violations[0].description);
    //     queryClient.invalidateQueries({
    //       queryKey: [
    //         "exams",
    //         parseInt(exam_id.toString()),
    //         "attempts",
    //         parseInt(attempt.id),
    //         "violations",
    //       ],
    //     });
    //   }
    // });

    return () => {
      // socket.off(emit_name);
      stopProctoring();
    };
  }, [isProctored]);

  function onFinish() {
    const local_storage = localStorage.getItem("user_answers");
    let data: object = {};
    if (local_storage) {
      data = JSON.parse(local_storage);
    }

    onFinishMutation.mutate({ exam_id, answers: data });
  }

  const onFinishMutation = useMutation({
    mutationFn: save_student_exam_attempt,
    onSuccess: async (data) => {
      localStorage.removeItem("user_answers");

      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }

      queryClient.invalidateQueries({
        queryKey: ["exams", { status: ExamStatus.COMPLETED }],
      });

      queryClient.invalidateQueries({
        queryKey: ["exams", { status: ExamStatus.ONGOING }],
      });

      queryClient.invalidateQueries({
        queryKey: ["exams", { status: ExamStatus.UPCOMING }],
      });

      router.push("/student/dashboard");
    },
    onError: (error) => {
      toast.error("Unable to submit exam answers", {
        description: error.message,
      });
    },
  });

  // set initial question counter as first question
  useEffect(() => {
    if (exam_questions && questionCounter == null) {
      dispatch(setQuestionCounter(1));
      dispatch(
        setQuestionsLength(
          Object.values(
            Object.assign({}, ...Object.values(exam_questions.questions)),
          ).length,
        ),
      );
    }
  }, [exam_questions]);

  useEffect(() => {
    if (questionCounter != null && questionCounter > 0) {
      let current_ele: HTMLElement | null = document.querySelector(
        `[data-question-counter='${questionCounter}']`,
      );
      let question_id: string | undefined = current_ele?.dataset.questionId;
      if (question_id != undefined) {
        const question = (
          Object.assign({}, ...Object.values(exam_questions.questions)) as {
            [key: string]: ExamQuestion;
          }
        )[question_id];
        dispatch(setCurrentQuestion(question));
      }
    }
  }, [questionCounter]);

  return (
    <>
      {onFinishMutation.isPending && <SubmissionLoading />}
      {currentViolation != null && (
        <>
          <ViolationAlert
            description={currentViolation as string}
            onClose={() => {
              setViolationQueue((prev) => {
                const new_queue = { ...prev };
                delete new_queue[Object.keys(prev)[0]];
                return new_queue;
              });

              setCurrentViolation(undefined);
            }}
          />
        </>
      )}
      <ExamSidebar questions={exam_questions["questions"]} />
      <SidebarInset>
        <main className="w-full">
          <Topbar
            onFinish={onFinish}
            onFinishMutation={onFinishMutation}
            startTime={exam_questions.attempt.started_at}
            duration={exam_questions.attempt.exam.duration_in_minutes}
          />
          <div className="m-8">
            <div className="flex flex-wrap gap-12 items-center">
              <div className="text-md font-bold">
                Questions: <Badge>{totalQuestions}</Badge>
              </div>
              <div className="text-md font-bold">
                Answered: <Badge variant="success">30</Badge>
              </div>
              <div className="text-md font-bold">
                Skipped: <Badge variant="destructive">05</Badge>
              </div>
              <div className="text-md font-bold">
                Marked for Review: <Badge variant="warning">05</Badge>
              </div>
            </div>
            <section className="mt-4">
              {currentQuestion && <QuestionCard />}
            </section>
          </div>
        </main>
      </SidebarInset>
    </>
  );
}

export default ExamContainer;
