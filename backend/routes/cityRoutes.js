import express from 'express';
import { getCities } from '../controllers/cityControllers.js';

const router = express.Router();

router.route('/').get(getCities);

export default router;
