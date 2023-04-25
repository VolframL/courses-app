import React, { FC } from 'react';

import Button from 'common/Button';

import { returnAuthorsIdArr } from 'helpers/returnAuthorsIdArr';

import { AuthorListProps, AuthorType } from 'types';

import styles from '../../CourseForm.module.scss';

const Authors: FC<AuthorListProps> = ({
	courseAuthorList,
	setCourseAuthorList,
	authorList,
}) => {
	return (
		<>
			<div className={styles.author_list}>
				<b>Authors</b>
				<ul>
					{authorList.length
						? authorList.map((obj: AuthorType) => {
								if (!returnAuthorsIdArr(courseAuthorList).includes(obj.id)) {
									return (
										<li key={obj.id}>
											<div>{obj.name}</div>
											<Button
												onClick={() =>
													setCourseAuthorList([...courseAuthorList, obj])
												}
											>
												Add author
											</Button>
										</li>
									);
								} else {
									return null;
								}
						  })
						: 'Authors list is empty'}
				</ul>
			</div>
		</>
	);
};

export default Authors;
