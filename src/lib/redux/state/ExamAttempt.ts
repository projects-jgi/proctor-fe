import { ExamQuestion, Violation } from "@/types/exam";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  attempt: any;
  violations: Violation[];
  questionCounter?: number | null;
  currentQuestion?: ExamQuestion | null;
  questionsLength: number;
  selectedAnswers?: { [key: number]: string[] };
  selectedAnswersCount: number;
} = {
  attempt: null,
  violations: [],
  questionCounter: null,
  currentQuestion: null,
  questionsLength: 0,
  selectedAnswers: {},
  selectedAnswersCount: 0,
};

export const slicer = createSlice({
  name: "exam_answers",
  initialState,
  reducers: {
    setAttempt(state, action: PayloadAction<any>) {
      state.attempt = action.payload;
    },
    setViolations(state, action: PayloadAction<Violation[]>) {
      state.violations = action.payload;
    },
    setQuestionCounter(state, action: PayloadAction<number | null>) {
      state.questionCounter = action.payload;
    },
    setCurrentQuestion(state, action: PayloadAction<ExamQuestion | null>) {
      state.currentQuestion = action.payload;
    },
    setQuestionsLength(state, action: PayloadAction<number>) {
      state.questionsLength = action.payload;
    },
    setSelectedAnswers(
      state,
      action: PayloadAction<{ [key: string]: string[] }>,
    ) {
      let answer_count = 0;
      for (const key in action.payload) {
        if (action.payload[key].length > 0) {
          answer_count += 1;
        }
      }
      state.selectedAnswersCount = answer_count;
      state.selectedAnswers = action.payload;
    },
  },
});

export const {
  setQuestionCounter,
  setViolations,
  setCurrentQuestion,
  setQuestionsLength,
  setSelectedAnswers,
  setAttempt,
} = slicer.actions;

export default slicer.reducer;
