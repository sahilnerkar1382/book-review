// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

import BookListPage from './pages/BookListPage';
import BookDetailsPage from './pages/BookDetailsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AddEditBookPage from './pages/AddEditBookPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main className="p-4">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<BookListPage />} />
            <Route path="/books/:id" element={<BookDetailsPage />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/add-book" element={<AddEditBookPage />} />
              <Route path="/edit-book/:id" element={<AddEditBookPage />} />
            </Route>
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
