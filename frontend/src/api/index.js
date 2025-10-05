// frontend/src/api/index.js
import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    const token = JSON.parse(localStorage.getItem('user')).token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const login = (formData) => API.post('/api/auth/login', formData);
export const signup = (formData) => API.post('/api/auth/signup', formData);

export const fetchBooks = (page) => API.get(`/api/books?page=${page}`);
export const fetchBook = (id) => API.get(`/api/books/${id}`);
export const createBook = (newBook) => API.post('/api/books', newBook);
export const updateBook = (id, updatedBook) => API.put(`/api/books/${id}`, updatedBook);
export const deleteBook = (id) => API.delete(`/api/books/${id}`);

export const addReview = (newReview) => API.post('/api/reviews', newReview);
export const updateReview = (id, updatedReview) => API.put(`/api/reviews/${id}`, updatedReview);
export const deleteReview = (id) => API.delete(`/api/reviews/${id}`);
