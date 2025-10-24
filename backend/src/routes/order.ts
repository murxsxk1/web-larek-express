import { createOrder } from "../controllers/order";
import express from "express";

const router = express.Router();

router.post('/', createOrder);

export default router;