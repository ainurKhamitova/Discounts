import { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { Col, Button, Form, ListGroup } from 'react-bootstrap';
import { ImSearch } from 'react-icons/im';
import { useTranslation } from 'react-i18next';

const Search = ({ setDiscounts, city, selectedCategory }) => {
	const [inputText, setInputText] = useState('');
	const [filteredData, setFilteredData] = useState([]);
	const [listData, setListData] = useState([]);
	const [data, setData] = useState([]);
	const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
	const [t, i18n] = useTranslation();
	const inputRef = useRef(null);
	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get(
				`/api/discounts?city=${city.id}&category=${selectedCategory.id}&lang=${i18n.language}`
			);

			setData(data);
		};

		fetchData();
	}, [i18n.language, city.id, selectedCategory.id]);

	const handleInputChange = (e) => {
		const inputValue = e.target.value.toLowerCase();
		setInputText(inputValue);

		const filteredResults = data.filter((item) =>
			item.title.toLowerCase().includes(inputValue)
		);
		setFilteredData(filteredResults);
		setListData(filteredResults);
		setSelectedItemIndex(-1);
	};

	const handleInput = useCallback((item) => {
		setInputText(item.title);
		setFilteredData([item]);
		setListData([item]);
	}, []);

	const handleSearchSubmit = useCallback(
		(e) => {
			e.preventDefault();
			setDiscounts(filteredData);
			setListData([]);
			setSelectedItemIndex(-1);
		},
		[filteredData, setDiscounts]
	);

	const handleKeyPress = useCallback(
		(e) => {
			if (e.key === 'Enter') {
				if (selectedItemIndex !== -1) {
					// If an item is selected using up/down arrow keys, select it
					handleInput(listData[selectedItemIndex]);
				} else {
					handleSearchSubmit(e);
				}
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				if (selectedItemIndex > 0) {
					setSelectedItemIndex(selectedItemIndex - 1);
				}
			} else if (e.key === 'ArrowDown') {
				e.preventDefault();
				if (selectedItemIndex < listData.length - 1) {
					setSelectedItemIndex(selectedItemIndex + 1);
				}
			}
		},
		[handleInput, handleSearchSubmit, listData, selectedItemIndex]
	);

	useEffect(() => {
		const inputElement = inputRef.current;
		if (inputElement) {
			inputElement.addEventListener('keydown', handleKeyPress);
		}

		return () => {
			if (inputElement) {
				inputElement.removeEventListener('keydown', handleKeyPress);
			}
		};
	}, [inputRef, handleKeyPress]);

	return (
		<Col lg={10} className='mb-4 ms-auto'>
			<Form className='d-flex mt-2' onSubmit={handleSearchSubmit}>
				<Form.Control
					ref={inputRef}
					type='search'
					placeholder={t('search.text')}
					className='me-2 animate__animated animate__fadeInRight'
					aria-label='Search'
					value={inputText}
					onChange={handleInputChange}
				/>
				<Button type='submit' className='rounded' variant='outline-success'>
					<ImSearch />
				</Button>
			</Form>
			{inputText && (
				<ListGroup className='autocomplete-suggestions'>
					{listData.map((item, index) => (
						<ListGroup.Item
							action
							variant='light'
							key={item.id}
							className={`autocomplete-suggestion ${
								index === selectedItemIndex ? 'active' : ''
							}`}
							onClick={() => handleInput(item)}
						>
							{item.title}
						</ListGroup.Item>
					))}
				</ListGroup>
			)}
		</Col>
	);
};

export default Search;
