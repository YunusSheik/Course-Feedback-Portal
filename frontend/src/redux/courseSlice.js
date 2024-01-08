import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coursesList: [],
};

export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    fetchCourses: (state, action) => {
      state.coursesList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchCourses } = courseSlice.actions;

export default courseSlice.reducer;
