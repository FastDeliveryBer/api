import { Parcel } from '../schemas/schema.parcel.js'
import Model from '../models/model.js'
import { v4 as uuidv4 } from 'uuid'
import { compareSync } from 'bcrypt'

export default class ParcelMdl extends Model {
  generateTrackingID = () => {
    return uuidv4()
  }

  queryCreateParcel = async (
    /* delivery_date, */
    address_expedition,
    address_delivery,
    weight,
    width,
    length,
    height,
    fragile,
    emergency
  ) => {
    try {
      const tracking_id = this.generateTrackingID()
      let parcel = new Parcel({
        tracking_id: tracking_id,
        /* delivery_date: delivery_date, */
        address_expedition: address_expedition,
        address_delivery: address_delivery,
        weight: weight,
        width: width,
        length: length,
        height: height,
        fragile: fragile,
        emergency: emergency,
      })
      await parcel.save()
      return parcel
    } catch (error) {
      throw error
    }
  }

  queryGetParcel = async (tracking_id) => {
    let query = {}
    if (tracking_id !== undefined) query = { tracking_id: tracking_id }
    try {
      let parcel = await Parcel.find(query)
      return parcel
    } catch (error) {
      throw error
    }
  }

  queryUpdateParcel = async (tracking_id, data) => {
    try {
      const parcel = await Parcel.findOneAndUpdate(
        { tracking_id: tracking_id },
        { $set: data },
        { new: true }
      )
      return parcel
    } catch (error) {
      throw error
    }
  }

  queryDeleteParcel = async (tracking_id) => {
    try {
      const parcel = await Parcel.findOneAndDelete({ tracking_id: tracking_id })
      return parcel
    } catch (error) {
      throw error
    }
  }

  didParcelAlreadyExiste = async (tracking_id) => {
    const query = { tracking_id: tracking_id }

    try {
      const parcelExist = await Parcel.exists(query)
      return parcelExist
    } catch (error) {
      throw error
    }
  }
}
