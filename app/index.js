'use strict';
const cfg = require('./config');
require('./auth')(cfg);

let ioServer = (app)=>{
  app.locals.chatrooms = [];
  const server = require('http').Server(app);
  const io = require('socket.io')(server);
  io.use((socket, next)=>{
    require('./session')(socket.request, {}, next);
  });
  require('./socket')(io, app);
  return server;
};

module.exports = {
  config: cfg,
  router: require('./routes')(cfg),
  session: require('./session'),
  ioServer
};
