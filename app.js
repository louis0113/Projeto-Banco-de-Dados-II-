import express from 'express';
import 'dotenv/config';
import sequelize from "./src/config/sequelize.js";
import redis from "./src/config/redis.js"
import {uri, mongoose} from "./src/config/mongo.js"

const app = express();
app.use(express.json());

async function databaseConnect(callback, database){
try {
  await sequelize.authenticate();
  console.log("MySQL connection established successfully.");
} catch (error) {
  console.error("Unable to connect to MySQL:", error);
}

databaseConnect(sequelize.sync(), 'MySQL');
databaseConnect(redis.connect(), 'Redis');
databaseConnect(mongoose.connect(uri), 'MongoDB');

await connectMongo();
export default app;