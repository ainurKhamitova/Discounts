import { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { ImList } from 'react-icons/im';

import DiscountCard from './DiscountCard';
import Search from './Search';
import Fiter from './Fiter';
import { useTranslation } from 'react-i18next';

const Category = ({ city }) => {
	const [selectedCategory, setSelectedCategory] = useState('');

	const [showDropdown, setShowDropdown] = useState(false);

	const [categories, setCategories] = useState([]);
	const [discounts, setDiscounts] = useState([]);

	const [t, i18n] = useTranslation();

	const handleCategoryClick = (category) => {
		setSelectedCategory(category);
		console.log(selectedCategory);
		setShowDropdown(false);
	};

	const handleDropdownClick = () => {
		setShowDropdown(!showDropdown);
	};

	useEffect(() => {
		const updateCategoriesLang = async () => {
			const { data } = await axios.get(`/api/categories?lang=${i18n.language}`);

			setCategories(data);
		};

		updateCategoriesLang();

		i18n.on('languageChanged', updateCategoriesLang);

		return () => {
			i18n.off('languageChanged', updateCategoriesLang);
		};
	}, [i18n]);

	useEffect(() => {
		const updateCards = async () => {
			const { data } = await axios.get(
				`/api/discounts?city=${city.id}&category=${selectedCategory.id}&lang=${i18n.language}`
			);

			setDiscounts(data);
		};
		updateCards();
	}, [i18n.language, city, selectedCategory]);

	return (
		<>
			{selectedCategory ? (
				<>
					<Row className='align-items-start'>
						<Col lg={2} className='mb-3'>
							<ButtonGroup className='d-flex flex-row justify-content-end '>
								<Dropdown
									show={showDropdown}
									drop='down'
									onToggle={handleDropdownClick}
									className={`animate__animated ${
										selectedCategory && 'animate__fadeIn'
									}`}
									style={{ zIndex: 1 }}
								>
									<Dropdown.Toggle
										aria-expanded='false'
										className='d-flex align-items-center dropdown-button me-2'
										variant='outline'
									>
										{selectedCategory.id === '' ? (
											<ImList size={25} />
										) : (
											<img
												src={selectedCategory.image}
												alt=''
												className='rounded-circle me-1'
												style={{ width: '45px', height: '45px' }}
											/>
										)}
									</Dropdown.Toggle>

									<Dropdown.Menu>
										<Dropdown.Item
											key=''
											onClick={() => handleCategoryClick({ id: '' })}
											active={selectedCategory.id === ''}
										>
											{t('category.all')}
										</Dropdown.Item>
										{categories.map((category) => (
											<Dropdown.Item
												key={category.id}
												onClick={() => handleCategoryClick(category)}
												active={selectedCategory === category}
											>
												{category.title}
											</Dropdown.Item>
										))}
									</Dropdown.Menu>
								</Dropdown>
								<Fiter
									selectedCategory={selectedCategory}
									city={city}
									setDiscounts={setDiscounts}
								/>
							</ButtonGroup>
						</Col>
						<Search
							setDiscounts={setDiscounts}
							city={city}
							selectedCategory={selectedCategory}
						/>
					</Row>

					<DiscountCard showDropdown={showDropdown} discounts={discounts} />
				</>
			) : (
				<>
					<Row md={6}>
						<Col
							key={''}
							className=' mb-4 animate__animated animate__fadeIn'
							xs={6}
							sm={4}
							md={2}
						>
							<Button
								className='w-100 '
								variant='light'
								onClick={() => handleCategoryClick({ id: '' })}
								style={{ width: '100px', height: '100px' }}
							>
								<ImList style={{ width: '30px', height: '42px' }} />
								<div>
									<p className='fw-bold mb-1 mt-1'>{t('category.all')}</p>
								</div>
							</Button>
						</Col>
						{categories.map((category) => (
							<Col
								key={category.id}
								className=' mb-4 animate__animated animate__fadeIn'
								xs={6}
								sm={4}
								md={2}
							>
								<Button
									className='w-100 '
									variant='light'
									onClick={() => handleCategoryClick(category)}
									style={{ width: '100px', height: '100px' }}
								>
									<img
										src={category.image}
										alt=''
										style={{ width: '45px', height: '45px' }}
										className='rounded-circle'
									/>
									<div>
										<p className='fw-bold mb-1'>{category.title}</p>
									</div>
								</Button>
							</Col>
						))}
					</Row>
				</>
			)}
		</>
	);
};

export default Category;
