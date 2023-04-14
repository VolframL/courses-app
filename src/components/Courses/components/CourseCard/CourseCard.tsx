import React, { FC, memo } from 'react';
import { useNavigate } from 'react-router';

import Button from 'common/Button';

import { dateGenerator, pipeDuration, getAuthorsListStr } from 'helpers';

import styles from './CourseCard.module.scss';
import { CourseType, AuthorType } from 'types';
import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';

import { useAppDispatch, useAppSelector } from 'store/index';
import { deleteCourse } from 'store/courses/thunk';
import { getUser } from 'store/selectors';

type CourseCardProps = {
	course: CourseType;
	authorList: AuthorType[];
};

const CourseCard: FC<CourseCardProps> = memo(
	({
		course: { id, title, description, creationDate, duration, authors },
		authorList,
	}) => {
		const navigate = useNavigate();
		const dispatch = useAppDispatch();
		const { role, token } = useAppSelector(getUser);

		const onShowCourse = (id: string) => {
			navigate(`/courses/${id}`);
		};

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
							{getAuthorsListStr(authors, authorList)}
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
						<Button onClick={() => onShowCourse(id)}>Show course</Button>
						{role === 'admin' && (
							<>
								<Button onClick={() => {}}>
									<EditIcon />
								</Button>
								<Button onClick={() => dispatch(deleteCourse({ token, id }))}>
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
