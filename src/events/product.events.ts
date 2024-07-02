import { EventEmitter } from 'events';

class ProductEvents extends EventEmitter {}

export const productEvents = new ProductEvents();