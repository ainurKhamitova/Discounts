import { Card, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import { ImEye } from 'react-icons/im';
import DiscountDetails from './DiscountDetails';
import { useTranslation } from 'react-i18next';

const DiscountCard = ({ showDropdown, discounts }) => {
	const [modalShow, setModalShow] = useState(false);
	const [id, setId] = useState(null);
	const [t, i18n] = useTranslation();

	const handleClick = (id) => {
		setModalShow(true);
		setId(id);
	};

	return (
		<Row md={4}>
			{discounts.map((discount) => (
				<Col className='mb-4' xs={12} key={discount.id}>
					<Card
						className={`card-cascade discount-card narrower animate__animated  ${
							showDropdown ? 'animate__fadeOutDown' : 'animate__fadeInUp'
						}`}
					>
						<div className='view overlay'>
							<Card.Img
								className='card-img-top img img-responsive'
								src='https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(147).webp'
								alt='Card image cap'
							/>
						</div>
						<Card.Body className='card-body-cascade content'>
							<Card.Title className='font-weight-bold discount-title'>
								{discount.title}
							</Card.Title>
							<Row className='align-items-center mb-3'>
								<Col>
									<Button
										variant='outline-secondary'
										onClick={() => handleClick(discount.id)}
									>
										{t('discounts.btn')}
									</Button>
								</Col>
								<Col className='d-flex align-items-center'>
									<ImEye className='ms-auto discount-views-icon' size={20} />
									<span className='ml-4 p-2 discount-views'>
										<strong>{discount.views}</strong>
									</span>
								</Col>
							</Row>

							<Card.Text className='discount'>{discount.discount}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			))}
			{id && (
				<DiscountDetails
					show={modalShow}
					onHide={() => setModalShow(false)}
					id={id}
				/>
			)}
		</Row>
	);
};

export default DiscountCard;
