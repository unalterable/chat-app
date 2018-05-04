module.exports = ({ room }) => ({
  createRoom: async (req, res, next) => {
    const newRoom = await room.insert({
      members: req.body.members
    })
    res.json(newRoom)
  }
});
