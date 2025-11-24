export interface StudentExamResult {
  id: number;
  student_id: number;
  attempt_id: number;
  exam_id: number;
  obtained_score: number;
  total_score: number;
  percentage: number;
  result: number;
}

export interface StudentUser {
  id: number;
  department_id: number;
  name: string;
  email: string;
  created_at: string;
}
