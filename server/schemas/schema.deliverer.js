import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const deliverer = new mongoose.Schema({
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
  phone: {
    type: Number,
    required: true,
  },
  langage: {
    type: String,
    required: true,
    default: 'FR',
  },
})

const Deliverer = mongoose.model('deliverer', deliverer)

export { Deliverer }
