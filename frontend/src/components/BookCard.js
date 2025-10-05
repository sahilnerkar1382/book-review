import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold">{book.title}</h3>
      <p className="text-gray-600">by {book.author}</p>
      <p className="mt-2 text-sm text-gray-500">{book.genre} - {book.year}</p>
      <Link to={`/books/${book._id}`} className="text-blue-500 hover:underline mt-4 inline-block">
        View Details
      </Link>
    </div>
  );
};

export default BookCard;
