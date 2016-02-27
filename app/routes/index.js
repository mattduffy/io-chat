'use strict';
const router = require('express').Router()
  , h = require('../helpers')
  , passport = require('passport')

module.exports = (cfg)=>{
  // GET Routes
  router.get('/', (req, res, next)=>{
    res.render('login', {
      'pageTitle': "this sucks"
    });
  });
  router.get('/rooms', [h.isAuthenticated, (req, res, next)=>{
    res.render('rooms', {
      user: req.user,
      host: cfg.HOST,
      port: cfg.PORT
    });
  }]);
  router.get('/chatroom/:id', [h.isAuthenticated, (req, res, next)=>{
    res.render('chatroom', {
      user: req.user,
      topic: "Dynamic Text Here"
    });
  }]);
  router.get('/auth/facebook', passport.authenticate('facebook'));
  router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/rooms',
    failureRedirect: '/'
  }));
  router.get('/logout', (req, res, next)=>{
    req.logout();
    res.redirect('/');
  });

  // POST Routes
  router.post('/', (req, res, next)=>{

  });
  router.use('', (req, res, next)=>{
    res.status(404);
    res.render('404', {});
  })

  return router;

};
