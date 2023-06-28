import cities from '../data/cities.js';

const getCities = (req, res) => {
	const language = req.query.lang;
	const data = cities.map(({ id, [`city_${language}`]: city }) => ({
		id,
		city,
	}));
	res.json(data);
};

export { getCities };
