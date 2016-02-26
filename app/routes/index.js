'use strict';
const router = require('express').Router(),
  h = require('../helpers');

module.exports = ()=>{

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
  router.post('/', (req, res, next)=>{

  });
  router.use('', (req, res, next)=>{
    res.status(404);
    res.render('404', {});
  })

  return router;

};
