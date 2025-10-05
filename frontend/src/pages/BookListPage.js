import React, { useState, useEffect } from 'react';
import * as api from '../services/api';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const { data } = await api.fetchBooks(currentPage);
        setBooks(data.books);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };
    getBooks();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">All Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BookListPage;
