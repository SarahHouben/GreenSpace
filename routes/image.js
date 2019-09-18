const express = require('express');
const router = express.Router();
const GreenSpace = require("../models/GreenSpace");
const User = require("../models/User");
const Image = require("../models/Image");
const app = require('../app')



//Greenspace Photo --> create new Image Document!
router.post('/greenspace-image', (req, res, next) => {
  const greenSpaceImage = req.body.greenSpaceImage;
  const greenspaceId = app.locals.spaceId;
  const userId = req.user._id;

  Image.create({
      image: greenSpaceImage,
      greenspace: greenspaceId,
      creator: userId
    })
    .then((newImage) => {
      console.log(" New image was uploaded.");
      res.redirect(`/greenspace/${greenspaceId.toString()}`);
    })
    .catch(err => {
      console.log(err);
    })
});

// router.post('/greenspace-image', (req, res, next) => {
//   const greenSpaceImage = req.body.greenSpaceImage;
//   const greenspaceId = app.locals.spaceId;
//   const userId = req.user._id;

//   Image.create({
//       image: greenSpaceImage,
//       greenspace: greenspaceId,
//       creator: userId
//     })
//     .then(newImage => {
//       res.send();
//     })
//     .catch(err => {
//       console.log(err);
//     })
// });



module.exports = router;