import mongoose from 'mongoose'

const user = new mongoose.Schema({
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
  language: {
    type: String,
    required: true,
    default: 'en',
  },
  token: {
    type: String,
    required: true,
  },
})

const captain = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
})

const User = mongoose.model('users', user)
const Captain = mongoose.model('captain', captain)

export { User, Captain }
