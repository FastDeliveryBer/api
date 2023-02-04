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

  queryGetDeliverer = async () => {
    const query = {}

    try {
      let deliverer = await Deliverer.find()
      return deliverer
    } catch (error) {
      throw error
    }
  }

  queryUpdateDeliverer = async (email, data) => {
    try {
      const deliverer = await Deliverer.findOneAndUpdate(
        { email: email },
        { $set: data },
        { new: true }
      )
      return deliverer
    } catch (error) {
      throw error
    }
  }

  didDelivererAlreadyExiste = async (email) => {
    const query = { email: email }

    try {
      const delivererExist = await Deliverer.exists(query)
      return delivererExist
    } catch (error) {
      throw error
    }
  }
}
