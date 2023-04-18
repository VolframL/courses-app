export type CourseType = {
	id: string;
	title: string;
	description: string;
	creationDate: string;
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
	userName: string;
	token: string;
	onLogout: () => void;
};
