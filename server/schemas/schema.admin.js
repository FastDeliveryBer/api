import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const admin = new mongoose.Schema({
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
})

const Admin = mongoose.model('admin', admin)

export { Admin }
