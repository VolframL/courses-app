import {
	UserData,
	LoginPayload,
	RegisterPayload,
	CourseToPost,
} from 'types/types';
import axios from './utils/axios';
import url from 'urls';

const useCoursesService = () => {
	const postLogin = async (user: LoginPayload) =>
		await axios.post<UserData>('/login', user);

	const postLogout = async () => await axios.delete('/logout');

	const registration = async (user: RegisterPayload) =>
		await axios.post<UserData>('/register', user);

	const fetchAllCourses = async () => await axios.get('/courses/all');

	const fetchCourseById = async (id: string) =>
		await axios.get(`/courses/${id}`);

	const fetchAllAuthors = async () => await axios.get('/authors/all');

	const deleteCourseById = async (id: string) =>
		await axios.delete(`/courses/${id}`);

	const createCourse = async (token: string, data: CourseToPost) => {
		try {
			return await axios.post(url.courseAdd, data, {
				headers: {
					Authorization: token,
				},
			});
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	const deleteAuthorById = async (token: string, id: string) => {
		try {
			const { data } = await axios.delete(`/authors/${id}`, {
				headers: {
					Authorization: token,
				},
			});
			return data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	const createAuthor = async (name: string) =>
		await axios.post('/authors/add', { name });

	const userMe = async () => {
		const { data } = await axios.get('/users/me');
		return data;
	};

	return {
		postLogin,
		registration,
		fetchAllCourses,
		fetchCourseById,
		fetchAllAuthors,
		userMe,
		postLogout,
		deleteCourseById,
		createCourse,
		createAuthor,
		deleteAuthorById,
	};
};

export default useCoursesService;
