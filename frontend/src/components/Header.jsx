import { useState, useEffect } from 'react';
import {
	Navbar,
	Nav,
	Container,
	NavDropdown,
	Modal,
	ListGroup,
	Image,
} from 'react-bootstrap';
import { ImLocation } from 'react-icons/im';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Header = ({ setCity }) => {
	const [t, i18n] = useTranslation();
	const [selectedFlag, setSelectedFlag] = useState('ru');

	const [cityData, setCityData] = useState([]);
	const [selected, setSelected] = useState(false);
	const [selectedCity, setSelectedCity] = useState({ id: '', city: '' });

	useEffect(() => {
		const updateCityLang = async () => {
			const { data } = await axios.get(`/api/cities?lang=${i18n.language}`);
			setCityData(data);
		};

		updateCityLang();

		i18n.on('languageChanged', updateCityLang);

		return () => {
			i18n.off('languageChanged', updateCityLang);
		};
	}, [i18n]);

	useEffect(() => {
		if (selectedCity.id !== '') {
			setCity(selectedCity);
		} else {
			setCity({ id: '', city: '' });
		}
	}, [selectedCity, setCity]);

	useEffect(() => {
		if (selected) {
			const updatedSelectedCity = cityData.find(
				(city) => city.id === selectedCity.id
			);
			setSelectedCity(updatedSelectedCity);
		} else {
			setSelectedCity({ id: '', city: '' });
		}
	}, [selected, cityData]);
	const handleLanguageChange = async (language, flag) => {
		setSelectedFlag(flag);
		i18n.changeLanguage(language);
	};

	const [showCity, setShowCity] = useState(false);

	const handleCitySelect = (id, city) => {
		setSelectedCity({ id, city });

		setCity(selectedCity);

		if (id) {
			setSelected(true);
		} else {
			setSelected(false);
		}

		setShowCity(false);
	};

	return (
		<header>
			<Navbar
				className='w-30'
				bg='dark'
				variant='dark'
				expand='lg'
				collapseOnSelect
			>
				<Container>
					<Navbar.Brand href='#'>
						<Image
							src='/images/logo.png'
							alt=''
							width='150'
							height='30'
							className='d-inline-block align-top'
						></Image>
					</Navbar.Brand>

					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse
						id='basic-navbar-nav'
						className='justify-content-center'
					>
						<Nav className='ms-auto '>
							<Navbar.Text className='me-2' onClick={() => setShowCity(true)}>
								{selected ? selectedCity.city : t('header.my_city')}
								<ImLocation />
							</Navbar.Text>

							<Modal show={showCity} onHide={() => setShowCity(false)}>
								<Modal.Header closeButton>
									<Modal.Title>{t('header.choose')}</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<ListGroup>
										<ListGroup.Item
											action
											variant='light'
											key={''}
											onClick={() => handleCitySelect('', '')}
											active={selectedCity.id === ''}
										>
											{t('header.all_cities')}
										</ListGroup.Item>

										{cityData.map(({ id, city }) => (
											<ListGroup.Item
												action
												variant='light'
												key={id}
												onClick={() => handleCitySelect(id, city)}
												active={selectedCity.id === id}
											>
												{city}
											</ListGroup.Item>
										))}
									</ListGroup>
								</Modal.Body>
							</Modal>

							<NavDropdown
								title={
									<i className={`flag-icon flag-icon-${selectedFlag}`}></i>
								}
								drop='down-centered'
								align='start'
							>
								<NavDropdown.Item
									onClick={() => handleLanguageChange('kaz', 'kz')}
								>
									<i className='flag-icon flag-icon-kz'></i> Қазақ
								</NavDropdown.Item>
								<NavDropdown.Item
									onClick={() => handleLanguageChange('ru', 'ru')}
								>
									<i className='flag-icon flag-icon-ru'></i> Русский
								</NavDropdown.Item>
								<NavDropdown.Item
									onClick={() => handleLanguageChange('en', 'gb')}
								>
									<i className='flag-icon flag-icon-gb'></i> English
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};
export default Header;
