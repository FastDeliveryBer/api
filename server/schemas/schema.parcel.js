import mongoose from 'mongoose'

const parcel = new mongoose.Schema({
  tracking_id: {
    type: String,
    required: true,
    unique: true,
  },
  customer_id: {
    type: String,
    required: true,
    unique: false,
  },
  delivery_date: {
    type: String,
    required: true,
  },
  address_expedition: {
    type: String,
    required: true,
  },
  address_delivery: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  is_fragile: {
    type: Boolean,
    required: true,
  },
  is_emergency: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    required: false,
    default: 'to attribute',
  },
  longitude: {
    type: String,
    required: false,
  },
  latitude: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  proof_of_delivery: [
    {
      type: Buffer,
      required: false,
    },
  ],
})

const Parcel = mongoose.model('parcel', parcel)

export { Parcel, parcel }
