import express from 'express';
import productRouter from './product';
import orderRouter from './order';
import NotFoundError from '../errors/not-found-error';

const router = express.Router();

router.use('/product', productRouter);
router.use('/order', orderRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

export default router;