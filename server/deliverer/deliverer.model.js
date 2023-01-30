import MongoDB from '../mogodb/mongo.connect.js'

export default class DelivererMdl {
  static connect = async () => {
    let db = new MongoDB()

    const query = { username: 'theo test' }

    try {
      let userConnect = await db.connect('users')
      let data = await userConnect.findOne(query, {})
      await db.disconnect()
      return data
    } catch (error) {
      await db.disconnect()
      throw error
    }
  }
}
