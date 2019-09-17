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
  console.log(req.user)
  res.render('index', {
    user: req.user
  });
});

// //####//####//####//####//####  GreenSpace   //####//####//####//####//####

// /*Create GreenSpace page */
// router.get('/newgreenspace', loginCheck(), (req, res, next) => {
//   res.render('newGreenSpace', {
//     user: req.user
//   });
// });


// //####  Create New GreenSpace   #### //

// router.post('/greenspaces')




// router.post('/movies', (req, res, next) => {

//   const {
//       title,
//       genre,
//       plot
//   } = req.body;

//   Movie.create({
//           title,
//           genre,
//           plot
//       })
//       .then(celebrity => {
//           console.log(`Success! ${title} was added to the database.`);
//           res.redirect(`/movies`);
//       })
//       .catch(err => {
//           console.log(err);
//           next();
//       })
// })




module.exports = router;