"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const router = express_1.default.Router();
// Create
router.post('/', product_controller_1.default.create);
// Read
router.get('/', product_controller_1.default.getAll);
// Update
router.put('/:id', product_controller_1.default.update);
// Delete
router.delete('/:id', product_controller_1.default.delete);
// Filter and Sort
router.get('/filter', product_controller_1.default.filter);
exports.default = router;
