import React, { FC, memo } from 'react';
import { useNavigate } from 'react-router';

import Button from 'common/Button';

import { dateGenerator, pipeDuration, getAuthorsListNamesArr } from 'helpers';
import url from 'urls';

import styles from './CourseCard.module.scss';
import { CourseCardProps } from 'types';
import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';

import { useAppDispatch } from 'store/index';
import { deleteCourse } from 'store/courses/thunk';

const CourseCard: FC<CourseCardProps> = memo(
	({
		course: { id, title, description, creationDate, duration, authors },
		authorList,
		role,
		courseQuantity,
	}) => {
		const navigate = useNavigate();
		const dispatch = useAppDispatch();

		return (
			<div key={id} className={styles.wrapper}>
				<div className={styles.descr}>
					<h2>{title}</h2>
					<p>{description}</p>
				</div>
				<div className={styles.info}>
					<div>
						<span>
							<b>Authors: </b>
							{getAuthorsListNamesArr(authors, authorList).join(', ')}
						</span>
					</div>
					<div>
						<b>Duration: </b>
						{pipeDuration(duration)} hours
					</div>
					<div>
						<b>Created: </b>
						{dateGenerator(creationDate)}
					</div>
					<div className={styles.buttons}>
						<Button onClick={() => navigate(`${url.courses}/${id}`)}>
							Show course
						</Button>
						{role === 'admin' && (
							<>
								<Button onClick={() => navigate(`${url.courseEdit}/${id}`)}>
									<EditIcon />
								</Button>
								<Button
									onClick={() =>
										courseQuantity > 1
											? dispatch(deleteCourse(id))
											: alert('The backend is now broken')
									}
								>
									<DeleteIcon />
								</Button>
							</>
						)}
					</div>
				</div>
			</div>
		);
	}
);
export default CourseCard;
