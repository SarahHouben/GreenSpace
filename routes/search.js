const express = require("express");
const router = express.Router();
const GreenSpace = require("../models/GreenSpace");
const User = require("../models/User");
const axios = require("axios");

router.get("/", (req, res, next) => {
  res.render("./search/result-map");
});

router.get("/location", (req, res, next) => {
  GreenSpace.find({}, { location: 1, _id: 0 })
    .then(locations => {
      let latLongArray = locations.map(obj => {
        return obj.location;
      });

      res.render("./search/location", { array: JSON.stringify(latLongArray) });
    })
    .catch(err => console.log(err));
});

router.post("/address", (req, res, next) => {
  const { address } = req.body;
  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}berlin&key=AIzaSyDYLwxbUeRyQSlAjR9qLXh3pnr4TFCAIW0`
    )
    .then(loc => {
      GreenSpace.find({}, { location: 1, _id: 0 }).then(locations => {
        let latLongArray = locations.map(obj => {
          return obj.location;
        });
        let data = loc.data.results[0].geometry.location;
      
        res.render("./search/address", {
          data,
          array: JSON.stringify(latLongArray)
        });
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;
