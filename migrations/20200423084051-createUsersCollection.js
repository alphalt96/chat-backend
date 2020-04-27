module.exports = {
  async up(db, client) {
    await db.createCollection('users', {
      autoIndexId: true
    })
    await db.collection('users').createIndex({
      username: 1
    })

    await db.createCollection('friends', {
      autoIndexId: true
    })
    await db.createCollection('friendChatLists', {
      autoIndexId: true
    })
    await db.createCollection('messages', {
      autoIndexId: true
    })
  },

  async down(db, client) {
    await db.collection('users').drop()
    await db.collection('friends').drop()
    await db.collection('friendChatLists').drop()
    await db.collection('messages').drop()
  }
};
