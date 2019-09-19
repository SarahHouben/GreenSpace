const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login", {
    "message": req.flash("error")
  });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

//######################################### ROUTE FOR INSTAGRAM LOGIN /SIGNUP STRATEGY ########################################

router.get("/instagram", passport.authenticate("instagram"));

router.get("/instagram/callback", passport.authenticate("instagram", {
  successRedirect: "/",
  failureRedirect: "/auth/login"
}));

//######################################### ROUTE FOR TWITTER LOGIN /SIGNUP STRATEGY ########################################

router.get("/twitter", passport.authenticate("twitter"));

router.get("/twitter/callback", passport.authenticate("twitter", {
  successRedirect: "/",
  failureRedirect: "/auth/login"
}));

//######################################### ROUTE FOR LOCAL SIGNUP STRATEGY ########################################




router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  // Check for min. password length
  if (password.length < 8) {
    res.render("auth/signup", {
      message: "Your password must have at least 8 characters."
    });
    return;
  }

  //Check that username is given
  if (username === "") {
    res.render("auth/signup", {
      message: "Please enter a username."
    });
    return;
  }

  //Check that email is given
  if (email === "") {
    res.render("auth/signup", {
      message: "Please enter an email address."
    });
    return;
  }


  User.findOne({
    username
  }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", {
        message: "This GreenSpace-user already exists"
      });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save()
      .then((user) => {
        req.login(user, () => {
          res.redirect('/')
        })
      })
      .catch(err => {
        res.render("auth/signup", {
          message: "Something went wrong"
        });
      })
  });
});





router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) next(err);
    else res.redirect("/");
  });
});


module.exports = router;