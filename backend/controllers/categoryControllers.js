import categories from '../data/categories.js';

const getCategories = (req, res) => {
	const language = req.query.lang;

	const data = categories.map(
		({ id, [`title_${language}`]: title, image }) => ({
			id,
			title,
			image,
		})
	);
	res.json(data);
};

export default getCategories;
