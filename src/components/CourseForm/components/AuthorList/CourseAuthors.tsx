import React, { FC } from 'react';

import Button from 'common/Button';

import { CourseAuthorListProps } from 'types';

import styles from '../../CourseForm.module.scss';

const Authors: FC<CourseAuthorListProps> = ({
	courseAuthorList,
	setCourseAuthorList,
}) => {
	return (
		<>
			<div className={styles.author_list}>
				<b>Course authors</b>
				<ul>
					{courseAuthorList.length
						? courseAuthorList.map((obj) => {
								return (
									<li key={obj.id}>
										<div>{obj.name}</div>
										<Button
											onClick={() =>
												setCourseAuthorList(
													courseAuthorList.filter((item) => item.id !== obj.id)
												)
											}
										>
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

export default Authors;
