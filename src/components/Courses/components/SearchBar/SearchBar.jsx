import Input from 'common/Input/Input';
import Button from 'common/Button/Button';

import styles from './SearchBar.module.scss';

const SearchBar = ({ setSearchText, searchText, onSearch }) => {
	return (
		<div className={styles.search_bar}>
			<Input
				onChange={(e) => setSearchText(e.target.value)}
				value={searchText}
				name='search'
				placeholdetText='Enter course name...'
			/>
			<Button onClick={onSearch} buttonText='Search' />
		</div>
	);
};

export default SearchBar;
