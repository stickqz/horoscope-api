import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();


const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: 'postgres',
  logging: false,
  dialectOptions: process.env.DB_SSL === 'true' ? {
    ssl: { require: true, rejectUnauthorized: false }
  } : {}
});


export default sequelize;
