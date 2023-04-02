import { CourseType } from 'types/types';
import { SET_COURSES, DELETE_COURSE, CREATE_COURSE } from './actionTypes';

export const setCourses = (data: CourseType[]) => ({
	type: SET_COURSES,
	payload: data,
});
export const deleteCourse = (id: string) => ({
	type: DELETE_COURSE,
	payload: id,
});
export const createCourse = (course: CourseType) => ({
	type: CREATE_COURSE,
	payload: course,
});
