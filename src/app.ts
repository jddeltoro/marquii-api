import express from 'express';
import ProductRouter from './routes/product.routes';
import { initializeListeners } from './listeners/index.listeners';
import prisma from './prisma';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

async function startServer() {
    try {
        await prisma.$connect();
        console.log('Database connected successfully');

        // Initialize all listeners
        initializeListeners();

        // Routes
        app.use('/products', ProductRouter);

        // Start server
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (error: any) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}

startServer();


export default app;