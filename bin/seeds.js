// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

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



// ####### #####################   SEEDS GREENSPACES    #################################################

// const greenspaces = [{
//     name: "Treptower Park",
//     creator: "ID SARAH#####################",
//     location: {
//       lat: 52.5021434,
//       lng: 13.5047152
//     },
//     tags: ["Park", "Trees", "Lawn"]
//   },
//   {
//     name: "Elefantenspielplatz",
//     creator: "ID SARAH#####################",
//     location: {
//       lat: 52.5021503,
//       lng: 13.4346768
//     },
//     tags: ["Playground", "Trees"]
//   }
// ]


// Greenspace.create(greenspaces).then(data => {
//   console.log(`Success! Imported ${data.length} greenspaces!`);
//   mongoose.connection.close();
// });


// ####### #####################   SEEDS COMMENTS  #################################################

// ####### #####################   SEEDS IMAGES  #################################################