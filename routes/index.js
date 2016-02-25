'use strict';
const router = require('express').Router();

module.exports = ()=>{
  let routes = {
    'get': {
      '/': (req, res, next)=>{
        res.render('login');
      },
      '/rooms': (req, res, next)=>{
        res.render('rooms');
      },
      '/chat/:id': (req, res, next)=>{
        res.render('chat');
      }
    },
    'post': {
      // nothing to see here
    }
  };
  // Iterate through the routes object to register each route with the express Router.
  let registerRoutes = (route, method)=>{
    for(let key in routes) {
      if('object'===typeof routes[key] && null!==routes[key] && !(routes[key] instanceof Array)){
        registerRoutes(routes[key], key);
      } else {
        // register the routes here
        if('get'===method) {
          router.get(key, routes[key]);
        }
        if('post'===method) {
          router.post(key, routes[key]);
        }
      }
    }
  };

  registerRoutes(router);
  return router;

};
