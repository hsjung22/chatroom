var io = require('socket.io').listen(parseInt(process.env.PORT || 8000));


  // io.set("transports", ["xhr-polling"]); 
  // io.set("polling duration", 10); 

io.sockets.on('connection', function (socket) {
    console.log(socket.id + " has connected");
  
  socket.on('disconnect', function () {
    io.sockets.emit('user disconnected');
    console.log(socket.id + " has disconnected");
  });


  socket.on('join_room', function (room){
    socket.room = room
    socket.join(room);
  });

  socket.on('send_message', function (message){
    io.to(socket.room).emit("chat-sent", message);
    console.log(socket.room);
  });

  socket.on('leaving_room', function (room){
    console.log('this is room', room);
    socket.leave(room);
  })
});