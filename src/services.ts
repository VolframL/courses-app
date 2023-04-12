import { UserData, LoginPayload, RegisterPayload } from 'types/types';
import axios from './utils/axios';

const useCoursesService = () => {
	const postLogin = async (user: LoginPayload) => {
		try {
			return await axios.post<UserData>('/login', user);
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	const postLogout = async (token: string) => {
		try {
			await axios.delete('/logout', {
				headers: {
					Authorization: token,
				},
			});
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	const registration = async (user: RegisterPayload) => {
		try {
			return await axios.post<UserData>('/register', user);
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	const fetchAllCourses = async () => {
		try {
			const { data } = await axios.get('/courses/all');
			return data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	const fetchAllAuthors = async () => {
		try {
			const { data } = await axios.get('/authors/all');
			return data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	const userMe = async (token: string) => {
		try {
			const { data } = await axios.get('/users/me', {
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

	const deleteCourseById = async (token: string, id: string) => {
		try {
			const { data } = await axios.delete(`/courses/${id}`, {
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

	return {
		postLogin,
		registration,
		fetchAllCourses,
		fetchAllAuthors,
		userMe,
		postLogout,
		deleteCourseById,
	};
};

export default useCoursesService;
