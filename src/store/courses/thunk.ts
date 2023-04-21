import { createAsyncThunk } from '@reduxjs/toolkit';
import useCoursesService from 'services';
import { CourseToPost } from 'types';

export const deleteCourse = createAsyncThunk(
	'courses/deleteCourse',
	async (id: string, thunkAPI) => {
		const { deleteCourseById } = useCoursesService();
		try {
			const { data } = await deleteCourseById(id);
			return data;
			// @ts-ignore
		} catch (error: AxiosError) {
			return thunkAPI.rejectWithValue(error.response.data.errors);
		}
	}
);

export const addCourse = createAsyncThunk(
	'courses/addCourse',
	async (course: CourseToPost, thunkAPI) => {
		const { createCourse } = useCoursesService();
		try {
			return await createCourse(course);
			// @ts-ignore
		} catch (error: AxiosError) {
			return thunkAPI.rejectWithValue(error.response.data.errors);
		}
	}
);

export const updCourse = createAsyncThunk(
	'courses/updCourse',
	async (data: { id: string; course: CourseToPost }, thunkAPI) => {
		const { updateCourse } = useCoursesService();
		try {
			return await updateCourse(data.id, data.course);
			// @ts-ignore
		} catch (error: AxiosError) {
			return thunkAPI.rejectWithValue(error.response.data.errors);
		}
	}
);
