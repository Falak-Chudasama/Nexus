const Contract = require('../models/Contract');
const Listing = require('../models/Listing');
const User = require('../models/User');
const Review = require('../models/Review');
const { calculateNewReputation } = require('../utils/reputationCalc');

exports.createContract = async (req, res, next) => {
  try {
    const { listingId } = req.body;
    const listing = await Listing.findById(listingId);
    
    if (!listing || listing.status !== 'Open') throw new Error('Listing not available');
    if (listing.creator.toString() === req.user._id.toString()) throw new Error('Cannot accept own listing');

    // Prevent spamming proposals
    const existing = await Contract.findOne({ listing: listingId, partyB: req.user._id, status: 'Pending' });
    if (existing) throw new Error('You already have a pending proposal for this task');

    const contract = await Contract.create({
      listing: listingId,
      partyA: listing.creator,
      partyB: req.user._id
    });

    // Note: We DO NOT change the listing status to 'Matched' yet. 
    // It stays open until the creator accepts this proposal.

    res.status(201).json(contract);
  } catch (error) { next(error); }
};

// NEW: Get requests where the current user is the listing creator
exports.getIncomingRequests = async (req, res, next) => {
  try {
    const requests = await Contract.find({ partyA: req.user._id, status: 'Pending' })
      .populate('listing', 'title')
      .populate('partyB', 'name email reputationScore');
    res.json(requests);
  } catch (error) { next(error); }
};

// NEW: Get active contracts to show emails
exports.getActiveContracts = async (req, res, next) => {
  try {
    const contracts = await Contract.find({
      $or: [{ partyA: req.user._id }, { partyB: req.user._id }],
      status: 'Active'
    })
    .populate('listing', 'title')
    .populate('partyA', 'name email')
    .populate('partyB', 'name email');
    res.json(contracts);
  } catch (error) { next(error); }
};

// Accept proposal
exports.activateContract = async (req, res, next) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (contract.partyA.toString() !== req.user._id.toString()) throw new Error('Unauthorized');
    
    contract.status = 'Active';
    await contract.save();

    // Lock the listing
    await Listing.findByIdAndUpdate(contract.listing, { status: 'Matched' });

    // Auto-decline any other pending proposals for this listing
    await Contract.updateMany(
      { listing: contract.listing, _id: { $ne: contract._id }, status: 'Pending' },
      { $set: { status: 'Cancelled' } }
    );

    res.json(contract);
  } catch (error) { next(error); }
};

// NEW: Reject proposal
exports.rejectContract = async (req, res, next) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (contract.partyA.toString() !== req.user._id.toString()) throw new Error('Unauthorized');

    contract.status = 'Cancelled';
    await contract.save();
    res.json({ message: 'Proposal rejected' });
  } catch (error) { next(error); }
};

// Submit Proof of Work
exports.submitPoW = async (req, res, next) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (contract.partyB.toString() !== req.user._id.toString()) throw new Error('Unauthorized');

    contract.proofOfWork = req.body.proofOfWork;
    contract.status = 'Review';
    await contract.save();
    res.json(contract);
  } catch (error) { next(error); }
};

// Approve Work and Leave Review
exports.completeContract = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const contract = await Contract.findById(req.params.id);
    
    if (contract.partyA.toString() !== req.user._id.toString()) throw new Error('Unauthorized');
    if (contract.status !== 'Review') throw new Error('Contract not in review stage');

    // Create Review
    await Review.create({
      contract: contract._id,
      reviewer: req.user._id,
      reviewee: contract.partyB,
      rating,
      comment
    });

    // Update Reputation & Graph
    const partyBUser = await User.findById(contract.partyB);
    partyBUser.reputationScore = calculateNewReputation(partyBUser.reputationScore, rating);
    
    // Create Reputation Graph Connection (if not already connected)
    if (!partyBUser.connections.includes(req.user._id)) partyBUser.connections.push(req.user._id);
    await partyBUser.save();

    // Close Contract & Listing
    contract.status = 'Completed';
    contract.reviewComplete = true;
    await contract.save();

    await Listing.findByIdAndUpdate(contract.listing, { status: 'Closed' });

    res.json({ message: 'Contract completed and reputation updated', contract });
  } catch (error) { next(error); }
};