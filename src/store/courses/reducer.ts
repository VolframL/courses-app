import { createSlice } from '@reduxjs/toolkit';
import { CourseType } from 'types';
import { deleteCourse } from './thunk';

const initialState: never[] | CourseType[] = [];

export const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		setCourses: (_state, { payload }) => (_state = payload),
		// deleteCourse: (state, { payload }) =>
		// 	(state = state.filter((course) => course.id !== payload)),
		addCourse: (state, { payload }) => (state = [...state, payload]),
	},
	extraReducers: (builder) => {
		builder.addCase(deleteCourse.fulfilled, (state, action) => {
			const { id } = action.meta.arg;
			state = state.filter((course) => course.id !== id);
		});
	},
});

export const { setCourses, addCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
