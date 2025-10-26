import { ExamQuestion } from "@/types/exam";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
    questionCounter?: number | null,
    currentQuestion?: ExamQuestion | null,
    questionsLength: number,
    selectedAnswers?: {[key: number]: string[]}
} = {
    questionCounter: null,
    currentQuestion: null,
    questionsLength: 0,
    selectedAnswers: {}
}

export const slicer = createSlice({
    name: "exam_answers",
    initialState,
    reducers: {
        setQuestionCounter(state, action: PayloadAction<number | null>){
            state.questionCounter = action.payload;
        },
        setCurrentQuestion(state, action: PayloadAction<ExamQuestion | null>){
            state.currentQuestion = action.payload;
        },
        setQuestionsLength(state, action: PayloadAction<number>){
            state.questionsLength = action.payload;
        },
        setSelectedAnswers(state, action: PayloadAction<{[key: string]: string[]}>){
            state.selectedAnswers = action.payload;
        }
    }
})

export const { setQuestionCounter, setCurrentQuestion, setQuestionsLength, setSelectedAnswers } = slicer.actions;

export default slicer.reducer;