const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['Barter', 'Micro-Task'], required: true },
  tags: [{ type: String }],
  status: { type: String, enum: ['Open', 'Matched', 'Closed'], default: 'Open' }
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);