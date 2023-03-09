import Button from 'common/Button/Button';

import { dateGenerator } from 'helpers/dateGenerator';
import { pipeDuration } from 'helpers/pipeDuration';
import { findAuthor } from 'helpers/findAuthor';

import styles from './CourseCard.module.scss';

const CourseCard = ({
	course: { id, title, description, creationDate, duration, authors },
}) => {
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
						{findAuthor(authors)}
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
				<Button buttonText='Show course' />
			</div>
		</div>
	);
};

export default CourseCard;
