import MongoDB from '../mogodb/mongo.connect.js'
import { Deliverer } from './../schemas/schema.deliverer.js'
import Model from './../models/model.js'
import bcrypt from 'bcrypt'

export default class DelivererMdl extends Model {
  queryCreateDeliverer = async (
    firstname,
    lastname,
    email,
    password,
    phone,
    langage
  ) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      let deliverer = new Deliverer({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword,
        phone: phone,
        language: langage,
      })
      await deliverer.save()
      return deliverer
    } catch (error) {
      throw error
    }
  }

  queryGetDeliverer = async (id) => {
    let query = {}
    if (id !== undefined) query = { _id: id }

    try {
      let deliverer = await Deliverer.find(query)
      return deliverer
    } catch (error) {
      throw error
    }
  }

  queryUpdateDeliverer = async (id, data) => {
    try {
      const deliverer = await Deliverer.findOneAndUpdate(
        { _id: id },
        { $set: data },
        { new: true }
      )
      return deliverer
    } catch (error) {
      throw error
    }
  }

  queryDeleteDeliverer = async (id) => {
    try {
      const deliverer = await Deliverer.findOneAndDelete({ _id: id })
      return deliverer
    } catch (error) {
      throw error
    }
  }

  didDelivererAlreadyExiste = async (label, value) => {
    const query = { [label]: value }

    try {
      const delivererExist = await Deliverer.exists(query)
      return delivererExist
    } catch (error) {
      throw error
    }
  }

  didDelivererIsFree = async (deliverer_id, date) => {
    const query = { deliverer_id: deliverer_id, date: date }

    try {
      const delivererExist = await Deliverer.exists(query)
      return delivererExist
    } catch (error) {
      throw error
    }
  }

  didEmailDelivererAlreadyExiste = async (id, email) => {
    const query = {
      _id: { $ne: id },
      email: email,
    }

    try {
      const delivererExist = await Deliverer.exists(query)
      return delivererExist
    } catch (error) {
      throw error
    }
  }
}
