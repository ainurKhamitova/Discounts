import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaEye } from 'react-icons/fa';

const DiscountDetails = (props) => {
	const [t, i18n] = useTranslation();
	const [discount, setDiscount] = useState({
		id: '',
		title: '',
		description: '',
		image: '',
		discount: '',
		views: '',
	});

	useEffect(() => {
		const updateDiscount = async () => {
			console.log(props.id);
			const { data } = await axios.get(
				`/api/discounts/${props.id}?lang=${i18n.language}`
			);
			setDiscount(data);
		};
		updateDiscount();
	}, [i18n.language, props.id]);

	return (
		<Modal
			{...props}
			size='md'
			aria-labelledby='title'
			centered
			className='discount-modal'
		>
			<Modal.Header closeButton>
				{' '}
				<Modal.Title className='discount-title'>{discount.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body className='content'>
				<div className='view overlay'>
					<Image
						className='card-img-top img pb-3'
						src='https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(147).webp'
						alt='Card image cap'
					/>
				</div>
				<div className='description'>
					<p style={{ textAlign: 'justify' }}>{discount.description}</p>
					<div className='d-flex align-items-center'>
						<FaEye className='ms-auto' size={20} />
						<span className='ml-4 p-2 discount-views'>
							<strong>{discount.views}</strong>
						</span>
						<h1 className='discount'>{discount.discount}</h1>
					</div>
				</div>

				{/* <div className='price-section d-flex justify-content-end'>
					<h2>-{discount.discount}</h2>
				</div>
				<div className='details-image'>
					<Image
						src='https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(147).webp'
						alt=''
						fluid
					/>
				</div>

				<h3>Description</h3>
				<p>{discount.description}</p>

				<div className='price-section d-flex justify-content-end'>
					<h2>Views: {discount.views}</h2>
				</div> */}
			</Modal.Body>
		</Modal>
	);
};

export default DiscountDetails;
