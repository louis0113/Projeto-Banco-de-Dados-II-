import express from 'express';
import 'dotenv/config';
import sequelize from "./src/models/database.js"
const app = express();

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default app;

