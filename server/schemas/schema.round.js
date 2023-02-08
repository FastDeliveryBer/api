import mongoose from 'mongoose'

const round = new mongoose.Schema({
  deliverer_id: { type: mongoose.Schema.Types.ObjectId, required: true },
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
