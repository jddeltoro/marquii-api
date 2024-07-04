import { productEvents } from "../events/product.events";
import { Product } from '@prisma/client';

export function initializeProductListeners() {
	productEvents.on('productCreated', handleProductCreated);
	productEvents.on('productUpdated', handleProductUpdated);
	productEvents.on('productDeleted', handleProductDeleted);
}

function handleProductCreated(product: Product) {
	console.log(`Product created: ${product.name}`);
}

function handleProductUpdated(product: Product) {
	console.log(`Product updated: ${product.name}`);
}

function handleProductDeleted(productId: String) {
	console.log(`Product deleted: ${productId}`);
}

