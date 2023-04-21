import { createAsyncThunk } from '@reduxjs/toolkit';
import useCoursesService from 'services';
import { CourseToPost } from 'types';

export const deleteCourse = createAsyncThunk(
	'courses/deleteCourse',
	async (id: string) => {
		const { deleteCourseById } = useCoursesService();
		const { data } = await deleteCourseById(id);
		return data;
	}
);

export const addCourse = createAsyncThunk(
	'courses/addCourse',
	async (data: { token: string; course: CourseToPost }) => {
		const { createCourse } = useCoursesService();
		const res = await createCourse(data.token, data.course);
		return res;
	}
);
