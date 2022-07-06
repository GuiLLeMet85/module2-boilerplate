const router = require('express').Router();
const User = require("../models/User");
const mongoose = require('mongoose');
const fileUploader = require('../config/cloudinary.config');

// @desc    App home page
// @route   GET /
// @access  Public
router.get('/', (req, res, next) => {
  user = req.session.currentUser
  res.render('index', {user});
});


router.post('/pageAdmin', fileUploader.single('profilePicture'), async (req, res, next) => {
  const user = req.session.currentUser
  const { username, email, profilePicture } = req.body
  try {
      const userPicture = await User.findByIdAndUpdate(user._id, { username, email, profilePicture: req.file.path }, { new: true })
      req.session.currentUser = userPicture
      res.redirect('/')
  } catch (error) {
      next(error)
  }
})

module.exports = router;
