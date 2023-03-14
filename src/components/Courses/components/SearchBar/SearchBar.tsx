import React, { FC } from 'react';

import Input from 'common/Input/Input';
import Button from 'common/Button/Button';

import styles from './SearchBar.module.scss';

type SearchBarProps = {
	setSearchText: (value: string) => void;
	searchText: string;
	onSearch: () => void;
};

const SearchBar: FC<SearchBarProps> = ({
	setSearchText,
	searchText,
	onSearch,
}) => {
	return (
		<div className={styles.search_bar}>
			<Input
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setSearchText(e.target.value)
				}
				value={searchText}
				name='search'
				placeholderText='Enter course name...'
			/>
			<Button onClick={onSearch} buttonText='Search' />
		</div>
	);
};

export default SearchBar;
