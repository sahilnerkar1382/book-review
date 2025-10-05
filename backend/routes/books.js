// backend/routes/books.js
const express = require('express');
const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/')
  .get(getAllBooks)
  .post(protect, createBook);

router.route('/:id')
  .get(getBookById)
  .put(protect, updateBook)
  .delete(protect, deleteBook);

module.exports = router;
