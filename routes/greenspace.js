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
    user: req.user,
    // message: "Please enter a name for your GreenSpace"
  });
});


//####  Create New GreenSpace   #### //

router.post('/new', (req, res, next) => {
  console.log(req.body.tags)
  const {
    name,
    creator,
    lat,
    lng,
    tags
  } = req.body;

  if (name === "" || lat === "" || lng === "") {
    // res.json({message: "Please enter a name for your GreenSpace"})
    res.render("newGreenSpace", {
      user: req.user,
      message: "Please enter name and location for your GreenSpace"
    });
    return;
  }


  if (tags === undefined) {
    // res.json({message: "Please enter a name for your GreenSpace"})
    res.render("newGreenSpace", {
      user: req.user,
      message: "Please select at least one tag for your GreenSpace"
    });
    return;
  }


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
      console.log(`Success! ${name} was added to the database.`);
      // res.redirect(`/greenspace/new`);
      res.redirect(`/user/${req.user._id}`);
      // res.redirect(`/greenspace/${req.greenspace._id}`);
    })
    .catch(err => {
      console.log(err);
      next();
    });
})



module.exports = router;