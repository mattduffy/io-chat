'use strict';
const express = require('express'),
  app = express(),
  chatcat = require('./app');

let port = process.env.PORT || 3000;
app.set('port', port);
app.set('view engine', 'ejs');
app.use(express.static('public'));

// register first of possibly many sub app routers
// this is mounted at root /
app.use('/', chatcat.router);
//app.use('/dashboard', dashboard.router);
//app.use('/api', api.router);

app.listen(port, ()=>{
  console.log("Chat cat listening on port ", port);
});
