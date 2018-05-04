const MongoClient = require('mongodb').MongoClient;
const _  = require('lodash');
const uuid = require('uuid/v4');
const url = 'mongodb://localhost:27017/';

const initStoreActions = async dbName => {
  const connection = await MongoClient.connect(url)
  const db = connection.db(dbName);
  const room = db.collection('room');
  const messages = db.collection('messages');
  return {
    connection: connection,
    roomCollection: {
      getById: roomId => room.findOne({ roomId }),
      insert: ({ members }) => room.insert({
        roomId: uuid(),
        members,
        dateCreated: Date.now()
      }),
    },
    messageCollection: {
      findByRoomId: roomId => room.find({ roomId }).toArray(),
      insert: ({ room, sender, text }) => room.insert({
        messageId: uuid(),
        room,
        sender,
        text,
        timestamp: Date.now(),
      }),
    },
};
};

module.exports = initStoreActions;
