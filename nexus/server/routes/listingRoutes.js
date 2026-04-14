const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { createListing, getListings } = require('../controllers/listingController');

router.route('/').post(protect, createListing).get(getListings);

module.exports = router;