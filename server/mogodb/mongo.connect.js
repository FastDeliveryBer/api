import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

/* const MongoClient = require('mongodb').MongoClient
const uri =
  'mongodb+srv://kay:myRealPassword@cluster0.mongodb.net/test?w=majority'

const client = new MongoClient(uri, { useNewUrlParser: true }) */
client.connect((err) => {
  const collection = client.db('test').collection('devices')
  // perform actions on the collection object
  client.close()
})
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
