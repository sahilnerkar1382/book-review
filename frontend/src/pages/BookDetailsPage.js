import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as api from '../services/api';
import { useAuth } from '../context/AuthContext';

const BookDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState(0);
    const [newReview, setNewReview] = useState({ rating: 5, reviewText: '' });

    const fetchBookDetails = async () => {
        try {
            const { data } = await api.fetchBook(id);
            setBook(data.book);
            setReviews(data.reviews);
            setAvgRating(data.avgRating);
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        fetchBookDetails();
    }, [id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.addReview({ ...newReview, bookId: id });
            setNewReview({ rating: 5, reviewText: '' });
            fetchBookDetails(); // Refresh reviews
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
            alert(error.response?.data?.message || 'Failed to add review');
        }
    };

    const handleDeleteBook = async () => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await api.deleteBook(id);
                navigate('/');
            } catch (error) {
                console.error('Failed to delete book:', error);
            }
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                await api.deleteReview(reviewId);
                fetchBookDetails(); // Refresh reviews
            } catch (error) {
                console.error('Failed to delete review:', error);
            }
        }
    };


    if (!book) return <div>Loading...</div>;

    const isOwner = user && user._id === book.addedBy._id;
    
    return (
        <div className="container mx-auto mt-8 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                <p className="text-xl text-gray-700">by {book.author}</p>
                <p className="text-md text-gray-500">{book.genre} - {book.year}</p>
                <p className="mt-4">{book.description}</p>
                <p className="mt-4 font-semibold">Added by: {book.addedBy.name}</p>
                <p className="mt-2 text-2xl font-bold text-yellow-500">Average Rating: {avgRating.toFixed(1)} ★</p>

                {isOwner && (
                    <div className="mt-4">
                        <Link to={`/edit-book/${id}`} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Edit Book</Link>
                        <button onClick={handleDeleteBook} className="bg-red-500 text-white px-4 py-2 rounded">Delete Book</button>
                    </div>
                )}
            </div>

            {/* Reviews Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                {user && (
                    <form onSubmit={handleReviewSubmit} className="mb-6 p-4 border rounded-lg">
                        <h3 className="text-lg font-semibold">Add Your Review</h3>
                        <div className="my-2">
                            <label>Rating:</label>
                            <select value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })} className="ml-2 border rounded">
                                <option value="5">5 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="2">2 Stars</option>
                                <option value="1">1 Star</option>
                            </select>
                        </div>
                        <textarea
                            value={newReview.reviewText}
                            onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })}
                            placeholder="Write your review..."
                            required
                            className="w-full p-2 border rounded"
                        />
                        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Submit Review</button>
                    </form>
                )}
                {reviews.map(review => (
                    <div key={review._id} className="border-b py-4">
                        <p className="font-bold">{review.userId.name} - <span className="text-yellow-500">{review.rating} ★</span></p>
                        <p>{review.reviewText}</p>
                        {user && user._id === review.userId._id && (
                             <button onClick={() => handleDeleteReview(review._id)} className="text-red-500 text-sm mt-1">Delete</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookDetailsPage;
