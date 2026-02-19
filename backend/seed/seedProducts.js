import 'dotenv/config'
import {uri, mongoose} from "../config/mongodb.js";
import Product from "../models/product.js";

const seedProducts = async () => {
  try {

    await mongoose.connect(uri);

    await Product.deleteMany({}); 

    const products = [
      { name: "Notebook Dell", price: 3500, quantity: 10 },
      { name: "Smartphone Samsung", price: 2500, quantity: 20 },
      { name: "Headset Gamer", price: 300, quantity: 50 },
    ];

    await Product.insertMany(products);

    console.log("Products seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
