export const pipeDuration = (duration) => {
	const hours = Math.floor(duration / 60);
	const hoursWithZero = hours > 9 ? hours : `0${hours}`;
	const minutes = duration % 60;
	const minutesWithZero = minutes > 9 ? minutes : `0${minutes}`;
	return `${hoursWithZero}:${minutesWithZero}`;
};
