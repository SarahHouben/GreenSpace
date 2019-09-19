const express = require('express');
const router = express.Router();
const GreenSpace = require("../models/GreenSpace");
const User = require("../models/User");

/* GET user profile page */

router.get('/:userId', (req, res, next) => {
  console.log(' profile page loaded')
  const userId = req.user._id;
  User.findById(userId).then(user => {
GreenSpace.find({_id:{$in:user.favourites}},{
  location: 1,
  name: 1
}).then(greenSpace =>{
  
  res.render('user', {
    user: user,
    greenSpace:greenSpace
  });
})

  })
});


//Profile Photo
router.post('/:userId/profile-image', (req, res, next) => {
  const profileImage = req.body.profileImage;
  const userId = req.user._id;

  User.updateOne({
      _id: userId
    }, {
      image: profileImage
    })
    .then(result => {
      res.send();
    })
    .catch(err => {
      console.log(err);
    })
});
// //Profile Photo
// router.post('/:userId/profile-image', (req, res, next) => {
//   const profileImage = req.body.profileImage;
//   const userId = req.user._id;

//   User.updateOne({
//       _id: userId
//     }, {
//       image: profileImage
//     })
//     .then(result => {
//       res.redirect(`/user/${userId.toString()}`);
//     })
//     .catch(err => {
//       console.log(err);
//     })
// });






module.exports = router;