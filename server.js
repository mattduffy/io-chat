'use strict';
const config = require('./app/config')
  , chatcat = require('./app')
  , express = require('express')
  , app = express()
  , passport = require('passport')

console.log(config);

let port = process.env.PORT || 3000;
app.set('port', port);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('node_modules/babel-standalone'));
app.use(chatcat.session);
app.use(passport.initialize());
app.use(passport.session());
// register first of possibly many sub app routers
// this is mounted at root /
app.use('/', chatcat.router);
//app.use('/dashboard', dashboard.router);
//app.use('/api', api.router);

chatcat.ioServer(app).listen(port, ()=>{
  console.log("Chat cat listening on port ", port);
});
