// frontend/src/services/api.js
import axios from 'axios';

// Base URL includes "/api" to match backend mounts
const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    const token = JSON.parse(localStorage.getItem('user')).token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Since baseURL already includes /api, do NOT prefix paths with /api here
export const login = (formData) => API.post('/auth/login', formData);
export const signup = (formData) => API.post('/auth/signup', formData);

export const fetchBooks = (page) => API.get(`/books?page=${page}`);
export const fetchBook = (id) => API.get(`/books/${id}`);
export const createBook = (newBook) => API.post('/books', newBook);
export const updateBook = (id, updatedBook) => API.put(`/books/${id}`, updatedBook);
export const deleteBook = (id) => API.delete(`/books/${id}`);

export const addReview = (newReview) => API.post('/reviews', newReview);
export const updateReview = (id, updatedReview) => API.put(`/reviews/${id}`, updatedReview);
export const deleteReview = (id) => API.delete(`/reviews/${id}`);
