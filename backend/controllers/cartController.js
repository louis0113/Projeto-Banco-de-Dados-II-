import Cart from '../models/cart.js';

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  cart.items.push({ productId, quantity });
  await cart.save();

  res.json(cart);
};

export const viewCart = async (req, res) => {
  const userId = req.user.id;
  const cart = await Cart.findOne({ userId }).populate('items.productId');
  res.json(cart);
};

