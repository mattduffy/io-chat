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
  //console.log("h.findRoomById: ", allrooms[findRoom]);
  return allrooms[findRoom];
};

// Add a user to a chatroom
let addUserToRoom = (allrooms, data, socket)=>{
  //Get the room obj

  let getRoom = findRoomById(allrooms, data.roomId);
  if(undefined !== getRoom) {
    // Get the active user's ID (ObjectID from the session).
    let userId = socket.request.session.passport.user;
    //Check to see if user already exists in the chatroom.
    let checkUser = getRoom.users.findIndex((element, index, array)=>{
      if(userId === element.userId) {
        return true;
      } else {
        return false;
      }
    });
    // If the user is already present in the room, remove first.
    if(checkUser > -1) {
      getRoom.users.splice(checkUser, 1);
    }
    // Push the user into the chat room.
    getRoom.users.push({
      socketId: socket.id,
      userId,
      user: data.user,
      userPic: data.userPic
    });
    // Join the room channel
    socket.join(data.roomId);
    return getRoom;
  }
};

//Remove a user from a chatroom
let removeUserFromRoom = (allrooms, socket)=>{
  for(let room of allrooms){
    //Find the user
    let findUser = room.users.findIndex((element, index, array)=>{
      if(socket.id === element.users.socketId) {
        return true;
      } else {
        return false;
      }
    });
    if(findUser > -1){
      socket.leave(room.roomId);
      room.users.splice(findUser, 1);
      return room;
    }
  }
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
  addUserToRoom,
  removeUserFromRoom,
  randomHex
}
