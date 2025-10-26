import { ja } from "@faker-js/faker/.";
import { celebrate, Joi, Segments } from "celebrate";

export const validateProduct = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(2).max(30).required(),
    image: Joi.object({
      fileName: Joi.string().required(),
      originalName: Joi.string().required(),
    }).required(),
    category: Joi.string().required(),
    description: Joi.string().allow(''),
    price: Joi.number().min(0).allow(null),
  })
});

export const validateOrder = celebrate({
  [Segments.BODY]: Joi.object({
    items: Joi.array().items(Joi.string().hex().length(24)).min(1).required(),
    total: Joi.number().min(0).required(),
    payment: Joi.string().valid('card', 'online').required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().min(5).required()
  })
})