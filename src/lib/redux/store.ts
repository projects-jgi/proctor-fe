import { configureStore } from "@reduxjs/toolkit";
import ExamAttempt from "./state/ExamAttempt";
import ExamList from "./state/ExamList";

const store = configureStore({
    reducer: {
        "exam_attempt": ExamAttempt,
        "exam_list": ExamList
    }
})

export type RootState = ReturnType<typeof store.getState>;

export default store;