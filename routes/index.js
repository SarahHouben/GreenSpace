const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


/* GET create GreenSpace page */
router.get('/newGreenSpace', (req, res, next) => {
  res.render('newGreenSpace');
});

module.exports = router;