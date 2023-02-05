import mongoose from 'mongoose'

const round = new mongoose.Schema({
  deliverer_id: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
    default: 'pending',
  },
  parcels: [
    {
      type: String,
      required: true,
      unique: true,
    },
  ],
})

const Round = mongoose.model('round', round)

export { Round }
