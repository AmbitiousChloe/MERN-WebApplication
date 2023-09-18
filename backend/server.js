import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productsRoutes from'./routes/productsRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from'./routes/userRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB();
const port = process.env.PORT;
const app = express();

//middleware to get the body data
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('API running')
});

app.use('/api/products', productsRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on ${port}`))