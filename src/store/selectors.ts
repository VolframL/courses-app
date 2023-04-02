import { AuthorType, CourseType, UserState } from 'types/types';
import { RootState } from './index';

export const getUser = (state: RootState): UserState => state.user;
export const getCourses = (state: RootState): CourseType[] => state.courses;
export const getAuthors = (state: RootState): AuthorType[] => state.authors;
