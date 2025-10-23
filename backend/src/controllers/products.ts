import Product from "../models/product";
import { Request, Response } from "express";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();

    const response = {
      items: products,
      total: products.length,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера при получении товаров" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, image, category, description, price } = req.body;

    const newProduct = new Product({
      title,
      image,
      category,
      description,
      price,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Ошибка при создании товара:", error);
    res.status(500).json({ message: "Ошибка сервера при создании товара", error });
  }
};
