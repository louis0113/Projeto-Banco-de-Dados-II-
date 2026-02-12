import express from 'express';
import 'dotenv/config';
import sequelize from "./src/config/sequelize.js";
import redis from "./src/config/redis.js"
import {uri, mongoose} from "./src/config/mongodb.js"
const app = express();

async function databaseConnect(callback, database){
try {
  await callback;
  console.log(`Conectado com sucesso ao ${database}`);
} catch (error) {
  console.error(`Erro ao conectar com ${database}:`, error);
}
}

databaseConnect(sequelize.sync(), 'MySQL');
databaseConnect(redis.connect(), 'Redis');
databaseConnect(mongoose.connect(uri), 'MongoDB');

export default app;

