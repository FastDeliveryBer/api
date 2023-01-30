import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()
export default class MongoDB {
  static URI = process.env.MONGODB_URI || ''
  static DB = process.env.DB_NAME

  constructor() {
    let client = new MongoClient(MongoDB.URI, { useNewUrlParser: true })
    this.client = client
  }

  connect = async (collection) => {
    await this.client.connect()
    return this.client.db(MongoDB.DB).collection(collection)
  }

  disconnect = async () => {
    await this.client.close()
  }
}
