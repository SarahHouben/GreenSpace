const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/createGreenspace', (req, res, next) => {
  res.render('createGreenspace');
});

module.exports = router;