module.exports = {
  async up(db, client) {
    await db.collection('friendChatLists').rename('friendChats')
  },

  async down(db, client) {
    await db.collection('friendChats').rename('friendChatLists')
  }
};
