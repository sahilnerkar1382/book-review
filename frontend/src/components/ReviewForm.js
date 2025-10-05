import React, { useState } from 'react';

const ReviewForm = ({ onSubmit, initial = { rating: 5, reviewText: '' } }) => {
  const [form, setForm] = useState(initial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'rating' ? Number(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg">
      <h3 className="text-lg font-semibold">Add Your Review</h3>
      <div className="my-2">
        <label>Rating:</label>
        <select name="rating" value={form.rating} onChange={handleChange} className="ml-2 border rounded">
          <option value={5}>5 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={2}>2 Stars</option>
          <option value={1}>1 Star</option>
        </select>
      </div>
      <textarea
        name="reviewText"
        value={form.reviewText}
        onChange={handleChange}
        placeholder="Write your review..."
        required
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
