import express from 'express';

import {
	getDiscounts,
	getDiscountById,
} from '../controllers/discountControllers.js';

const router = express.Router();

router.route('/').get(getDiscounts);
router.route('/:id').get(getDiscountById);

export default router;
