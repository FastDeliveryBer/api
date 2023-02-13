import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const round = new mongoose.Schema({
  id: {
    type: ObjectId,
    required: true,
    unique: true,
  },
  delivererid: { type: mongoose.Schema.Types.ObjectId, required: true },
  schelude_date: { type: String, required: true },
  status: {
    type: String,
    required: false,
    default: 'pending',
  },
  parcels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
  ],
})

const Round = mongoose.model('round', round)

export { Round }
