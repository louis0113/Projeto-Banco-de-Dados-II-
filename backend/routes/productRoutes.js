import express from 'express';
const router = express.Router();
import { createProduct, updateProduct, listProducts } from '../controllers/productController.js';
import auth from '../middleware/authMiddleware.js';
import role from '../middleware/roleMiddleware.js';

router.post('/', auth, role(['admin', 'moderator']), createProduct);
router.put('/:id', auth, role(['admin', 'moderator']), updateProduct);
router.get('/', listProducts);

export default router