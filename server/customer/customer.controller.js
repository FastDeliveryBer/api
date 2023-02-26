import express from 'express'
import Database from '../mogodb/mongo.connect.js'
import CustomerMdl from './customer.model.js'
import ClassCtrl from '../controller/class.controller.js'

const { Request, Response } = express

export default class CustomerCtrl extends ClassCtrl {
  static create = async (req = Request, res = Response) => {
    let code = 400
    let response
    if (Object.keys(req.body).length > 0) {
      let dataIpt = [
        { label: 'lastname', type: 'string' },
        { label: 'firstname', type: 'string' },
        { label: 'email', type: 'email' },
        { label: 'phone', type: 'string' },
        { label: 'password', type: 'string' },
      ]
      let listError = this.verifSecure(dataIpt, req.body)
      console.log(listError)
      if (listError.length === 0) {
        try {
          const { firstname, lastname, email, password, phone } = req.body
          const db = await new Database()
          const customerMdl = new CustomerMdl(db)
          const customerAlreadyExist =
            await customerMdl.didCustomerAlreadyExiste('email', email)

          if (!customerAlreadyExist) {
            const customer = await customerMdl.queryCreateCustomer(
              firstname,
              lastname,
              email,
              password,
              phone
            )
            if (customer) {
              const { password, ...customerWithoutPassword } = customer._doc
              response = customerWithoutPassword
              code = 201
            }
          }
        } catch (error) {
          console.log(error)
          res.status(400).send(error)
        }
      }
    }
    res.status(code).send(response)
  }

  static get = async (req = Request, res = Response) => {
    let code = 400
    let response = {}
    let listErrorOption = []

    if (req.query['id'] !== undefined) {
      let dataOption = [{ label: 'id', type: 'objectid' }]
      listErrorOption = this.verifWithOption(dataOption, req.query, true)
    }
    if (listErrorOption === 0) {
      try {
        code = 404
        const db = await new Database()
        const customerMdl = new CustomerMdl(db)
        const filteredData = Object.entries(req.query).reduce(
          (obj, [key, value]) => {
            if (['id'].includes(key)) {
              obj[key] = value
            }
            return obj
          },
          {}
        )
        const customer = await customerMdl.queryGetCustomer(filteredData)
        if (customer.length > 0) {
          response = [...customer]
          code = 200
        }
      } catch (error) {
        console.log(error)
        res.status(400).send(error)
      }
    }
    res.status(code).send(response)
  }

  static update = async (req = Request, res = Response) => {
    let code = 400
    let response
    if (
      Object.keys(req.body).length > 0 &&
      Object.keys(req.params).length > 0
    ) {
      let dataIpt = [{ label: 'id', type: 'string' }]
      let dataOption = [
        { label: 'email', type: 'email' },
        { label: 'lastname', type: 'string' },
        { label: 'firstname', type: 'string' },
        { label: 'phone', type: 'phone' },
      ]
      let listError = this.verifSecure(dataIpt, req.params)
      let listErrorOption = this.verifWithOption(dataOption, req.body, true)

      if (listError.length === 0 || listErrorOption === 0) {
        try {
          code = 404
          const db = await new Database()
          const customerMdl = new CustomerMdl(db)
          const { id } = req.params
          const filteredData = Object.entries(req.body).reduce(
            (obj, [key, value]) => {
              if (
                ['firstname', 'lastname', 'phone', 'langage', 'email'].includes(
                  key
                )
              ) {
                obj[key] = value
              }
              return obj
            },
            {}
          )
          const customerAlreadyExist =
            await customerMdl.didCustomerAlreadyExiste('id', id)
          if (customerAlreadyExist) {
            const customer = await customerMdl.queryUpdateCustomer(
              id,
              filteredData
            )
            code = 400
            if (customer) {
              response = customer
              code = 200
            }
          }
        } catch (error) {
          console.log(error)
          res.status(400).send(error)
        }
      }
    }
    res.status(code).send(response)
  }

  static delete = async (req = Request, res = Response) => {
    let code = 400
    let response
    if (Object.keys(req.params).length > 0) {
      const dataIpt = [{ label: 'id', type: 'objectid' }]
      const listError = this.verifSecure(dataIpt, req.params)

      if (listError.length === 0) {
        try {
          code = 404
          const db = await new Database()
          const customerMdl = new CustomerMdl(db)
          const { id } = req.params
          const customerAlreadyExist =
            await customerMdl.didCustomerAlreadyExiste('id', id)
          if (customerAlreadyExist) {
            code = 400
            const customer = await customerMdl.queryDeleteCustomer(id)
            if (customer) {
              code = 204
            }
          }
        } catch (error) {
          console.log(error)
          res.status(400).send(error)
        }
      }
    }
    res.status(code).send(response)
  }
}
