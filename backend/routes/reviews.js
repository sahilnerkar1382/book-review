// backend/routes/reviews.js
const express = require('express');
const { addReview, updateReview, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/')
  .post(protect, addReview);

router.route('/:id')
  .put(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;
