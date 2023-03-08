import { mockedAuthorsList } from 'constants';

export const getAllAuthors = () => mockedAuthorsList.map((item) => item.name);
