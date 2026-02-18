import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const user = process.env.USER_MONGO;
const pass = process.env.PASS_MONGO;

const mongoUri = `mongodb://${user}:${pass}@localhost:27017/ecommerce?authSource=admin`;

const connectMongo = async () => {
  try {
    await mongoose.connect(mongoUri); 
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectMongo;