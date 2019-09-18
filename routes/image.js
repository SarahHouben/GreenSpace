const express = require('express');
const router = express.Router();
const GreenSpace = require("../models/GreenSpace");
const User = require("../models/User");
const Image = require("../models/Image");
const axios = require("axios");



//Greenspace Photo --> create new Image Document!
router.post('/:imageId/greenspace-image', (req, res, next) => {
  const greenSpaceImage = req.body.greenSpaceImage;
  console.log(greenspaceImage)
  // const greenspaceId = req.user._id;
  const greenspaceId = req.params.greenspace._id;
  const userId = req.user._id;

  GreenSpace.create({
      image: greenSpaceImage,
      greenspace: greenspaceId,
      creator: userId
    })
    .then((newImage) => {
      console.log(" New image was upleaded.");
      res.redirect(`/greenspace/${greenspaceId.toString()}`);
    })
    .catch(err => {
      console.log(err);
    })
});



module.exports = router;