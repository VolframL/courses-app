import { createSlice } from '@reduxjs/toolkit';
import { CourseType } from 'types';

const initialState: never[] | CourseType[] = [];

export const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		//@ts-ignore

		setCourses: (state, { payload }) => (state = payload),
		deleteCourse: (state, { payload }) =>
			(state = state.filter((course) => course.id !== payload)),
		addCourse: (state, { payload }) => (state = [...state, payload]),
	},
});

export const { setCourses, deleteCourse, addCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
