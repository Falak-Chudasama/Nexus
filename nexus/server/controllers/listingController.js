const Listing = require('../models/Listing');

exports.createListing = async (req, res, next) => {
  try {
    const listing = new Listing({ ...req.body, creator: req.user._id });
    const savedListing = await listing.save();
    res.status(201).json(savedListing);
  } catch (error) { next(error); }
};

exports.getListings = async (req, res, next) => {
  try {
    // Basic filtering (e.g., ?type=Barter)
    const filters = req.query.type ? { type: req.query.type } : {};
    filters.status = 'Open'; // Only show open listings
    
    const listings = await Listing.find(filters).populate('creator', 'name reputationScore');
    res.json(listings);
  } catch (error) { next(error); }
};