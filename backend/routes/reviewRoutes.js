// backend/routes/reviewRoutes.js
const express = require('express');
const { addReview, updateReview, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect, addReview);
router.route('/:id').put(protect, updateReview).delete(protect, deleteReview);

module.exports = router;
