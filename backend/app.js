import express from 'express';
import 'dotenv/config';
import sequelize from "./config/sequelize.js";
import redis from "./config/redis.js"
import {uri, mongoose} from "./config/mongodb.js"
import products from "./routes/productRoutes.js"
import cart from "./routes/cartRoutes.js"
import auth from  "./routes/authRoutes.js"

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

databaseConnect(sequelize.sync(), 'Postgres');
databaseConnect(redis.connect(), 'Redis');
databaseConnect(mongoose.connect(uri), 'MongoDB');

app.use("/api/auth", auth)
app.use("/api/products", products)
app.use("/api/cart", cart)

export default app;
