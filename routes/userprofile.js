const express = require('express');
const router = express.Router();
const GreenSpace = require("../models/GreenSpace");
const User = require("../models/User");

/* GET user profile page */
// router.get('/', (req, res, next) => {
//   res.render('user');
// });

router.get('/:userId', (req, res, next) => {
  const userId = req.params.userId;

  User.findById(userId).then(user => {
    res.render('user', {
      user: user
    });
  })
});


//Profile Photo
router.post('/:userId/profile-image', (req, res, next) => {
  const profileImage = req.body.profileImage;

  console.log(profileImage)
  const userId = req.params.userId;
  console.log(userId);

  User.updateOne({
      _id: userId
    }, {
      image: profileImage
    })
    .then(result => {
      console.log(result);
      // res.send();
    })
    .catch(err => {
      console.log(err);
    })


  // User.findById(userId).then(user => { 
  // })


});






module.exports = router;