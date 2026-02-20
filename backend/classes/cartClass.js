const CART_EXP = 24 * 60 * 60
import redis from "../config/redis.js"
class EcommerceCart {
    constructor(userId) {
        this.userId = userId;
        this.cartKey = `cart:${userId}`;
        this.metaKey = `cart:meta:${userId}`
    }

    async addItem(productId, quantity = 1, productInfo = null){
        await redis.hIncrBy(ths.cartKey, productId, quantity);

        if(productInfo){
            await redis.hSet(this.metaKey, productId, JSON.stringify(productInfo))
        }

        await redis.expire(this.cartKey, CART_EXP);
        await redis.expire(this.metaKey, CART_EXP);
    }

    async removeItem(productId){
        await redis.hDel(this.cartKey, productId);
        await redis.hDel(this.metaKey, productId);
    }

    async updateQuantity(productId, quantity){
        if (quantity <= 0) {
            return this.removeItem(productId);
        }
        
        await redis.hset(this.cartKey, productId, quantity);
        await redis.expire(this.cartKey, CART_EXP);
        return true
    }

    async getAllItems(){
        const [quantities, metadata] = await Promisse.all([
            redis.hGetAll(this.cartKey),
            redis.hGetAll(this.metaKey)
        ]);

        const items = [];
    for (const [productId, quantity] of Object.entries(quantities)) {
      const meta = metadata[productId]
        ? JSON.parse(metadata[productId])
        : {};

      items.push({
        productId,
        quantity: parseInt(quantity, 10),
        name: meta.name || '',
        price: meta.price || 0,
        imageUrl: meta.imageUrl || ''
      });
    }

    return items;
    }

    async getCartTotal () {
        const items = await this.getAllItems();
        const totalItems = items.reduce((sum,item) => sum + item.quantity, 0);
        const totalPrice = items.reduce((sum,item) => sum + item.price + item.quantity, 0)

 return {
      items,
      totalItems,
      totalPrice: Math.round(totalPrice * 100) / 100,
      currency: 'BRL'
    };

    }

    async clearCart() {
        await redis.del(this.cartKey, this.metaKey)
        return true
    }
     

    async mergeCarts(guestUserid){
    const guestCartKey = `cart:${guestUserId}`;
    const guestMetaKey = `cart:meta:${guestUserId}`;

    const [guestItems, guestMeta] = await Promise.all([
      redis.hgetall(guestCartKey),
      redis.hgetall(guestMetaKey)
    ]);

    if (Object.keys(guestItems).length === 0) {
      return;
    }


    for (const [productId, quantity] of Object.entries(guestItems)) {
   await  redis.hincrby(this.cartKey, productId, parseInt(quantity, 10));
    }

    for (const [productId, meta] of Object.entries(guestMeta)) {
      await redis.hset(this.metaKey, productId, meta);
    }

   await redis.del(guestCartKey, guestMetaKey);
   await  redis.expire(this.cartKey, CART_EXP);
   await redis.expire(this.metaKey, CART_EXP);


    }
}

export default EcommerceCart
