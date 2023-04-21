import React, { FC } from 'react';

import Button from 'common/Button';

import { AuthorListProps, AuthorType } from 'types';

import styles from '../CourseForm.module.scss';

const AuthorList: FC<AuthorListProps> = ({
	renderedAuthorList,
	setCourseAuthorList,
	courseAuthorList,
	setRenderedAuthorList,
}) => {
	const onAddAuthor = (obj: AuthorType) => {
		setCourseAuthorList([...courseAuthorList, obj]);
		setRenderedAuthorList(
			renderedAuthorList.filter((item: AuthorType) => item.id !== obj.id)
		);
	};

	const onDeleteAuthor = (obj: AuthorType) => {
		setRenderedAuthorList([...renderedAuthorList, obj]);
		setCourseAuthorList(courseAuthorList.filter((item) => item.id !== obj.id));
	};

	return (
		<>
			<div className={styles.author_list}>
				<b>Authors</b>
				<ul>
					{renderedAuthorList.length
						? renderedAuthorList.map((obj: AuthorType) => {
								return (
									<li key={obj.id}>
										<div>{obj.name}</div>
										<Button onClick={() => onAddAuthor(obj)}>Add author</Button>
									</li>
								);
						  })
						: 'Authors list is empty'}
				</ul>
			</div>
			<div className={styles.author_list}>
				<b>Course authors</b>
				<ul>
					{courseAuthorList.length
						? courseAuthorList.map((obj) => {
								return (
									<li key={obj.id}>
										<div>{obj.name}</div>
										<Button onClick={() => onDeleteAuthor(obj)}>
											Delete author
										</Button>
									</li>
								);
						  })
						: 'Authors list is empty'}
				</ul>
			</div>
		</>
	);
};

export default AuthorList;
