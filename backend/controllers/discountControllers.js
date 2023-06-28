import discounts from '../data/discounts.js';

const getDiscounts = (req, res) => {
	const { orderBy, city, lang, category } = req.query;

	const filteredDiscounts = discounts.filter((discount) => {
		if (city && category) {
			return (
				discount.city_id === Number(city) &&
				discount.category_id === Number(category)
			);
		} else if (city) {
			return discount.city_id === Number(city);
		} else if (category) {
			return discount.category_id === Number(category);
		} else {
			return true;
		}
	});

	const result = filteredDiscounts.map(
		({
			id,
			image,
			[`title_${lang}`]: title,
			[`discount_${lang}`]: discount_lang,
			discount,
			views,
		}) => ({
			id,
			image,
			title,
			discount_lang,
			discount,
			views,
		})
	);

	//console.log(result);

	const sortedData = result.sort((a, b) => {
		if (orderBy === 'alphabetical') {
			if (a.title < b.title) {
				return -1;
			} else if (a.title > b.title) {
				return 1;
			}
			return 0;
		} else if (orderBy === 'rating') {
			if (a.views > b.views) {
				return -1;
			} else if (a.views < b.views) {
				return 1;
			}
			return 0;
		} else if (orderBy === 'discount_rate') {
			const aDiscount = parseInt(a.discount);
			const bDiscount = parseInt(b.discount);

			if (aDiscount > bDiscount) {
				return -1;
			} else if (aDiscount < bDiscount) {
				return 1;
			}
			return 0;
		} else {
			if (a.id < b.id) {
				return -1;
			} else if (a.id > b.id) {
				return 1;
			}
			return 0;
		}
	});

	const data = sortedData.map(
		({ id, image, title, discount_lang: discount, views }) => ({
			id,
			image,
			title,
			discount,
			views,
		})
	);

	res.json(data);
};

const getDiscountById = (req, res) => {
	const { id } = req.params;

	const { lang } = req.query;

	const filteredDiscount = discounts.find(
		(discount) => discount.id === Number(id)
	);

	if (filteredDiscount) {
		const {
			id,
			[`title_${lang}`]: title,
			[`description_${lang}`]: description,
			image,
			[`discount_${lang}`]: discount,
			views,
		} = filteredDiscount;
		const data = { id, title, description, image, discount, views };
		res.json(data);
	} else {
		// Handle the case where the discount with the specified ID is not found
		res.status(404).json({ error: 'Discount not found' });
	}
};

export { getDiscounts, getDiscountById };
