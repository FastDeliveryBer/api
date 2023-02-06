//import { Captain } from '../schemas/schema.captain.js'
import Model from '../models/model.js'
import bcrypt from 'bcrypt'

export default class CaptainMdl extends Model {
  queryCreateCaptain = async (firstname, lastname, email, password, phone) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      let captain = new Captain({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword,
        phone: phone,
      })
      await captain.save()
      return captain
    } catch (error) {
      throw error
    }
  }

  queryGetCaptain = async (id) => {
    let query = {}
    if (id !== undefined) query = { _id: id }

    try {
      let captain = await Captain.find(query)
      return captain
    } catch (error) {
      throw error
    }
  }

  queryUpdateCaptain = async (id, data) => {
    try {
      const captain = await Captain.findOneAndUpdate(
        { _id: id },
        { $set: data },
        { new: true }
      )
      return captain
    } catch (error) {
      throw error
    }
  }

  queryDeleteCaptain = async (id) => {
    try {
      const captain = await Captain.findOneAndDelete({ _id: id })
      return captain
    } catch (error) {
      throw error
    }
  }

  didCaptainAlreadyExiste = async (label, value) => {
    const query = { [label]: value }

    try {
      const captainExist = await Captain.exists(query)
      return captainExist
    } catch (error) {
      throw error
    }
  }

  didCaptainIsFree = async (captain_id, date) => {
    const query = { captain_id: captain_id, date: date }

    try {
      const captainExist = await Captain.exists(query)
      return captainExist
    } catch (error) {
      throw error
    }
  }

  didEmailCaptainAlreadyExiste = async (id, email) => {
    const query = {
      _id: { $ne: id },
      email: email,
    }

    try {
      const captainExist = await Captain.exists(query)
      return captainExist
    } catch (error) {
      throw error
    }
  }
}
