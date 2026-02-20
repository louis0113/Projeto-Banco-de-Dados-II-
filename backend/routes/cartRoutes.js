import express from 'express';
const router = express.Router();
import { addToCart, viewCart, viewPrice, removeItem, clearCart, updateQuantity } from '../controllers/cartController.js';
import auth from '../middleware/authMiddleware.js';
import role from '../middleware/roleMiddleware.js';

router.post('/:userId/items', auth, role(['user']), addToCart);
router.get('/:userId', auth, role(['user']), viewCart);
router.get('/:userId/price', auth, role(['user']), viewPrice);
router.put('/:userId/item/:productId', auth, role(['admin']), updateQuantity);
router.delete('/:userId/items/:productId', auth, role(['user']), removeItem);
router.delete('/:userId', auth, role(['user']), clearCart);

export default router
