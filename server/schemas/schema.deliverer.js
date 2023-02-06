import mongoose from 'mongoose'

const deliverer = new mongoose.Schema({
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
