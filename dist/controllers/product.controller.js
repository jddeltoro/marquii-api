"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma"));
const product_events_1 = require("../events/product.events");
const utils_1 = require("../utils/utils");
const client_1 = require("@prisma/client");
class ProductController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield prisma_1.default.product.create({
                    data: req.body,
                });
                product_events_1.productEvents.emit('productCreated', product);
                res.status(201).json(product);
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientValidationError) {
                    const errorMessage = (0, utils_1.extractErrorMessage)(error.message);
                    res.status(400).json({ message: errorMessage });
                }
                else {
                    res.status(500).json({ message: 'An unexpected error occurred' });
                }
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield prisma_1.default.product.findMany();
                res.json(products);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield prisma_1.default.product.update({
                    where: { id: req.params.id },
                    data: req.body,
                });
                product_events_1.productEvents.emit('productUpdated', product);
                res.json(product);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma_1.default.product.delete({
                    where: { id: req.params.id },
                });
                product_events_1.productEvents.emit('productDeleted', req.params.id);
                res.json({ message: 'Product deleted' });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    filter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { minPrice, maxPrice, sortBy } = req.query;
                let where = {};
                let orderBy = {};
                if (minPrice)
                    where = Object.assign(Object.assign({}, where), { price: { gte: Number(minPrice) } });
                if (maxPrice)
                    where = Object.assign(Object.assign({}, where), { price: { lte: Number(maxPrice) } });
                if (sortBy === 'price')
                    orderBy = { price: 'asc' };
                else if (sortBy === 'name')
                    orderBy = { name: 'asc' };
                const products = yield prisma_1.default.product.findMany({
                    where,
                    orderBy,
                });
                res.json(products);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.default = new ProductController();
