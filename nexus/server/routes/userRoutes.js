const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { getUserProfile, getAllUsers } = require('../controllers/userController');

router.get('/me', protect, getUserProfile);
router.get('/', protect, getAllUsers);

module.exports = router;