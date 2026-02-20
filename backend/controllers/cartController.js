import EcommerceCart from "../classes/cartClass.js"

export const addToCart = async (req, res) => {
    
    const cart = new EcommerceCart(req.params.userId)
    const { productId, quantity, productInfo } = req.body;
    const newQuantity = await cart.addItem(productId,quantity, productInfo)
    res.json({sucess : true, newQuantity})
    
};

export const viewCart = async (req, res) => {
    const cart = new EcommerceCart(req.params.userId)
    const items = await cart.getAllItems()
    res.json(items);
};

export const viewPrice = async (req,res) => {
    const cart = new EcommerceCart(req.params.userId)
    const summary = await cart.getCartTotal();
    res.json(summary)
};

export const  removeItem = async (req,res) => {
    const cart = new EcommerceCart(req.params.userId)
    const removed = await cart.removeItem(req.params.productId);
    res.json({ success: removed });
};

export const updateQuantity = async (req,res) => {
    const cart = new EcommerceCart(req.params.userId)
    const update = await cart.updateQuantity(req.params.productId, req.query.quan)
    res.json({sucess : update})
};
export const clearCart = async (req,res) =>  {
    const cart = new EcommerceCart(req.params.userId);
    await cart.clearCart()
    res.json({sucess : true})
};
