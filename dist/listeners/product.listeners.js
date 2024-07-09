"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeProductListeners = initializeProductListeners;
const product_events_1 = require("../events/product.events");
function initializeProductListeners() {
    product_events_1.productEvents.on('productCreated', handleProductCreated);
    product_events_1.productEvents.on('productUpdated', handleProductUpdated);
    product_events_1.productEvents.on('productDeleted', handleProductDeleted);
}
function handleProductCreated(product) {
    console.log(`Product created: ${product.name}`);
}
function handleProductUpdated(product) {
    console.log(`Product updated: ${product.name}`);
}
function handleProductDeleted(productId) {
    console.log(`Product deleted: ${productId}`);
}
