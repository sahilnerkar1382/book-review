import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.signup(formData);
      login(data);
      navigate('/');
    } catch (err) {
       setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 border rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {error && <p className="bg-red-200 text-red-800 p-2 rounded mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input type="text" name="name" onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input type="email" name="email" onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input type="password" name="password" onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Sign Up</button>
        </form>
        <p className="mt-4 text-center">
            Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
    </div>
  );
};

export default SignupPage;
