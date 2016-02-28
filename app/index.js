'use strict';
const cfg = require('./config')
  , redis = require('redis').createClient
  , adapter = require('socket.io-redis')
  ;

require('./auth')(cfg);

let ioServer = (app)=>{
  app.locals.chatrooms = [];
  const server = require('http').Server(app);
  const io = require('socket.io')(server);
  io.set('transports', ['websocket']);
  let pubClient = redis(cfg.redis.port, cfg.redis.host, {
    auth_pass: cfg.redis.password
  });
  let subClient = redis(cfg.redis.port, cfg.redis.host, {
    return_buffers: true,
    auth_pass: cfg.redis.password
  });
  io.adapter(adapter({
    pubClient,
    subClient
  }));
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
