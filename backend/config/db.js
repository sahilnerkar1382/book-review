// backend/config/db.js
const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

if (!MONGO_URI) {
  // Fail fast if env is misconfigured
  throw new Error('Missing MONGO_URI in environment variables');
}

// Redact credentials in logs
const redactUri = (uri) => {
  try {
    return uri.replace(/\/\/([^:]+):([^@]+)@/, '//<user>:<pass>@');
  } catch (_) {
    return '<unavailable>';
  }
};

const connectDB = async () => {
  try {
    const safeUri = redactUri(MONGO_URI);
    console.log('Connecting to MongoDB:', safeUri);
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Extended diagnostics
    console.error('Error details:', {
      name: err.name,
      code: err.code,
      reason: err.reason && (err.reason.message || err.reason),
    });
    if (err.stack) {
      console.error(err.stack);
    }
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;