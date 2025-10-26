import { validateOrder } from "../middlewares/validations";
import { createOrder } from "../controllers/order";
import express from "express";

const router = express.Router();

router.post('/', validateOrder, createOrder);

export default router;