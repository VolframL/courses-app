import axios, { AxiosError } from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:4000',
});

export { AxiosError };

export default instance;
