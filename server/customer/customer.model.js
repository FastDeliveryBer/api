import { Customer } from '../schemas/schema.customer.js'
import Model from '../models/model.js'
import bcrypt from 'bcrypt'

export default class CustomerMdl extends Model {
  queryCreateCustomer = async (firstname, lastname, email, password, phone) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      let customer = new Customer({
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
        { _id: id },
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
      const customer = await Customer.findOneAndDelete({ _id: id })
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
