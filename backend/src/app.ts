import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import { errors } from 'celebrate';
import winston from 'winston';
import { errorLogger, requestLogger } from './middlewares/logger';
import errorHandler from './middlewares/error-handler';
import config from './config';
import routes from './routes/index';

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(config.DB_ADDRESS)
  .then(() => {
    winston.info('MongoDB подключен');
  })
  .catch((err) => {
    winston.error(`MongoDB не подключен: ${err}`);
  });

app.use(requestLogger);

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(config.PORT, () => {
  winston.info(`Порт сервера: ${config.PORT}`);
});
