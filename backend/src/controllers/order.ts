import Product from "../models/product";
import { Request, Response } from "express";
import { faker } from "@faker-js/faker";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { total, items } = req.body;

    const products = await Product.find({ _id: items });

    if (products.length !== items.length) {
      return res
        .status(400)
        .json({ message: "Один или несколько товаров не найдены" });
    }

    if (products.some((product) => product.price == null)) {
      return res
        .status(400)
        .json({ message: "Один или несколько товаров недоступны для заказа" });
    }

    const sum = products.reduce((acc, product) => acc + product.price!, 0);

    if (sum !== total) {
      return res
        .status(400)
        .json({ message: "Сумма заказа не соответствует сумме товаров" });
    }

    const orderId = faker.string.uuid();

    res.status(200).json({ id: orderId, total: sum });
  } catch (error) {
    console.error("Ошибка при создании заказа:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
