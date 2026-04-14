const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { 
  createContract, 
  activateContract, 
  rejectContract,
  submitPoW, 
  completeContract,
  getIncomingRequests,
  getActiveContracts
} = require('../controllers/contractController');

// ⚠️ THESE MUST BE AT THE TOP
router.get('/incoming', protect, getIncomingRequests);
router.get('/active', protect, getActiveContracts);

// Standard and dynamic routes below
router.post('/', protect, createContract);
router.put('/:id/activate', protect, activateContract);
router.put('/:id/reject', protect, rejectContract);
router.put('/:id/submit', protect, submitPoW);
router.put('/:id/complete', protect, completeContract);

module.exports = router;