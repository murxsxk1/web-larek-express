import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import product from './routes/product';
import order from './routes/order';
import cors from 'cors';

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/weblarek')
  .then(() => console.log("MongoDB подключен"))
  .catch(err => console.error("MongoDB не подключен:", err));

app.use('/product', product);
app.use('/order', order)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Порт сервера: ${PORT}`);
});

