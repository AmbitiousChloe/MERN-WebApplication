import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productsRoutes from'./routes/productsRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from'./routes/userRoutes.js';
import orderRoutes from'./routes/orderRoutes.js';
import cookieParser from 'cookie-parser';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();
connectDB();
const port = process.env.PORT;
const app = express();

//middleware to get the body data
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());



app.use('/api/products', productsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => res.send({clientId: process.env.PAYPAL_CLIENT_ID}));
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/front_end/build')));
    app.get('*', (req, res) => 
    res.sendFile(path.resolve(__dirname, 'front_end', 'build', 'index.html'))
    );
}else{
    app.get('/', (req, res) => {
        res.send('API running')
    });
}



app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on ${port}`))