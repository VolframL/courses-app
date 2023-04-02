import { CourseType } from 'types/types';
import {
	CREATE_COURSE,
	DELETE_COURSE,
	GET_COURSES,
	// UPDATE_COURSE,
} from './actionTypes';

const initialState: never[] = [];

export const coursesReducer = (
	state: CourseType[] | never[] = initialState,
	action: { type: string; payload: CourseType[] | CourseType | string }
) => {
	switch (action.type) {
		case GET_COURSES:
			return action.payload;
		case DELETE_COURSE:
			return (state = state.filter((course) => course.id !== action.payload));
		case CREATE_COURSE:
			return [...state, action.payload];
		// case UPDATE_COURSE:
		// 	const { id } = action.payload;

		// 	const index = state.findIndex((course) => course.id === id);

		// 	return [...state, action.payload];
		default:
			return state;
	}
};
