const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  partyA: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Creator
  partyB: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Acceptor
  status: { 
    type: String, 
    enum: ['Pending', 'Active', 'Review', 'Completed', 'Cancelled'], 
    default: 'Pending' 
  },
  proofOfWork: { type: String }, // URL or text
  reviewComplete: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Contract', contractSchema);