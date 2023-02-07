import express from 'express'
import Database from '../mogodb/mongo.connect.js'
import CustomerMdl from './customer.model.js'
import ClassCtrl from '../controller/class.controller.js'

const { Request, Response } = express

export default class CustomerCtrl extends ClassCtrl {
  static create = async (req = Request, res = Response) => {
    let code = 404
    let response = {
      error: true,
      message: 'Bad request',
      data: [],
    }
    if (Object.keys(req.body).length > 0) {
      let dataIpt = [
        { label: 'lastname', type: 'string' },
        { label: 'firstname', type: 'string' },
        { label: 'email', type: 'email' },
        { label: 'phone', type: 'number' },
        { label: 'password', type: 'string' },
      ]
      let listError = this.verifSecure(dataIpt, req.body)

      if (listError.length > 0) {
        response.message = 'Erreur'
        response.data.push(listError)
      } else {
        try {
          const { firstname, lastname, email, password, phone } = req.body
          const db = await new Database()
          const customerMdl = new CustomerMdl(db)
          const customerAlreadyExist =
            await customerMdl.didCustomerAlreadyExiste('email', email)
          response.message = 'Email déjà utilisée'

          if (!customerAlreadyExist) {
            const customer = await customerMdl.queryCreateCustomer(
              firstname,
              lastname,
              email,
              password,
              phone
            )
            response.message = 'Impossible de créer le client'
            if (customer) {
              response.message = 'Client créé'
              response.error = false
              response.data.push(customer)
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

  static get = async (req = Request, res = Response) => {
    let code = 404
    let response = {
      error: true,
      message: 'Bad request',
      data: [],
    }
    let listErrorOption = []

    if (req.query !== '') {
      let dataOption = [{ label: '_id', type: 'objectid' }]
      listErrorOption = this.verifWithOption(dataOption, req.query, true)
    }
    if (listErrorOption > 0) {
      response.message = 'Erreur'
      response.data.push(listErrorOption)
    }
    {
      try {
        const db = await new Database()
        const customerMdl = new CustomerMdl(db)
        const filteredData = Object.entries(req.query).reduce(
          (obj, [key, value]) => {
            if (['_id'].includes(key)) {
              obj[key] = value
            }
            return obj
          },
          {}
        )
        const customer = await customerMdl.queryGetCustomer(filteredData)
        response.message = 'Aucun client'
        if (customer.length > 0) {
          response.message = 'Client récupéré(s)'
          response.error = false
          response.data = customer
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
    let code = 404
    let response = {
      error: true,
      message: 'Bad request',
      data: [],
    }
    if (
      Object.keys(req.body).length > 0 &&
      Object.keys(req.params).length > 0
    ) {
      let dataIpt = [{ label: '_id', type: 'string' }]
      let dataOption = [
        { label: 'email', type: 'email' },
        { label: 'lastname', type: 'string' },
        { label: 'firstname', type: 'string' },
        { label: 'phone', type: 'number' },
      ]
      let listError = this.verifSecure(dataIpt, req.params)
      let listErrorOption = this.verifWithOption(dataOption, req.body, true)

      if (listError.length > 0 || listErrorOption > 0) {
        response.message = 'Erreur'
        response.data.push(listError)
        response.data.push(listErrorOption)
      } else {
        try {
          const db = await new Database()
          const customerMdl = new CustomerMdl(db)
          const { _id } = req.params
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
            await customerMdl.didCustomerAlreadyExiste('_id', _id)
          response.message = "Ce client n'existe pas"
          if (customerAlreadyExist) {
            const customer = await customerMdl.queryUpdateCustomer(
              _id,
              filteredData
            )
            response.message = 'Impossible de modifier le client'

            if (customer) {
              response.message = 'Client modifié'
              response.error = false
              response.data.push(customer)
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
    let code = 404
    let response = {
      error: true,
      message: 'Bad request',
      data: [],
    }
    if (Object.keys(req.params).length > 0) {
      const dataIpt = [{ label: '_id', type: 'objectid' }]
      const listError = this.verifSecure(dataIpt, req.params)

      if (listError.length > 0) {
        response.message = 'Erreur'
        response.data.push(listError)
      } else {
        try {
          const db = await new Database()
          const customerMdl = new CustomerMdl(db)
          const { _id } = req.params
          const customerAlreadyExist =
            await customerMdl.didCustomerAlreadyExiste('_id', _id)
          response.message = 'Client inexistant'
          if (customerAlreadyExist) {
            const customer = await customerMdl.queryDeleteCustomer(_id)
            response.message = 'Impossible de supprimer le client'
            if (customer) {
              response.message = 'Client supprimé'
              response.error = false
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
}
