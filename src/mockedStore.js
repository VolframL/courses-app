const mockedState = {
	user: {
		isAuth: true,
		name: 'Vitalii',
	},
	courses: [],
	authors: [],
};
export const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};
