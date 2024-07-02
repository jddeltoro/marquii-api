import { Request, Response } from 'express';
import Product, { IProduct } from '../models/product.model';
import { productEvents } from '../events/product.events';

class ProductController {
    async create(req: Request, res: Response) {
        try {
            const product: IProduct = new Product(req.body);
            await product.save();
            productEvents.emit('productCreated', product);
            res.status(201).json(product);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error:any) {
            res.status(400).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response) {
            try {
                const product = await Product.findByIdAndDelete(req.params.id);
                if (!product) {
                    return res.status(404).json({ message: 'Product not found' });
                }
                res.json({ message: 'Product deleted' });
            } catch (error:any) {
                res.status(500).json({ message: error.message });
            }
    }

    async filter(req: Request, res: Response) {
            try {
                const { minPrice, maxPrice, sortBy } = req.query;
                let query = Product.find();

                if (minPrice) query = query.where('price').gte(Number(minPrice));
                if (maxPrice) query = query.where('price').lte(Number(maxPrice));

                if (sortBy === 'price') 
                    query = query.sort({ price: 1 });
                else if (sortBy === 'name') 
                    query = query.sort({ name: 1 });

                const products = await query.exec();
                res.json(products);
            } catch (error:any) {
                res.status(500).json({ message: error.message });
            }
    }
}

export default new ProductController();