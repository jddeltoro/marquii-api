import express from 'express';
import mongoose from 'mongoose';
import ProductRouter from './routes/product.routes';
import { initializeListeners } from './listeners/index.listeners';

const app = express();
const port = 3000;

app.use(express.json());

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/myapp';

const connectWithRetry = () => {
        mongoose.connect(mongoUri)
        .then(() => {
            console.log('MongoDB connected successfully');
            initializeListeners();
        })
        .catch((err) => {
            console.error('MongoDB connection error:', err);
            console.log('Retrying in 5 seconds...');
            setTimeout(connectWithRetry, 5000);
        });
};

connectWithRetry();

// Routes
app.use('/products', ProductRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

export default app;