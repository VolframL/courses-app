import { CourseType } from 'types/types';
import { CREATE_COURSE, DELETE_COURSE, SET_COURSES } from './actionTypes';

const initialState: never[] = [];

export const coursesReducer = (
	state: CourseType[] | never[] = initialState,
	action: { type: string; payload: CourseType[] | CourseType | string }
) => {
	switch (action.type) {
		case SET_COURSES:
			return action.payload;
		case DELETE_COURSE:
			return (state = state.filter((course) => course.id !== action.payload));
		case CREATE_COURSE:
			return [...state, action.payload];
		default:
			return state;
	}
};
