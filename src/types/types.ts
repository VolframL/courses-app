import { Dispatch, SetStateAction } from 'react';

export type CourseType = {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
};

export type CourseToPost = {
	title: string;
	description: string;
	duration: number;
	authors: string[];
};

export type AuthorType = {
	id: string;
	name: string;
};

export type UserNameProps = {
	userName: string;
};

export type UserData = {
	result: string;
	successful: boolean;
	user: {
		email: string;
		name: string;
	};
};

export type LoginPayload = {
	email: string;
	password: string;
};

export type RegisterPayload = {
	email: string;
	password: string;
	name: string;
};

export type UserState = {
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
	role: string;
};

export type HeaderProps = {
	user: UserState;
	onLogout: () => void;
};

export type CoursesProps = {
	role: string;
	token: string;
};

export type CourseCardProps = {
	course: CourseType;
	authorList: AuthorType[];
	role: string;
	token: string;
	courseQuantity: number;
};

export type PrivateRouterProps = {
	children: JSX.Element;
	role: string;
};

export type CreateAuthorProps = {
	setRenderedAuthorList: Dispatch<SetStateAction<AuthorType[]>>;
	renderedAuthorList: AuthorType[];
};

export type DescriptionProps = {
	setDescription: Dispatch<SetStateAction<string>>;
	description: string;
};

export type TitleProps = {
	setTitle: Dispatch<SetStateAction<string>>;
	title: string;
	onSubmit: () => void;
	courseId: string | undefined;
};

export type AuthorListProps = {
	renderedAuthorList: AuthorType[];
	setCourseAuthorList: Dispatch<SetStateAction<AuthorType[]>>;
	courseAuthorList: AuthorType[];
	setRenderedAuthorList: Dispatch<SetStateAction<AuthorType[]>>;
};
