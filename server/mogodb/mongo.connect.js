import mongoose from 'mongoose'

export default class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance
    }
    this._connect()
    Database.instance = this
  }

  _connect() {
    mongoose.set('strictQuery', false)
    mongoose
      .connect(
        `${process.env.MONGODB_URI}${process.env.DB_NAME}?retryWrites=true&w=majority`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => {
        console.log('Database connection successful')
      })
      .catch((err) => {
        console.error('Database connection error')
      })
  }
}
