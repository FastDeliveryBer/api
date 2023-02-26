import { Customer } from '../schemas/schema.customer.js'
import Model from '../models/model.js'
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'

export default class CustomerMdl extends Model {
  queryCreateCustomer = async (firstname, lastname, email, password, phone) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const ID = new ObjectId()
      let customer = new Customer({
        id: ID,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword,
        phone: phone,
      })

      await customer.save()
      return customer
    } catch (error) {
      throw error
    }
  }

  queryGetCustomerByEmail = async (email) => {
    let query = { email: email }

    try {
      let customer = await Customer.findOne(query)
      return customer
    } catch (error) {
      throw error
    }
  }

  queryGetCustomer = async (filteredData) => {
    let query = filteredData
    try {
      let customer = await Customer.find(query)
      return customer
    } catch (error) {
      throw error
    }
  }

  queryUpdateCustomer = async (id, data) => {
    try {
      const customer = await Customer.findOneAndUpdate(
        { id: id },
        { $set: data },
        { new: true }
      )
      return customer
    } catch (error) {
      throw error
    }
  }

  queryDeleteCustomer = async (id) => {
    try {
      const customer = await Customer.findOneAndDelete({ id: id })
      return customer
    } catch (error) {
      throw error
    }
  }

  didCustomerAlreadyExiste = async (label, value) => {
    const query = { [label]: value }

    try {
      const customerExist = await Customer.exists(query)
      return customerExist
    } catch (error) {
      throw error
    }
  }
}
