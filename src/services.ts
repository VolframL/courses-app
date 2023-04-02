import { UserData, LoginPayload, RegisterPayload } from 'types/types';
import axios from './utils/axios';

const useCoursesService = () => {
	const postLogin = async (user: LoginPayload) =>
		await axios.post<UserData>('/login', user);

	const registration = async (user: RegisterPayload) =>
		await axios.post<UserData>('/register', user);

	const fetchAllCourses = async () => {
		const { data } = await axios.get('/courses/all');
		return data;
	};
	const fetchAllAuthors = async () => {
		const { data } = await axios.get('/authors/all');
		return data;
	};

	return {
		postLogin,
		registration,
		fetchAllCourses,
		fetchAllAuthors,
	};
};

export default useCoursesService;
