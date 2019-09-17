const express = require('express');
const router = express.Router();
const GreenSpace = require("../models/GreenSpace");
const User = require("../models/User");

// //PASSPORT METHOD
const loginCheck = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      // if user is logged in, proceed to the next function
      next();
    } else {
      // else if user is not logged in, redirect to /login
      res.redirect("/");
    }
  };
};


/*Get "Create New GreenSpace" page */
router.get('/new', loginCheck(), (req, res, next) => {
  res.render('newGreenSpace', {
    user: req.user
  });
});


//####  Create New GreenSpace   #### //

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