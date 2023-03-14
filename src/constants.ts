import { AuthorType, CourseType } from './@types/types';

export const mockedCoursesList: CourseType[] = [
	{
		id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
		title: 'JavaScript',
		description: `Lorem Ipsum is simply dummy text of the printing and
 typesetting industry. Lorem Ipsum
  has been the industry's standard dummy text ever since the
 1500s, when an unknown
  printer took a galley of type and scrambled it to make a type
 specimen book. It has survived
  not only five centuries, but also the leap into electronic
  typesetting, remaining essentially u
 nchanged.`,
		creationDate: '8/3/2021',
		duration: 160,
		authors: [
			'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
			'f762978b-61eb-4096-812b-ebde22838167',
		],
	},
	{
		id: 'b5630fdd-7bf7-4d39-b75a-2b5906fd0916',
		title: 'Angular',
		description: `Lorem Ipsum is simply dummy text of the printing and
typesetting industry. Lorem Ipsum
 has been the industry's standard dummy text ever since the
1500s, when an unknown
 printer took a galley of type and scrambled it to make a type
specimen book.`,
		creationDate: '10/11/2020',
		duration: 210,
		authors: [
			'df32994e-b23d-497c-9e4d-84e4dc02882f',
			'095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		],
	},
];
export const mockedAuthorsList: AuthorType[] = [
	{
		id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
		name: 'Vasiliy Dobkin',
	},
	{
		id: 'f762978b-61eb-4096-812b-ebde22838167',
		name: 'Nicolas Kim',
	},
	{
		id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
		name: 'Anna Sidorenko',
	},
	{
		id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		name: 'Valentina Larina',
	},
	{
		id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
		name: 'New Player',
	},
];

export const ENGLISH = {
	BUTTON: {
		LOGOUT: 'Logout',
		LOGIN: 'Login',
		REGISTRATION: 'Registration',
		SEARCH: 'Search',
		ADD_COURSE: 'Add new course',
		SHOW_COURSE: 'Show course',
		CREATE_COURSE: 'Create course',
		CREATE_AUTHOR: 'Create author',
		ADD_AUTHOR: 'Add author',
		DELETE_AUTHOR: 'Delete author',
		BACK_TO_COURSES: 'Back to courses',
	},
	INPUT: {
		EMAIL: {
			LABEL: 'Email',
			PLACEHOLDER: 'Enter email',
		},
		PASSWORD: {
			LABEL: 'Password',
			PLACEHOLDER: 'Enter password',
		},
		NAME: {
			LABEL: 'Name',
			PLACEHOLDER: 'Enter name',
		},
		SEARCH: {
			LABEL: '',
			PLACEHOLDER: 'Enter course name or id...',
		},
		TITLE: {
			LABEL: 'Title',
			PLACEHOLDER: 'Enter title',
		},
		DESCRIPTION: {
			LABEL: 'Description',
			PLACEHOLDER: 'Enter description',
		},
		AUTHOR_NAME: {
			LABEL: 'Author name',
			PLACEHOLDER: 'Enter author name',
		},
		DURATION: {
			LABEL: 'Duration',
			PLACEHOLDER: 'Enter duration in minutes',
		},
	},
	TEXT: {
		LOGIN_PAGE: 'If you not have an account you can ',
		REGISTRATION_PAGE: 'If you have an account you can ',
	},
};
// const LOGOUT_BUTTON_TEXT = 'Logout';

const CREATE_AUTHOR_BUTTON_TEXT = 'Create author';
// const ADD_AUTHOR_BUTTON_TEXT = 'Add author';
// const DELETE_AUTHOR_BUTTON_TEXT = 'Delete author';

export { CREATE_AUTHOR_BUTTON_TEXT };
