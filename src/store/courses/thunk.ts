import { createAsyncThunk } from '@reduxjs/toolkit';
import useCoursesService from 'services';

export const fetchCourses = createAsyncThunk(
	'courses/fetchCourses',
	async () => {
		const { fetchAllCourses } = useCoursesService();
		const res = await fetchAllCourses();
		return res;
	}
);

export const deleteCourse = createAsyncThunk(
	'courses/deleteCourse',
	async (data: { token: string; id: string }) => {
		const { deleteCourseById } = useCoursesService();
		const res = await deleteCourseById(data.token, data.id);
		return res;
	}
);
