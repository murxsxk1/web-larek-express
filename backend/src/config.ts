import dotenv from 'dotenv';

dotenv.config();

if (!process.env.PORT || !process.env.DB_ADDRESS) {
  throw new Error('Отсутствуют необходимые переменные окружения');
}

const config = {
  PORT: process.env.PORT,
  DB_ADDRESS: process.env.DB_ADDRESS,
};

export default config;
