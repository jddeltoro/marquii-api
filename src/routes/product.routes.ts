import express from 'express';
import ProductController from '../controllers/product.controller';

const router = express.Router();

// Create
router.post('/', ProductController.create);

// Read
router.get('/', ProductController.getAll);

// Update
router.put('/:id', ProductController.update);

// Delete
router.delete('/:id', ProductController.delete);

// Filter and Sort
router.get('/filter', ProductController.filter);

export default router;