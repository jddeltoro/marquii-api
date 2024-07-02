import { productEvents } from "../events/product.events";
import { IProduct } from "../models/product.model"; 

export function initializeProductListeners() {
    productEvents.on('productCreated',  handleProductCreated);
    productEvents.on('productUpdated',  handleProductUpdated);
    productEvents.on('productDeleted',  handleProductDeleted);
}

function handleProductCreated(product: IProduct) {
    console.log(`Product created: ${product.name}`);
}

function handleProductUpdated(product: IProduct) {
    console.log(`Product updated: ${product.name}`);
}

function handleProductDeleted(product: IProduct) {
    console.log(`Product deleted: ${product.name}`);
}

