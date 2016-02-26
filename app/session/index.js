'use strict';
const session = require('express-session'),
  MongoStore = require('connect-mongo')(session),
  db = require('../db');

if ("production"===process.env.NODE_ENV){
  // initialze the sessions differently
  module.exports = session({
    secret: process.env.session_secret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db.Mongoose.connection
    })
  });
} else {
  // initialze the sessions for dev
  module.exports = session({
    secret: process.env.session_secret,
    resave: false,
    saveUninitialized: true
  });
}
