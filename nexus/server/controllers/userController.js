const User = require('../models/User');

exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('connections', 'name skillsOffered');
    if (!user) throw new Error('User not found');
    res.json(user);
  } catch (error) { next(error); }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) { next(error); }
};