const express = require('express');
const router = express.Router();
const GreenSpace = require("../models/GreenSpace");
const User = require("../models/User");
const Comment = require("../models/Comment");
const app = require('../app')




// WRAP THIS IN FUNCTION WHICH PULLS INFO FROM FORM

//   const greenspaceId = app.locals.spaceId;
//   const userId = req.user._id;

// Comment.create({
//   comment: "FORM INPUT",
//   rating: "NUMBER FROM FORM",
//   greenspace: greenspaceId,
//   creator: userId
// })
// .then((newComment) => {
//   console.log(" New comment was added.");
//   res.redirect(`/greenspace/${greenspaceId.toString()}`);
// })
// .catch(err => {
//   console.log(err);
// })



module.exports = router;