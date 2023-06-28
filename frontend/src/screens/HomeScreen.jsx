import DiscountCarousel from '../components/DiscountCarousel';
import { Container } from 'react-bootstrap';
import Category from '../components/Category';

const HomeScreen = ({ city }) => {
	return (
		<main className='py-3'>
			{' '}
			<Container className='container-main'>
				<DiscountCarousel />
				<Category city={city} />
			</Container>
		</main>
	);
};
export default HomeScreen;
