import mongoose from 'mongoose';

interface IImage {
  fileName: string;
  originalName: string;
}

interface IProduct {
  title: string;
  image: IImage;
  category: string;
  description?: string;
  price: number | null;
}

const imageSchema = new mongoose.Schema<IImage>({
  fileName: {
    type: String,
    required: [true, 'Поле fileName обязательно для заполнения'],
  },
  originalName: {
    type: String,
    required: [true, 'Поле originalName обязательно для заполнения'],
  },
});

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    required: [true, 'Поле "title" обязательно для заполнения'],
    minlength: [2, 'Минимальная длина поля "title" - 2 символа'],
    maxlength: [30, 'Максимальная длина поля "title" - 30 символов'],
    unique: true,
  },
  image: imageSchema,
  category: {
    type: String,
    required: [true, 'Поле category обязательно для заполнения'],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: null,
    min: [0, 'Цена не может быть отрицательной'],
  },
});

export default mongoose.model<IProduct>('Product', productSchema);
