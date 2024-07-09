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
const express_1 = __importDefault(require("express"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const index_listeners_1 = require("./listeners/index.listeners");
const prisma_1 = __importDefault(require("./prisma"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma_1.default.$connect();
            console.log('Database connected successfully');
            // Initialize all listeners
            (0, index_listeners_1.initializeListeners)();
            // Routes
            app.use('/products', product_routes_1.default);
            // Start server
            app.listen(port, () => {
                console.log(`Server running at http://localhost:${port}`);
            });
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
            process.exit(1);
        }
    });
}
startServer();
exports.default = app;
