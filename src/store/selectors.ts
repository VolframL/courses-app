import { AuthorsSliceState, CoursesSliceState, UserState } from 'types/types';
import { RootState } from './index';

export const getUser = (state: RootState): UserState => state.user;
export const getUserToken = (state: RootState): string => state.user.token;
export const getCourses = (state: RootState): CoursesSliceState =>
	state.courses;
export const getAuthors = (state: RootState): AuthorsSliceState =>
	state.authors;
export const getState = (state: RootState): RootState => state;
export const getRole = (state: RootState) => state.user.role;
