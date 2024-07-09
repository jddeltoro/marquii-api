"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productEvents = void 0;
const events_1 = require("events");
class ProductEvents extends events_1.EventEmitter {
}
exports.productEvents = new ProductEvents();
