import express from 'express';
import { validateProduct } from '../middlewares/validations';
import { createProduct, getProducts } from '../controllers/products';

const router = express.Router();

router.get('/', getProducts);
router.post('/', validateProduct, createProduct);

export default router;
