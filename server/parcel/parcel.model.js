import { Parcel } from '../schemas/schema.parcel.js'
import Model from '../models/model.js'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { ObjectId } from 'mongodb'

export default class ParcelMdl extends Model {
  generateTrackingID = () => {
    return uuidv4()
  }

  getImageAndConvertToBinary = async (imageUrl) => {
    try {
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
      })
      const imageData = new Buffer.from(response.data, 'binary').toString(
        'base64'
      )
      return imageData
    } catch (error) {
      throw error
    }
  }

  queryCreateParcel = async (
    customerid,
    delivery_date,
    address_expedition,
    address_delivery,
    weight,
    width,
    length,
    height,
    price,
    is_fragile,
    is_emergency
  ) => {
    try {
      const trackingid = this.generateTrackingID()

      /* const imageUrl =
        'https://pbs.twimg.com/profile_images/1526507008505126912/KLpm9_UY_400x400.jpg'
      const imageData = await this.getImageAndConvertToBinary(imageUrl)
 */
      const ID = new ObjectId()
      let parcel = new Parcel({
        id: ID,
        trackingid: trackingid,
        customerid: customerid,
        delivery_date: delivery_date,
        address_expedition: address_expedition,
        address_delivery: address_delivery,
        weight: weight,
        width: width,
        length: length,
        height: height,
        price: price,
        is_fragile: is_fragile,
        is_emergency: is_emergency,
      })

      await parcel.save()
      return parcel
    } catch (error) {
      throw error
    }
  }

  queryGetParcel = async (filteredData) => {
    let query = filteredData
    try {
      let parcel = await Parcel.find(query)
      return parcel
    } catch (error) {
      throw error
    }
  }

  queryUpdateParcel = async (id, data) => {
    try {
      const parcel = await Parcel.findOneAndUpdate(
        { id: id },
        { $set: data },
        { new: true }
      )
      return parcel
    } catch (error) {
      throw error
    }
  }

  queryDeleteParcel = async (id) => {
    try {
      const parcel = await Parcel.findOneAndDelete({ id: id })
      return parcel
    } catch (error) {
      throw error
    }
  }

  didParcelAlreadyExiste = async (label, value) => {
    const query = { [label]: value }

    try {
      const parcelExist = await Parcel.exists(query)
      return parcelExist
    } catch (error) {
      throw error
    }
  }

  queryGetParcelLastDelivered = async (filteredData) => {
    let query = filteredData
    try {
      let parcel = await Parcel.find(query)
      return parcel
    } catch (error) {
      throw error
    }
  }
}
