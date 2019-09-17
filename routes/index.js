const express = require('express');
const router = express.Router();




//PASSPORT METHOD isAuthenticated is used here as well!
const loginCheck = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      // if user is logged in, proceed to the next function
      next();
    } else {
      // else if user is not logged in, redirect to /login
      res.redirect("/auth/login");
    }
  };
};


/* GET home page */
router.get('/', loginCheck(), (req, res, next) => {
  console.log(req.user)
  res.render('index', {
    user: req.user
  });
});


/*Create GreenSpace page */
router.get('/newGreenSpace', loginCheck(), (req, res, next) => {
  res.render('newGreenSpace');
});



module.exports = router;