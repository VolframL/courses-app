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
	setUserName: (value: string) => void;
};

export type UserData = {
	data: {
		result: string;
		successful: boolean;
		user: {
			email: string;
			name: string;
		};
	};
};
