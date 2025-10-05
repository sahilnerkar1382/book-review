// backend/controllers/reviewController.js
const Review = require('../models/Review');
const Book = require('../models/Book');

// @desc    Add a review to a book
// @route   POST /api/reviews
// @access  Private
exports.addReview = async (req, res) => {
  const { bookId, rating, reviewText } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    
    // Check if user already reviewed this book
    const existingReview = await Review.findOne({ bookId, userId: req.user._id });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    const review = new Review({
      bookId,
      userId: req.user._id,
      rating,
      reviewText,
    });
    const createdReview = await review.save();
    res.status(201).json(createdReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
exports.updateReview = async (req, res) => {
    const { rating, reviewText } = req.body;
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        if (review.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        review.rating = rating || review.rating;
        review.reviewText = reviewText || review.reviewText;

        const updatedReview = await review.save();
        res.json(updatedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        if (review.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await review.deleteOne();
        res.json({ message: 'Review removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
