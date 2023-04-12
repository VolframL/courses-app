import { createSlice } from '@reduxjs/toolkit';
import { CoursesSliceState, Status } from 'types';
import { deleteCourse, fetchCourses } from './thunk';

const initialState: CoursesSliceState = {
	items: [],
	status: Status.LOADING,
};
// const initialState: never[] | CourseType[] = [];

export const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		//@ts-ignore
		// setCourses: (state, { payload }) => (state = payload),
		addCourse: (state, { payload }) => (state = [...state, payload]),
	},
	extraReducers: (builder) => {
		builder.addCase(deleteCourse.fulfilled, (state, action) => {
			const { id } = action.meta.arg;
			state.items = state.items.filter((course) => course.id !== id);
		});
		// builder.addCase(deleteCourse.rejected, (state) => {
		// 	console.log('error');
		// });
		builder.addCase(fetchCourses.pending, (state) => {
			state.status = Status.LOADING;
		});
		builder.addCase(fetchCourses.rejected, (state) => {
			state.status = Status.ERROR;
			state.items = [];
		});
		builder.addCase(fetchCourses.fulfilled, (state, action) => {
			state.status = Status.SUCCESS;
			state.items = action.payload.result;
		});
	},
});

export const { setCourses, addCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
