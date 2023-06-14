const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');
const express = require('express');
const app = express();
const indexRouter = require('./')

const server = http.createServer(app);

// app.get('/', (req, res) => {
//   fs.readFile('HTMLPage.html', (error, data) => {
//     res.writeHead(200, { 'Content-Type' : 'text/html'});
//     res.end(data);
//   });
// })
server.listen(3000, () => {
  console.log('Server Running at http://127.0.0.1:3000');
});

const io = socketio.listen(server);
io.sockets.on('connection', (socket) => {
  //message
  const roomName = null;
  socket.on('join', (data) => {
    roomName = data;
    socket.join(data);
  })
  socket.on('message', (data) => {
    io.socket.in(roomName).emit('message', data);
    console.log(data);
  })
})