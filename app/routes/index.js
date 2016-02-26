'use strict';
const router = require('express').Router(),
  h = require('../helpers');

module.exports = ()=>{
  // GET Routes
  router.get('/', (req, res, next)=>{
    res.render('login', {
      'pageTitle': "this sucks"
    });
  });
  router.get('/rooms', (req, res, next)=>{
    res.render('rooms', {});
  });
  router.get('/chatroom/:id', (req, res, next)=>{
    res.render('chatroom', {});
  });
  router.get('/getsession', (req, res, next)=>{
    res.send('My favorite color: ' + req.session.favColor);
  });
  router.get('/setsession', (req, res, next)=>{
    req.session.favColor = req.query['color'] || 'blue';
    console.log("req query: ", req.query);
    console.log("req params: ", req.params);
    res.send("My favorite color has been set.");
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
