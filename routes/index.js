const express = require('express');
const router = express.Router();
const GreenSpace = require("../models/GreenSpace");
const User = require("../models/User");



/* GET home page */
router.get('/', (req, res, next) => {
  console.log('user:', req.user);
  console.log('user:', req.session.user);

  res.render('index', {
    user: req.user
  });
});



module.exports = router;