import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ImFilter } from 'react-icons/im';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
const Fiter = ({ selectedCategory, city, setDiscounts }) => {
	const [selectFilter, setSelectFilter] = useState('');
	const [showFilter, setShowFilter] = useState(false);
	const [t, i18n] = useTranslation();
	const filters = [
		{ key: '', label: t('category.none') },
		{ key: 'rating', label: t('category.rating') },
		{ key: 'discount_rate', label: t('category.discount_rate') },
		{ key: 'alphabetical', label: t('category.alphabet') },
		{ key: 'date', label: t('category.date') },
	];

	const handleFilterDropdownClick = () => {
		setShowFilter(!showFilter);
	};

	const handleFilterClick = async (filter) => {
		setSelectFilter(filter);
		setShowFilter(false);
		const { data } = await axios.get(
			`/api/discounts?city=${city.id}&category=${selectedCategory.id}&lang=${i18n.language}&orderBy=${filter}`
		);
		setDiscounts(data);
	};

	//

	return (
		<Dropdown
			show={showFilter}
			drop='down'
			onToggle={handleFilterDropdownClick}
			className={`animate__animated ${selectedCategory && 'animate__fadeIn'}`}
			style={{ zIndex: 1 }}
		>
			<Dropdown.Toggle
				aria-expanded='false'
				style={{ width: 'max-content' }}
				className='d-flex align-items-center dropdown-button me-auto'
				variant='outline'
			>
				<p className='fw-bold mb-1'>
					{' '}
					<ImFilter size={25} />{' '}
				</p>
			</Dropdown.Toggle>

			<Dropdown.Menu>
				{filters.map((filter) => (
					<Dropdown.Item
						key={filter.key}
						onClick={() => handleFilterClick(filter.key)}
						active={selectFilter === filter.key}
					>
						{filter.label}
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	);
};
export default Fiter;
