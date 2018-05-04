module.exports = ({ roomCollection, messageCollection }) => {
  const recordMessage = async ({ room, sender, text }) => {
    return messageCollection.insert({ room, sender, text });
  }
  const insert = async ({ members }) => {
    const { ops: [ newRoom ] } = await roomCollection.insert({ members });
    return newRoom;
  }
  return {
    getById: roomCollection.getById,
    insert,
  };
}
