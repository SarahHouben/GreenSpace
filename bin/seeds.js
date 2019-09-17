// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const GreenSpace = require("../models/GreenSpace");
const Image = require("../models/Image");
const Comment = require("../models/Comment")

const bcryptSalt = 10;

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost/greenspace', {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


// ####### #####################  SEEDS USERS  #################################################
/*
let users = [{
    username: "Sarah",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
    email: "sarahhouben@outlook.com",
    role: "user"
  },
  {
    username: "Marko",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
    email: "sarahhouben@outlook.com",
    role: "admin"
  }
]

User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })
*/


// ####### #####################   SEEDS GREENSPACES    #################################################

const greenspaces = [{
    name: "Treptower Park",
    creator: "5d7f786c81168f4a21c5056e",
    location: {
      lat: 52.5021434,
      lng: 13.5047152
    },
    tags: ["Park", "Trees", "Lawn"]
  },
  {
    name: "Elefantenspielplatz",
    creator: "5d7f786c81168f4a21c5056e",
    location: {
      lat: 52.5021503,
      lng: 13.4346768
    },
    tags: ["Playground", "Trees"]
  }
]


GreenSpace.create(greenspaces).then(data => {
  console.log(`Success! Imported ${data.length} greenspaces!`);
  mongoose.connection.close();
});


// ####### #####################   SEEDS COMMENTS  #################################################

// ####### #####################   SEEDS IMAGES  #################################################