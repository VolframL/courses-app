import { useNavigate } from 'react-router';

import Button from 'common/Button/Button';

import { dateGenerator, pipeDuration, findAuthor } from 'helpers';

import styles from './CourseCard.module.scss';

const CourseCard = ({
	course: { id, title, description, creationDate, duration, authors },
}) => {
	const navigate = useNavigate();

	const onShowCourse = (id) => {
		navigate(`/courses/${id}`);
	};

	return (
		<div key={id} className={styles.course}>
			<div className={styles.descr}>
				<h2>{title}</h2>
				<p>{description}</p>
			</div>
			<div className={styles.info}>
				<div>
					<span>
						<b>Authors: </b>
						{findAuthor(authors).join(', ')}
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
				<Button onClick={() => onShowCourse(id)} buttonText='Show course' />
			</div>
		</div>
	);
};

export default CourseCard;
