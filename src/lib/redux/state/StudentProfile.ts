import { StudentUser } from "@/types/student";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  profile: StudentUser | null;
} = {
  profile: null,
};

export const slice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudentProfile(state, action: PayloadAction<StudentUser>) {
      state.profile = action.payload;
    },
  },
});

export const { setStudentProfile } = slice.actions;
export default slice.reducer;
