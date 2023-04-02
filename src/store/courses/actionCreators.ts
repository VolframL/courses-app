import { CourseType } from 'types/types';
import {
	GET_COURSES,
	DELETE_COURSE,
	CREATE_COURSE,
	UPDATE_COURSE,
} from './actionTypes';

export const setCourses = (data: CourseType[]) => ({
	type: GET_COURSES,
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
export const updateCourse = (course: CourseType) => ({
	type: UPDATE_COURSE,
	payload: course,
});
