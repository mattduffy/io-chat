'use strict';
const router = require('express').Router();
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

module.exports = {
  // ES6 shorthand key:val obj notation for route = routes
  route
}
