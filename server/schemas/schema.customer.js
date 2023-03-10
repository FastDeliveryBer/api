import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const customer = new mongoose.Schema({
  id: {
    type: ObjectId,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
})

const Customer = mongoose.model('customer', customer)

export { Customer }
