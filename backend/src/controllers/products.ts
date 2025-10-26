import BadRequestError from "../errors/bad-request-error";
import ConflictError from "../errors/conflict-error";
import Product from "../models/product";
import { NextFunction, Request, Response } from "express";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find();

    const response = {
      items: products,
      total: products.length,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
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
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return next(new BadRequestError(error.message));
    }
    if (error.code === 11000) {
      return next(new ConflictError('Продукт с таким названием уже существует'));
    }
    next(error);
  }
};
