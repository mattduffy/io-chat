'use strict';
const Mongoose = require('mongoose').connect(process.env.dbURI);

Mongoose.connection.on('error', (err)=>{
  console.log("MongoDB connection error: ", err);
});

// Create a mongoose schema that defines a chat user
const chatUser = new Mongoose.Schema({
  profileId: String,
  fullName: String,
  profilePic: String
});

// Turn schema into a model
let userModel = Mongoose.model('chatuser', chatUser);

module.exports = {
  // again, ES6 object key:val assignment shortcut for Mongoose: Mongoose
  Mongoose,
  userModel
}
