const express = require('express');
const router = express.Router();
const { createProduct, updateProduct, listProducts } = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

router.post('/', auth, role(['admin', 'moderator']), createProduct);
router.put('/:id', auth, role(['admin', 'moderator']), updateProduct);
router.get('/', listProducts);

module.exports = router;