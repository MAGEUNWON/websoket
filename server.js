const express = require('express')
const { WebSocketServer } = require('ws')
const app = express();

app.use(express.static("public"));

app.listen(8080, () => {
  console.log('http://localhost:8080 에 연결 ')
});

// const WebSocket = require('ws');

const wss = new WebSocketServer({
  port : 8081 // 유저가 요청하면 이 경로로 웹소켓 연결해 줌
});

wss.on('connection', (ws, req) => {

  ws.on('message', msg => {
    console.log('유저가 보낸것 : ' + msg )
    ws.send('안녕!') // 서버가 유저에게 보내는 msg
  })
});