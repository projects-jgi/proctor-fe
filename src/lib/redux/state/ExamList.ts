import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
    ongoing_exams: object[],
    completed_exams: object[],
    upcoming_exams: object[]
} = {
    ongoing_exams: [],
    completed_exams: [],
    upcoming_exams: []
}

export const slice = createSlice({
    name: "exam_list",
    initialState,
    reducers: {
        setOngoingExams(state, action: PayloadAction<object[]>){
            state.ongoing_exams = action.payload;
        },
        setCompletedExams(state, action: PayloadAction<object[]>){
            state.completed_exams = action.payload;
        },
        setUpcomingExams(state, action: PayloadAction<object[]>){
            state.upcoming_exams = action.payload;
        },
    }
})

export const { setOngoingExams, setCompletedExams, setUpcomingExams } = slice.actions;
export default slice.reducer;