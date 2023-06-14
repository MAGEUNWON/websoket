const http = require('http');
const socketio = require('socket.io');
const express = require('express');
const app = express();

// 웹 서버 생성
const server = http.createServer(app);

app.use(express.static(__dirname + "/public"))

server.listen(3000, () => {
  console.log('Server Running at http://localhost:3000');
});

const io = socketio(server);
io.sockets.on('connection', (socket) => {
  //message
  let roomName = null;
  socket.on('join', (data) => {
    roomName = data;
    socket.join(data);
  })
  socket.on('message', (data) => {
    io.sockets.in(roomName).emit('message', data);
    console.log(data);
  })
})