const Product = require('../models/product');

exports.createProduct = async (req, res) => {
  const { name, price, quantity } = req.body;
  const product = await Product.create({ name, price, quantity });
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { price, quantity } = req.body;
  const product = await Product.findByIdAndUpdate(id, { price, quantity }, { new: true });
  res.json(product);
};

exports.listProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};