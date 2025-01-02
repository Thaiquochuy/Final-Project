import express from 'express';
import { addToCart, getCart,removeProduct } from '../controllers/CartController.js';
import authMiddleware from '../middleware/auth.js';
const cartRouter = express.Router();

cartRouter.post('/them',authMiddleware ,addToCart)
cartRouter.post('/xoa',authMiddleware  , removeProduct)
cartRouter.post('/lay',authMiddleware ,getCart)

export default cartRouter;
