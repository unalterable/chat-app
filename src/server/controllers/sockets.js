module.exports = ({ io, room: roomDomain }) => ({
  authoriseChatConnection: async (socket, next) => {
    try {
      const roomId = socket.request._query.roomId;
      const userId = socket.request._query.userId;
      const user = { userId, name: 'bob' };
      const room = await roomDomain.getById(roomId);
      if(!room) {
        throw Error(`User (${userId}) tried to access non-existent room (${roomId})`)
      }
      if(!room.members.includes(user.userId)){
        throw Error(`User (${userId}) tried to access room (${roomId}) but is not a memeber`);
      }
      socket.request.user = user;
      socket.request.room = room;
      next();
    } catch (e) {
      console.error(e)
      next(e);
    }
  },
  onConnection: async socket => {
    try {
      const user = socket.request.user;
      const room = socket.request.room;
      socket.join(room.roomId);
      console.log(`user ${user.userId} joined room ${room.roomId}`)
      socket.on('chat-message-to-server', msg => {
        console.log('New Message', room.roomId, msg)
        io.to(room.roomId).emit('chat-message-to-clients', { sender: user.name, text: msg.text })
      })
    } catch (e) {
      console.error(e)
    }
  },
})
