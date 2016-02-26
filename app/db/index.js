'use strict';
const Mongoose = require('mongoose').connect(process.env.dbURI);

Mongoose.connection.on('error', (err)=>{
  console.log("MongoDB connection error: ", err);
});

module.exports = {
  // again, ES6 object key:val assignment shortcut for Mongoose: Mongoose
  Mongoose
}
