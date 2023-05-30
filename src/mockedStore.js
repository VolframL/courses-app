const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		token:
			'Bearer ZgnDXUhiNEt/TSeWz0iOJBsALdIuCHrYoCcqf1a1LrPJZYbPaT8wbmF41WAJp8+ngU2eD4kM3vatx2f3aYOP8+cdjygBd1xR3w1OeKRS1TUfRltKO616MRkLU2xJp0r5SzQjM9FVSn82spWHwzecXPkru0XlA/VO1pDaIQAYO+z4+UDJJvvp5feXD3A8PhHz/S19ZENeapPbjNguR7KBijEJ3/vF8vCVZG+NVhDKJANRXYMtFv4Put/EpN6Wu3gXktYAj7TNlgj6vM49oP39yVcVdcp3i+m1BBEGrnDgdh2dhVDsx2/ehpZLV5vH0jzwPjyiK4/3QVKa68HeiWJhnA==',
		email: 'email@test.com',
		role: 'admin',
	},
	courses: [
		{
			title: 'title24677dddd',
			description: 'description221dddd',
			duration: 536,
			authors: [
				'df32994e-b23d-497c-9e4d-84e4dc02882f',
				'095a1817-d45b-4ed7-9cf7-b2417bcbf748',
			],
			creationDate: '19/04/2023',
			id: '64e359fa-f907-469c-99b5-92c3163ab8a9',
		},
	],
	authors: [
		{
			id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
			name: 'Anna Sidorenko',
		},
		{
			id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
			name: 'Valentina Larina',
		},
	],
};

export const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};
export const mockedStoreWithputCourses = {
	getState: () => ({
		user: mockedState.user,
		authors: mockedState.authors,
		courses: [],
	}),
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};
