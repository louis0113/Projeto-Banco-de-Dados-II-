import express from 'express';
import 'dotenv/config';
import sequelize from "./src/config/sequelize.js";
import redis from "./src/config/redis.js"
import {uri, mongoose} from "./src/config/mongodb.js"

const app = express();
app.use(express.json());

async function databaseConnect(callback, database){
    try{
        await callback
        console.log(`Connect from ${database}`)
    } catch (err){
        console.error(`Unable to connect from ${database} `, err)
    }
}

databaseConnect(sequelize.sync(), 'MySQL');
databaseConnect(redis.connect(), 'Redis');
databaseConnect(mongoose.connect(uri), 'MongoDB');

export default app;
