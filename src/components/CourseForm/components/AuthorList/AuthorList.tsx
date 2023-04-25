import React, { FC } from 'react';

import CreateAuthor from './CreateAuthor';
import Authors from './Authors';
import CourseAuthors from './CourseAuthors';

import { AuthorListProps } from 'types';

const AuthorList: FC<AuthorListProps> = ({
	courseAuthorList,
	setCourseAuthorList,
	authorList,
}) => {
	return (
		<>
			<CreateAuthor />
			<Authors
				courseAuthorList={courseAuthorList}
				setCourseAuthorList={setCourseAuthorList}
				authorList={authorList}
			/>
			<CourseAuthors
				courseAuthorList={courseAuthorList}
				setCourseAuthorList={setCourseAuthorList}
			/>
		</>
	);
};

export default AuthorList;
