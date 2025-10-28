import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import NotFoundError from '../errors/not-found-error';
import BadRequestError from '../errors/bad-request-error';

const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { total, items } = req.body;

    const products = await Product.find({ _id: items });

    if (products.length !== items.length) {
      throw new NotFoundError('Один или несколько товаров не найдены');
    }

    if (products.some((product) => product.price == null)) {
      throw new BadRequestError('Один или несколько товаров недоступны для заказа');
    }

    const sum = products.reduce((acc, product) => acc + product.price!, 0);

    if (sum !== total) {
      throw new BadRequestError('Сумма заказа не соответствует сумме товаров');
    }

    const orderId = faker.string.uuid();

    res.status(200).json({ id: orderId, total: sum });
  } catch (error) {
    next(error);
  }
};

export default createOrder;
