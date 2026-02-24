import 'dotenv/config'
import {uri, mongoose} from "../config/mongodb.js";
import Product from "../models/product.js"

const seedProducts = async () => {
  try {

    await mongoose.connect(uri);

    await Product.deleteMany({}); 

     const products = [
        {
	    name: "Jaqueta Bomber Street",
		price: 299.9,
		totalQuantity: 10,
		description: "Tecido impermeável com forro interno acetinado.",
        category : "Casacos",
		image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500",
        },
        {
        name: "Calça Cargo Utilitária",
		price: 189,
		totalQuantity: 2,
		description: "4 bolsos funcionais, tecido resistente e corte moderno.",
        category: "Calças",
		image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500",
        },
        {
        name: "Camiseta Minimalist Off-White",
		price: 89.9,
		totalQuantity: 50,
		description: "Algodão sustentável de alta gramatura.",
        category: "Camisetas",
		image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        },
        {
        name: "Óculos Linear Dark (Masc)",
        price: 189.90,
        totalQuantity: 10,
        description: "Design retangular em acetato preto fosco com proteção UV400.",
        category: "Acessórios",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
        },
        {
        name: "Óculos Retro Gloss (Fem)",
        price: 219.00,
        totalQuantity : 20,
        description: "Armação leve em policarbonato com lentes degradê premium.",
        category: "Acessórios",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500"   
        },
        {
        name: "Pulseira Industrial Chain (Masc)",
        price: 129.00,
        totalQuantity : 100,
        description: "Corrente robusta em aço inoxidável 316L com fecho magnético.",
        category: "Acessórios",
        image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=800"    
        },
        {
        name: "Pulseira Slim Infinity (Fem)",
        price: 145.00,
        totalQuantity : 50,
        description: "Design minimalista banhado a ródio com micro cristais.",
        category: "Acessórios",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800"   
        }
      ]
    await Product.insertMany(products);

    console.log("Products seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
