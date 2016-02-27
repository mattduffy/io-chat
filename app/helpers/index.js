'use strict';
const router = require('express').Router()
  , db = require('../db')
  , crypto = require('crypto');

// Iterate through the routes object to register each route with the express Router.
let _registerRoutes = (routes, method)=>{
  for(let key in routes) {
    if('object'===typeof routes[key] && null!==routes[key] && !(routes[key] instanceof Array)){
      _registerRoutes(routes[key], key);
    } else {
      // register the routes here
      if('get'===method) {
        router.get(key, routes[key]);
      } else if('post'===method) {
        router.post(key, routes[key]);
      } else {
        router.use(routes[key]);
      }
    }
  }
};

let route = routes => {
  _registerRoutes(routes);
  return router;
};

// find a single user by id
let findOne = (profileId)=>{
  return db.userModel.findOne({
    'profileId': profileId
  });
};

// create a new user and return that instance
let createNewUser = (profile)=>{
  return new Promise((resolve, reject)=>{
    let newChatUser = new db.userModel({
      profileId: profile.id,
      fullName: profile.displayName,
      profilePic: profile.photos[0].value || ''
    });
    newChatUser.save((error)=>{
      if(error) {
        console.log(error);
        reject(error);
      } else {
        resolve(newChatUser);
      }
    });
  });
};

// The ES6 promisified version of findById
let findById = (id)=>{
  return new Promise((resolve, reject)=>{
    db.userModel.findById(id, (error, user)=>{
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
};

// Middleware function that checks to see if a user is authenticted or not.
let isAuthenticated = (req, res, next)=>{
  if(req.isAuthenticated()){
    next();
  } else {
    res.redirect('/');
  }
};

// Find a chatroom by a given name.
let findRoomByName = (allrooms, room)=>{
  let findRoom = allrooms.findIndex((element, index, array)=>{
    if(room == element.room){
      return true;
    } else {
      return false;
    }
  });
  return findRoom > -1 ? true : false;
};

// Find a chatroom by a given id.
let findRoomById = (allrooms, id)=>{
  let findRoom = allrooms.findIndex((element, index, array)=>{
    if(id == element.roomId){
      return element;
    } else {
      return null;
    }
  });
  return allrooms[findRoom];
};

// A function that generates a unique room id
let randomHex = ()=>{
  return crypto.randomBytes(24).toString('hex');
};

module.exports = {
  // ES6 shorthand key:val obj notation for route = routes
  route,
  findOne,
  createNewUser,
  findById,
  isAuthenticated,
  findRoomByName,
  findRoomById,
  randomHex
}
