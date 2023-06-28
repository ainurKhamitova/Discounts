import { useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';

function App() {
	const [city, setCity] = useState({ id: '', city: '' });
	return (
		<>
			<Header setCity={setCity} />
			<HomeScreen city={city} />
			<Footer />
		</>
	);
}

export default App;
