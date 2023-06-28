import { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import DiscountDetails from './DiscountDetails';

const DiscountCarousel = () => {
	const [topDiscounts, setTopDiscounts] = useState([]);
	const [t, i18n] = useTranslation();
	const [selectedDiscountId, setSelectedDiscountId] = useState(null);
	const [modalShow, setModalShow] = useState(false);

	useEffect(() => {
		const getTopDiscounts = async () => {
			const { data } = await axios.get(
				`/api/discounts?orderBy=rating&lang=${i18n.language}`
			);
			setTopDiscounts(data.slice(0, 3));
		};
		getTopDiscounts();
	}, [i18n.language]);

	const handleClick = (id) => {
		setSelectedDiscountId(id);
		setModalShow(true);
	};

	const handleModalClose = () => {
		setModalShow(false);
	};

	return (
		<>
			<Carousel
				pause='hover'
				className='mb-4 carousel-fade carousel custom-carousel'
			>
				{topDiscounts.map((discount) => (
					<Carousel.Item interval={1000} key={discount.id}>
						<div
							className='carousel-image'
							onClick={() => handleClick(discount.id)}
						>
							<img
								src='https://mdbcdn.b-cdn.net/img/new/slides/041.webp'
								className='d-block w-100'
								alt='Wild Landscape'
							/>
							<div className='image-overlay'></div>
						</div>
						<Carousel.Caption>
							<h3>{discount.title}</h3>
						</Carousel.Caption>
					</Carousel.Item>
				))}
			</Carousel>

			{selectedDiscountId && (
				<DiscountDetails
					show={modalShow}
					onHide={handleModalClose}
					id={selectedDiscountId}
				/>
			)}
		</>
	);
};

export default DiscountCarousel;
