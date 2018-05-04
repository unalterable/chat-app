import http from 'http';
import express from 'express';
import socketIO from 'socket.io';
import bodyParser from 'body-parser';
import store from './store.js';
import initDomain from './domain/index.js';
import initIndexController from './controllers/index.js';
import initApiController from './controllers/api.js';
import initSocketsController from './controllers/sockets.js';

module.exports = async() => {
  const app = express();
  const server = http.Server(app);
  const io = socketIO(server);
  const port = 3000;

  const { room } = await initDomain();

  const indexController = initIndexController();
  const apiController = initApiController({ room });
  const socketsController = initSocketsController({ io, room })

  app.use(bodyParser.json());
  app.use('/assets', express.static('assets'));

  app.get('/', indexController.showIndex)
  app.post('/rooms/new', apiController.createRoom);

  io.use(socketsController.authoriseChatConnection)
  io.on('connection', socketsController.onConnection)

  server.listen(port, () => console.log(`App listening on port ${port}`));

}
