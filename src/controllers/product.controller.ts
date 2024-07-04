import { Request, Response } from 'express';
import prisma from '../prisma';
import { productEvents } from '../events/product.events';

class ProductController {
	async create(req: Request, res: Response) {
		try {
			const product = await prisma.product.create({
				data: req.body,
			});
			productEvents.emit('productCreated', product);
			res.status(201).json(product);
		} catch (error: any) {
			res.status(400).json({ message: error.message });
		}
	}

	async getAll(req: Request, res: Response) {
		try {
			const products = await prisma.product.findMany();
			res.json(products);
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const product = await prisma.product.update({
				where: { id: req.params.id },
				data: req.body,
			});
			productEvents.emit('productUpdated', product);
			res.json(product);
		} catch (error: any) {
			res.status(400).json({ message: error.message });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			await prisma.product.delete({
				where: { id: req.params.id },
			});
			productEvents.emit('productDeleted', req.params.id);
			res.json({ message: 'Product deleted' });
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	}

	async filter(req: Request, res: Response) {
		try {
			const { minPrice, maxPrice, sortBy } = req.query;
			let where = {};
			let orderBy = {};

			if (minPrice) where = { ...where, price: { gte: Number(minPrice) } };
			if (maxPrice) where = { ...where, price: { lte: Number(maxPrice) } };

			if (sortBy === 'price') orderBy = { price: 'asc' };
			else if (sortBy === 'name') orderBy = { name: 'asc' };

			const products = await prisma.product.findMany({
				where,
				orderBy,
			});
			res.json(products);
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	}
}

export default new ProductController();
