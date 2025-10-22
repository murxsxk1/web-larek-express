import mongoose from "mongoose";

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
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  }
});

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxLength: 30,
  },
  image: imageSchema,
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: null,
  }
});

export default mongoose.model<IProduct>('product', productSchema);