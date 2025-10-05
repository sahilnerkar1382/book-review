import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-8 flex justify-center">
      <ul className="inline-flex -space-x-px">
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`py-2 px-3 leading-tight ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
