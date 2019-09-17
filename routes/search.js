const express = require("express");
const router = express.Router();
const GreenSpace = require("../models/GreenSpace");
const User = require("../models/User");


router.get("/", (req, res, next) => {
  res.render("./search/result-map");
});

router.post("/", (req, res, next) => {
  const { lat, lng } = req.body;

  res.render("./search/result-map", {
    lat,
    lng,
    array: JSON.stringify([
      {
        lat: 10,
        lng: 20
      },
      {
        lat: 20,
        lng: 20
      },
      {
        lat: 30,
        lng: 20
      }
    ])
  });
});

router.get("/location", (req, res, next) => {
  res.render("./search/location");
});

router.post("/address", (req, res, next) => {
  const {address} = req.body;
 
  axios.post(`"https://maps.googleapis.com/maps/api/geocode/json?address="${address}"berlin&key=AIzaSyDYLwxbUeRyQSlAjR9qLXh3pnr4TFCAIW0"`, {data})


  console.log("req.body.address" , address ,data)
  res.render("./search/address");
});

module.exports = router;