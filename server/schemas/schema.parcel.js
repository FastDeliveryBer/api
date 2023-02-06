import mongoose from 'mongoose'

const parcel = new mongoose.Schema({
  tracking_id: {
    type: String,
    required: true,
    unique: true,
  },
  /* delivery_date: {
    type: Date,
    required: true,
  }, */
  customer_id: {
    type: String,
    required: false,
    unique: true,
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
    type: String,
    required: true,
  },
  width: {
    type: String,
    required: true,
  },
  length: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  fragile: {
    type: Boolean,
    required: true,
  },
  is_emergency: {
    type: Boolean,
    required: true,
    default: false,
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
  amount: {
    type: String,
    required: false,
  },
  preuve_livraison: [
    {
      type: Buffer,
      required: false,
    },
  ],
})

const Parcel = mongoose.model('parcel', parcel)

export { Parcel, parcel }
