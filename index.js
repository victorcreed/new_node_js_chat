var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var connectCounter = 0;
app.get('/', function(req, res){
  res.sendfile('templates/index.html');
});

io.on('connection', function(socket){
  connectCounter++;
  io.emit("online users", connectCounter);
  console.log(connectCounter);
  socket.on('disconnect', function(){
    connectCounter--;
    console.log("disconnected user count", connectCounter);
    io.emit("online users", connectCounter);
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

