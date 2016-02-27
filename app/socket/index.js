'use strict';
const h = require('../helpers');

module.exports = (io, app)=>{
  let allrooms = app.locals.chatrooms;

  io.of('/roomlist').on('connection', (socket)=>{
    console.log("client has connected. ");
    socket.on('getChatrooms', ()=>{
      socket.emit('chatRoomsList', JSON.stringify(allrooms));
    });
    socket.on('createNewRoom', (data)=>{
      console.log(data);
      if(!h.findRoomByName(allrooms, data.newRoom)){
        allrooms.push({
          'room': data.newRoom,
          'roomId': h.randomHex(),
          'users': []
        });
        // Emit updated room list to room creator.
        socket.emit('chatRoomsList', JSON.stringify(allrooms));
        // Emit update room list to all other chatcat users.
        socket.broadcast.emit('chatRoomsList', JSON.stringify(allrooms));
      } else {
        // Room name is already in use.
        socket.emit('err', {
          'msg': `"${data.newRoom} is already in use. Pick a new room name."`
        });
      }
    });
  });
};
