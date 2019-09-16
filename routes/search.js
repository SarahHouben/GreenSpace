const express = require("express");
const router = express.Router();
const GreenSpace = require("../models/GreenSpace");
const User = require("../models/User");

router.get("/", (req, res, next) => {
  res.render("./search/result-map");
});

router.post("/", (req, res, next) => {
  const {
    lat,
    lng
  } = req.body;

  res.render("./search/result-map", {
    lat,
    lng,
    array: JSON.stringify([{
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

module.exports = router;