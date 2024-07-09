"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeListeners = initializeListeners;
const product_listeners_1 = require("./product.listeners");
function initializeListeners() {
    (0, product_listeners_1.initializeProductListeners)();
}
