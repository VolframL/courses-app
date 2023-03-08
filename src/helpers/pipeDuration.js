export const pipeDuration = (duration) => {
	const hours = Math.floor(duration / 60);
	const hoursWithZero = hours > 9 ? hours : `0${hours}`;
	const minutes = duration % 60;
	return `${hoursWithZero}:${minutes} hours`;
};
