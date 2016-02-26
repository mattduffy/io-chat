'use strict';
const passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , h = require('../helpers')


module.exports = (config)=>{
  //console.log(config);
  passport.serializeUser((user, done)=>{
    done(null, user.id);
  });
  passport.deserializeUser((id, done)=>{
    //Find the user by _id
    h.findById(id)
      .then((user)=>{done(null, user)})
      .catch((error)=>{ console.error("Error when deserializing user. ", error)});
  });

  let authProcessor = (accessToken, refeshToken, profile, done)=>{
    // find a user in the local db using profile.id
    // if user is found, return the user data using done()
    // if user is not found, create one and fetch from Facebook
    h.findOne(profile.id)
      .then((result)=>{
        if(result) {
          done(null, result);
        } else {
          // create a new user and return
          h.createNewUser(profile)
            .then((newChatUser)=>{ done(null, newChatUser)})
            .catch((error)=>{ console.log(error)});
        }
      });
  };
  passport.use(new FacebookStrategy(config.fb, authProcessor));
};
