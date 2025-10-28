import dotenv from 'dotenv';

dotenv.config();

if (!process.env.PORT || !process.env.DB_ADDRESS) {
  throw new Error('Отсутствуют необходимые переменные окружения');
}

const config = {
  PORT: process.env.PORT || '3000',
  DB_ADDRESS: process.env.DB_ADDRESS || 'mongodb://127.0.0.1:27017/weblarek',
};

export default config;
