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
		await axios.post<UserData>(url.login, user);

	const postLogout = async () => await axios.delete(url.logout);

	const registration = async (user: RegisterPayload) =>
		await axios.post<UserData>(url.registrationBackend, user);

	const fetchAllCourses = async () => await axios.get(url.coursesAll);

	const fetchCourseById = async (id: string) =>
		await axios.get(`${url.courses}/${id}`);

	const fetchAllAuthors = async () => await axios.get(url.authorsAll);

	const fetchAuthorById = async (id: string) =>
		await axios.get(`${url.authors}/${id}`);

	const deleteCourseById = async (id: string) =>
		await axios.delete(`${url.courses}/${id}`);

	const createCourse = async (data: CourseToPost) =>
		await axios.post(url.courseAdd, data);

	const updateCourse = async (id: string, data: CourseToPost) =>
		await axios.put(`${url.courses}/${id}`, data);

	const createAuthor = async (name: string) =>
		await axios.post(url.authorAdd, { name });

	const userMe = async () => await axios.get(url.userMe);

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
		fetchAuthorById,
		updateCourse,
	};
};

export default useCoursesService;
