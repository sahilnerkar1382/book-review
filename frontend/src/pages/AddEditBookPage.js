import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as api from '../services/api';

const AddEditBookPage = () => {
  const [formData, setFormData] = useState({ title: '', author: '', description: '', genre: '', year: '' });
  const { id } = useParams(); // For editing
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      const getBook = async () => {
        const { data } = await api.fetchBook(id);
        setFormData({
          title: data.book.title || '',
          author: data.book.author || '',
          description: data.book.description || '',
          genre: data.book.genre || '',
          year: data.book.year || ''
        });
      };
      getBook();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.updateBook(id, formData);
      } else {
        await api.createBook(formData);
      }
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto max-w-lg mt-10 p-6 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Book' : 'Add a New Book'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-3 py-2 border rounded"/>
        </div>
         <div className="mb-4">
            <label className="block text-gray-700">Author</label>
            <input type="text" name="author" value={formData.author} onChange={handleChange} required className="w-full px-3 py-2 border rounded"/>
        </div>
         <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full px-3 py-2 border rounded"></textarea>
        </div>
         <div className="mb-4">
            <label className="block text-gray-700">Genre</label>
            <input type="text" name="genre" value={formData.genre} onChange={handleChange} required className="w-full px-3 py-2 border rounded"/>
        </div>
         <div className="mb-4">
            <label className="block text-gray-700">Published Year</label>
            <input type="number" name="year" value={formData.year} onChange={handleChange} required className="w-full px-3 py-2 border rounded"/>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          {isEditing ? 'Update Book' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default AddEditBookPage;
