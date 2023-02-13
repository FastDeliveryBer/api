import { Admin } from '../schemas/schema.admin.js'
import Model from '../models/model.js'
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'

export default class AdminMdl extends Model {
  queryCreateAdmin = async (firstname, lastname, email, password, phone) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const ID = new ObjectId()
      let admin = new Admin({
        id: ID,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword,
        phone: phone,
      })
      await admin.save()
      return admin
    } catch (error) {
      throw error
    }
  }

  queryGetAdmin = async (id) => {
    let query = {}
    if (id !== undefined) query = { id: id }

    try {
      let admin = await Admin.find(query)
      return admin
    } catch (error) {
      throw error
    }
  }

  queryUpdateAdmin = async (id, data) => {
    try {
      const admin = await Admin.findOneAndUpdate(
        { id: id },
        { $set: data },
        { new: true }
      )
      return admin
    } catch (error) {
      throw error
    }
  }

  queryDeleteAdmin = async (id) => {
    try {
      const admin = await Admin.findOneAndDelete({ id: id })
      return admin
    } catch (error) {
      throw error
    }
  }

  didAdminAlreadyExiste = async (label, value) => {
    const query = { [label]: value }

    try {
      const adminExist = await Admin.exists(query)
      return adminExist
    } catch (error) {
      throw error
    }
  }

  didAdminIsFree = async (adminid, date) => {
    const query = { adminid: adminid, date: date }

    try {
      const adminExist = await Admin.exists(query)
      return adminExist
    } catch (error) {
      throw error
    }
  }

  didEmailAdminAlreadyExiste = async (id, email) => {
    const query = {
      id: { $ne: id },
      email: email,
    }

    try {
      const adminExist = await Admin.exists(query)
      return adminExist
    } catch (error) {
      throw error
    }
  }
}
