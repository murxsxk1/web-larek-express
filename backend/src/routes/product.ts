import { validateProduct } from "middlewares/validations";
import { createProduct, getProducts } from "../controllers/products";
import express from "express";

const router = express.Router();

router.get('/', getProducts);
router.post('/', validateProduct, createProduct);

export default router;