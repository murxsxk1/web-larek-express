import express from 'express';
import { validateOrder } from '../middlewares/validations';
import createOrder from '../controllers/order';

const router = express.Router();

router.post('/', validateOrder, createOrder);

export default router;
