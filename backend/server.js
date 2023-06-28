import express from 'express';
import categoryRoutes from './routes/categoryRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import discountRoutes from './routes/discountRoutes.js';
const app = express();
app.use(express.json());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

app.get('/', (req, res) => {
	res.json('API is running');
});

app.use('/api/categories', categoryRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/discounts', discountRoutes);

const PORT = 5000;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
