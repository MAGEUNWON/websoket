// const express = require('express')
// const WebSocket = require('ws')
// const app = express();
// const server = http.createServer(app); // 웹서버 생성
// const wss = new WebSocket.Server({ server }); //웹소켓 서버 호출

// app.use(express.static("public"));

// server.listen(3000, () => console.log("Listening on http://localhost:3000")); 

// app.listen(8080, () => {
//   console.log('http://localhost:8080 에 연결 ')
// });

// // const WebSocket = require('ws');

// // const wss = new WebSocket({
// //   port : 8081 // 유저가 요청하면 이 경로로 웹소켓 연결해 줌
// // });

// wss.on('connection', (socket) => {

//   ws.on('message', msg => {
//     console.log('유저가 보낸것 : ' + msg )
//     ws.send('안녕!') // 서버가 유저에게 보내는 msg
//   })
// });
const express = require('express')
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const port = 3000;

app.use(express.static(__dirname + "/public"));

http.listen(port, () => {
  console.log("listening on *:" + port);
});

io.on('connection', socket => {
  console.log(socket.id, 'Connected');

  socket.emit('msg', `${socket.id} 연결 되었습니다.`);

  socket.on('msg', data => {
    console.log(socket.id, data);

    socket.emit('msg', `Server : "${data}" 받았습니다.`);
  });
});