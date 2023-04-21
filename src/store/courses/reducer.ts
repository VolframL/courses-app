import { createSlice } from '@reduxjs/toolkit';
import { CourseType } from 'types';
import { addCourse, deleteCourse, updCourse } from './thunk';

const initialState: never[] | CourseType[] = [];

export const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		setCourses: (_state, { payload }) => (_state = payload),
	},
	extraReducers: (builder) => {
		builder.addCase(deleteCourse.fulfilled, (state, action) => {
			const id = action.meta.arg;
			return (state = state.filter((course) => course.id !== id));
		});
		builder.addCase(addCourse.pending, () => {
			console.log('try to post new course');
		});
		builder.addCase(addCourse.rejected, () => {
			console.log('error');
		});
		builder.addCase(addCourse.fulfilled, (state, { payload }) => {
			const course = payload.data.result;
			return (state = [...state, course]);
		});
		builder.addCase(updCourse.fulfilled, (state, { payload }) => {
			const newCourse = payload.data.result;
			return (state = [
				...state.filter((course) => course.id !== newCourse.id),
				newCourse,
			]);
		});
	},
});

export const { setCourses } = coursesSlice.actions;

export default coursesSlice.reducer;
