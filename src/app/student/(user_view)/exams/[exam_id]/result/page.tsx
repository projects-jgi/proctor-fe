import { Separator } from "@/components/ui/separator";
import ResultList from "@/containers/student/exams/result/ResultList";
import ResultStat from "@/containers/student/exams/result/ResultStat";
import Topbar from "@/containers/student/Topbar";
import {
  get_student_attempt_answers,
  get_student_attempt_result,
} from "@/lib/server_api/student";
import React from "react";

interface PageParams {
  exam_id: string;
}

async function page({ params }: { params: PageParams }) {
  const { exam_id } = await params;

  const result_answers = await get_student_attempt_answers({
    exam_id: parseInt(exam_id),
  });
  const result = await get_student_attempt_result({
    exam_id: parseInt(exam_id),
  });

  return (
    <>
      <ResultStat result={result.data} />
      <ResultList result={result_answers.data} />
    </>
  );
}

export default page;
