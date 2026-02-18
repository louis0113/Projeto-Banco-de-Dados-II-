const express = require('express');
const router = express.Router();
const { addToCart, viewCart } = require('../controllers/cartController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

router.post('/', auth, role(['user']), addToCart);
router.get('/', auth, role(['user']), viewCart);

module.exports = router;