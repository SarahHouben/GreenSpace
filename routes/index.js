const express = require('express');
const router = express.Router();
const GreenSpace = require("../models/GreenSpace");
const User = require("../models/User");

// //PASSPORT METHOD
// const loginCheck = () => {
//   return (req, res, next) => {
//     if (req.isAuthenticated()) {
//       // if user is logged in, proceed to the next function
//       next();
//     } else {
//       // else if user is not logged in, redirect to /login
//       res.redirect("/");
//       // res.redirect("/auth/login");
//     }
//   };
// };


/* GET home page */
router.get('/', (req, res, next) => {
  console.log('user:', req.user);
  console.log('user:', req.session.user);

  res.render('index', {
    user: req.user
  });
});



module.exports = router;