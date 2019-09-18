const express = require('express');
const router = express.Router();
const GreenSpace = require("../models/GreenSpace");
const User = require("../models/User");
const Image = require("../models/Image");
const Comment = require("../models/Comment");
const app = require('../app')

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




//####  Get "Create New GreenSpace" page  #### //
router.get('/new', (req, res, next) => {
  console.log(req.user)
  res.render('newGreenSpace', {
    user: req.user,
  });
});


//####  Create New GreenSpace Document  #### //

router.post('/new', (req, res, next) => {
  // console.log(req.body)
  // console.log(req.user)
  const {
    name,
    creator,
    lat,
    lng,
    tags
  } = req.body;

  GreenSpace.create({
      name,
      creator: req.user._id,
      location: {
        lat,
        lng
      },
      tags
    })
    .then(greenspace => {
      console.log(`Success! ${name} was added to the database.`, greenspace);
      res.redirect(`/greenspace/${greenspace._id}`);
    })
    .catch(err => {
      console.log(err);
      next();
    });
})




//####  Create New Comment Document  #### //

router.post(`/:id`, (req, res, next) => {
  // console.log(req.body)
  const comment = req.body.comment;
  const greenspace = req.params.id;
  const creator = req.user._id;

  Comment.create({
      comment,
      greenspace,
      creator
    })
    .then((newComment) => {
      console.log(" New comment was added.");
      res.redirect(`/greenspace/${greenspace}`);
    })
    .catch(err => {
      console.log(err);
    })
})




//######          Get  GreenSpace Profile page      ###### //
router.get('/:greenspaceId', (req, res, next) => {

  const user = req.user
  const greenspaceId = req.params.greenspaceId;
  app.locals.spaceId = greenspaceId

  Comment.find({
      greenspace: greenspaceId
    }).then(comments => {

      Image.find({
          greenspace: greenspaceId
        })
        .then(images => {
          GreenSpace.findById({
              _id: greenspaceId
            })
            .then(greenspace => {
              if (req.user) {
                res.render('greenspace', {
                  user: user,
                  greenspace: greenspace,
                  images: images,
                  comments: comments
                })
              } else {
                res.render('greenspace', {
                  greenspace: greenspace,
                  images: images,
                  comments: comments
                })
              }
            })
            .catch(err => {
              console.log(err);
              next();
            });
        })
        .catch(err => {
          console.log(err);
          next();
        });
    })
    .catch(err => {
      console.log(err);
      next();
    });
});


router.post('/favorite/:id', (req, res, next) => {
  User.findByIdAndUpdate({
      _id: req.user._id
    }, {
      $push: {
        favourites: req.params.id
      }
    }, {
      new: true
    }).then(found => {
      console.log(found);
    }),
    console.log("dada", req.user._id)

})

module.exports = router;