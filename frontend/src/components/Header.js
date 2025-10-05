import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">BookReview</Link>
        <nav className="space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          {user ? (
            <>
              <Link to="/add-book" className="hover:text-gray-300">Add Book</Link>
              <span className="font-semibold">Welcome, {user.name}</span>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/signup" className="hover:text-gray-300">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
