import initStore from '../store.js';
import initRoomDomain from './room.js';

module.exports = async () => {
  const store = await initStore('chat-app');
  return {
    room: initRoomDomain({ roomCollection: store.roomCollection }),
  };
};
