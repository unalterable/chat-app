import http from 'http';
import express from 'express';
import socketIO from 'socket.io';
import uuid from 'uuid/v4';
import indexController from './controllers/index.js';

const app = express();
const server = http.Server(app);
const sockets = socketIO(server);
const port = 3000;

app.use('/assets', express.static('assets'));

app.get('/', indexController.showIndex)
app.get('/data', indexController.showData)

sockets.on('connection', (socket) => {
  socket.emit('chat-id-assignment', uuid());
  socket.on('chat-message', msg => {
    console.log('New Msg. From:', msg.sender); console.log(msg.text);
    sockets.emit('chat-message', msg)
  })
})

server.listen(port, () => console.log(`App listening on port ${port}`));
