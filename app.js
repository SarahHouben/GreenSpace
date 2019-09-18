require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const flash = require("connect-flash");
const passport = require("passport");
const User = require("./models/User");
const GreenSpace = require("./models/GreenSpace");


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

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = module.exports = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());


// we serialize only the "_id" field of the user to keep the information stored minimum
// passport.serializeUser((user, done) => {
//   done(null, user._id);
// });

// //when we need the information for the user, the deserializeUser function is 
// //called with the id that we previously serialized to fetch the user from the database
// passport.deserializeUser((id, done) => {
//   User.findById(id)
//     .then(dbUser => {
//       done(null, dbUser);
//     })
//     .catch(err => {
//       done(err);
//     });
// });

// Express View engine setup

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


hbs.registerHelper('ifUndefined', (value, options) => {
  if (arguments.length < 2)
    throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
  if (typeof value !== undefined) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});


// default value for title local
app.locals.title = 'GreenSpace';


//######################################### INSTAGRAM STRATEGY ########################################

const InstagramStrategy = require("passport-instagram").Strategy;

passport.use(
  new InstagramStrategy({
      clientID: process.env.INSTAGRAM_CLIENTID,
      clientSecret: process.env.INSTAGRAM_CLIENTSECRET,
      callbackURL: "http://localhost:3000/auth/instagram/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      //find a user with a profile.id as instagramID or create one
      //console.log(profile);
      User.findOne({
          instagramId: profile.id
        }).then(found => {
          //USER IS FOUND, meaning user with that Instagram id already exists. Then user is logged in
          if (found !== null) {
            done(null, found)
            //User doesn't yet exist
          } else {
            return User.create({
              instagramId: profile.id
            }).then(dbUser => {
              done(null, dbUser);
            });
          }
        })
        .catch(err => {
          done(err);
        });
    }
  )
);


//######################################### TWITTER STRATEGY ########################################

const TwitterStrategy = require("passport-twitter").Strategy;

passport.use(
  new TwitterStrategy({
      consumerKey: process.env.TWITTER_CLIENTID,
      consumerSecret: process.env.TWITTER_CLIENTSECRET,
      callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      //find a user with a profile.id as TwitterID or create one
      //console.log(profile);
      User.findOne({
          twitterId: profile.id
        }).then(found => {
          //USER IS FOUND, meaning user with that Instagram id already exists. Then user is logged in
          if (found !== null) {
            done(null, found)
            //User doesn't yet exist
          } else {
            return User.create({
              twitterId: profile.id
            }).then(dbUser => {
              done(null, dbUser);
            });
          }
        })
        .catch(err => {
          done(err);
        });
    }
  )
);


//######################################### GENERAL FOR PASSPORT  ########################################


// Enable authentication using session + passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}))
app.use(flash());
require('./passport')(app);


const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_API_KEY
});



//######################################### ROUTES  ########################################

const index = require('./routes/index');
app.use('/', index);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const search = require('./routes/search');
app.use('/search', search)

const user = require('./routes/userprofile');
app.use('/user', user)

const greenspace = require('./routes/greenspace');
app.use('/greenspace', greenspace)

const image = require('./routes/image');
app.use('/image', image)



module.exports = app;