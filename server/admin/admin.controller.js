import express from 'express'
import Database from '../mogodb/mongo.connect.js'
import AdminMdl from './admin.model.js'
import ClassCtrl from '../controller/class.controller.js'

const { Request, Response } = express
export default class AdminCtrl extends ClassCtrl {
  static create = async (req = Request, res = Response) => {
    let code = 400
    let response
    if (Object.keys(req.body).length > 0) {
      let dataIpt = [
        { label: 'lastname', type: 'string' },
        { label: 'firstname', type: 'string' },
        { label: 'email', type: 'email' },
        { label: 'phone', type: 'number' },
        { label: 'password', type: 'string' },
      ]
      let listError = this.verifSecure(dataIpt, req.body)

      if (listError.length === 0) {
        try {
          const db = await new Database()
          const adminMdl = new AdminMdl(db)
          const { firstname, lastname, email, password, phone } = req.body

          const adminAlreadyExist = await adminMdl.didAdminAlreadyExiste(
            'email',
            email
          )
          if (!adminAlreadyExist) {
            const admin = await adminMdl.queryCreateAdmin(
              firstname,
              lastname,
              email,
              password,
              phone
            )
            if (admin) {
              const { password, ...adminWithoutPassword } = admin._doc
              response = adminWithoutPassword
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
    try {
      const db = await new Database()
      const adminMdl = new AdminMdl(db)
      const { id } = req.query ?? ''
      const admin = await adminMdl.queryGetAdmin(id)
      if (admin.length > 0) {
        response = [...admin]
        code = 200
      }
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
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
      let dataIpt = [{ label: 'id', type: 'objectid' }]
      let dataOption = [
        { label: 'email', type: 'email' },
        { label: 'lastname', type: 'string' },
        { label: 'firstname', type: 'string' },
        { label: 'phone', type: 'number' },
      ]
      let listError = this.verifSecure(dataIpt, req.params)
      let listErrorOption = this.verifWithOption(dataOption, req.body, true)

      if (listError.length === 0 && listErrorOption.length === 0) {
        try {
          const db = await new Database()
          const adminMdl = new AdminMdl(db)
          const { id } = req.params
          const filteredData = Object.entries(req.body).reduce(
            (obj, [key, value]) => {
              if (['firstname', 'lastname', 'phone', 'email'].includes(key)) {
                obj[key] = value
              }
              return obj
            },
            {}
          )
          const adminAlreadyExist = await adminMdl.didAdminAlreadyExiste(
            'id',
            id
          )
          let emailAdminAlreadyExistForAnother = false
          if (filteredData['email']) {
            emailAdminAlreadyExistForAnother =
              await adminMdl.didEmailAdminAlreadyExiste(
                id,
                filteredData['email']
              )
          }
          if (adminAlreadyExist && !emailAdminAlreadyExistForAnother) {
            const admin = await adminMdl.queryUpdateAdmin(id, filteredData)
            if (admin) {
              response = { ...admin }
              code = 200
            }
          } else if (adminAlreadyExist && emailAdminAlreadyExistForAnother) {
            code = 400
          } else {
            code = 404
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
      let dataIpt = [{ label: 'id', type: 'objectid' }]
      let listError = this.verifSecure(dataIpt, req.params)

      if (listError.length === 0) {
        try {
          const db = await new Database()
          const adminMdl = new AdminMdl(db)
          const { id } = req.params
          const adminAlreadyExist = await adminMdl.didAdminAlreadyExiste(
            'id',
            id
          )
          if (adminAlreadyExist) {
            const admin = await adminMdl.queryDeleteAdmin(id)
            if (admin) {
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
