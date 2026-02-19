import express from 'express';
const router = express.Router();
import { addToCart, viewCart } from '../controllers/cartController.js';
import auth from '../middleware/authMiddleware.js';
import role from '../middleware/roleMiddleware.js';

router.post('/', auth, role(['user']), addToCart);
router.get('/', auth, role(['user']), viewCart);

export default router
