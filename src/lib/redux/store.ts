import { configureStore } from "@reduxjs/toolkit";
import ExamAttempt from "./state/ExamAttempt";
import ExamList from "./state/ExamList";
import ExamEligibilityTest from "./state/ExamEligibilityTest";

const store = configureStore({
    reducer: {
        "exam_attempt": ExamAttempt,
        "exam_list": ExamList,
        "exam_eligibility_test": ExamEligibilityTest
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;