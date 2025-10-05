// backend/controllers/bookController.js
const Book = require('../models/Book');
const Review = require('../models/Review');

// @desc    Get all books with pagination
// @route   GET /api/books
// @access  Public
exports.getAllBooks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  try {
    const books = await Book.find().skip(skip).limit(limit).populate('addedBy', 'name');
    const totalBooks = await Book.countDocuments();
    res.json({
      books,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single book by ID
// @route   GET /api/books/:id
// @access  Public
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('addedBy', 'name');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    
    const reviews = await Review.find({ bookId: req.params.id }).populate('userId', 'name');
    
    // Calculate average rating
    let avgRating = 0;
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((acc, item) => acc + item.rating, 0);
      avgRating = totalRating / reviews.length;
    }
    
    res.json({ book, reviews, avgRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Create a book
// @route   POST /api/books
// @access  Private
exports.createBook = async (req, res) => {
  const { title, author, description, genre, year } = req.body;
  try {
    const book = new Book({
      title,
      author,
      description,
      genre,
      year,
      addedBy: req.user._id,
    });
    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Check if user is the creator
    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const { title, author, description, genre, year } = req.body;
    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.genre = genre || book.genre;
    book.year = year || book.year;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Review.deleteMany({ bookId: req.params.id }); // Also delete associated reviews
    await book.deleteOne(); // Use deleteOne() instead of remove()
    res.json({ message: 'Book removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
