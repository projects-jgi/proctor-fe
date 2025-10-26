import { configureStore } from "@reduxjs/toolkit";
import ExamAttempt from "./state/ExamAttempt";

const store = configureStore({
    reducer: {
        "exam_attempt": ExamAttempt
    }
})

export type RootState = ReturnType<typeof store.getState>;

export default store;