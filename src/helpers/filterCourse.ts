import { CourseType } from 'types/types';

export const filterCourse = (coursesList: CourseType[], searchText: string) => {
	if (coursesList.length) {
		const filteredByTitleCoursesList = coursesList.filter((course) =>
			course.title.toLowerCase().includes(searchText.toLowerCase())
		);

		const filteredByIdCoursesList = coursesList.filter((course) =>
			course.id.toLowerCase().includes(searchText.toLowerCase())
		);
		return filteredByTitleCoursesList.length
			? filteredByTitleCoursesList
			: filteredByIdCoursesList;
	} else {
		return [];
	}
};
