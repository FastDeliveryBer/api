import { Admin } from '../schemas/schema.admin.js'
import Model from '../models/model.js'
import bcrypt from 'bcrypt'

export default class AdminMdl extends Model {
  queryCreateAdmin = async (firstname, lastname, email, password, phone) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      let admin = new Admin({
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
    if (id !== undefined) query = { _id: id }

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
        { _id: id },
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
      const admin = await Admin.findOneAndDelete({ _id: id })
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

  didAdminIsFree = async (admin_id, date) => {
    const query = { admin_id: admin_id, date: date }

    try {
      const adminExist = await Admin.exists(query)
      return adminExist
    } catch (error) {
      throw error
    }
  }

  didEmailAdminAlreadyExiste = async (id, email) => {
    const query = {
      _id: { $ne: id },
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
