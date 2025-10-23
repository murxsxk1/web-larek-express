import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import product from './routes/product';

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/weblarek');

app.use('/product', product);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);
