const express = require("express");
const router = express.Router();
const GreenSpace = require("../models/GreenSpace");
const User = require("../models/User");
const Image = require("../models/Image");
const axios = require("axios");

// router.get("/", (req, res, next) => {
//   res.render("./search/result-map", {
//     user: req.user,
//   });
// });

router.get("/location", (req, res, next) => {
  GreenSpace.find({}, {
      location: 1
    })
    .then(locations => {
      let latLongArray = locations.map(obj => {
        return obj; // vrati object da bi dobio i ID
      });

      res.render("./search/location", {
        user: req.user,
        array: JSON.stringify(latLongArray)
      });
    })
    .catch(err => console.log(err));
});

router.post("/address", (req, res, next) => {
  const {
    address
  } = req.body;
  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}berlin&key=AIzaSyDYLwxbUeRyQSlAjR9qLXh3pnr4TFCAIW0`
    )
    .then(loc => {
      GreenSpace.find({}, {
        location: 1
      }).then(locations => {
        // console.log("here is locations",locations)
        let latLongArray = locations.map(obj => {
          return obj;
        });
        // console.log(latLongArray)
        let data = loc.data.results[0].geometry.location;
        res.render("./search/address", {
          user: req.user,
          data,
          array: JSON.stringify(latLongArray)
        });
      });
    })
    .catch(err => console.log(err));
});

router.get("/address", (req, res, next) => {
  GreenSpace.find({}).then(places => {
    User.findById(req.user._id).then(user =>{
    Image.find({}).then(images => {
      let newObj = { places, images, user};
      // console.log(newObj)
      res.json(newObj);
    });
  });
});
});

router.get("/location/test", (req, res, next) => {
  GreenSpace.find({}).then(places => {
    User.findById(req.user._id).then(user =>{
      Image.find({}).then(images => {
        let newOb = { places, images,user };
        

        res.json(newOb);
    })

    });
  });
});

router.get("/favourites/:userId", (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId).then(user => {
    console.log(user);
    GreenSpace.find({
      _id: {
        $in: user.favourites
      }
    }, {
      location: 1,
      name: 1
    }).then(greenSpace => {
      res.render("search/favourites", {
        user: user,
        array: JSON.stringify(greenSpace)
      });
    });
  });
});

module.exports = router;