import express from 'express'
import Database from '../mogodb/mongo.connect.js'
import AdminMdl from './admin.model.js'
import ClassCtrl from '../controller/class.controller.js'

const { Request, Response } = express
export default class AdminCtrl extends ClassCtrl {
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
        response.data.push(...listError)
      } else {
        try {
          const db = await new Database()
          const adminMdl = new AdminMdl(db)
          const { firstname, lastname, email, password, phone } = req.body

          const adminAlreadyExist = await adminMdl.didAdminAlreadyExiste(
            'email',
            email
          )
          response.message = 'Email déjà utilisée'
          if (!adminAlreadyExist) {
            const admin = await adminMdl.queryCreateAdmin(
              firstname,
              lastname,
              email,
              password,
              phone
            )
            response.message = 'Impossible de créer le comtpe admin'
            if (admin) {
              const { password, ...adminWithoutPassword } = admin._doc
              response.message = 'Compte admin créé'
              response.error = false
              response.data.push(adminWithoutPassword)
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

    if (req.query['_id'] !== undefined) {
      let dataOption = [{ label: '_id', type: 'objectid' }]
      listErrorOption = this.verifWithOption(dataOption, req.query, true)
    }
    try {
      const db = await new Database()
      const adminMdl = new AdminMdl(db)
      const { _id } = req.query ?? ''
      const admin = await adminMdl.queryGetAdmin(_id)
      response.message = 'Aucun admin'
      if (admin.length > 0) {
        response.message = 'Admin(s) récupéré(s)'
        response.error = false
        response.data = admin
        code = 200
      }
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
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
      let dataIpt = [{ label: 'id', type: 'objectid' }]
      let dataOption = [
        { label: 'email', type: 'email' },
        { label: 'lastname', type: 'string' },
        { label: 'firstname', type: 'string' },
        { label: 'phone', type: 'number' },
      ]
      let listError = this.verifSecure(dataIpt, req.params)
      let listErrorOption = this.verifWithOption(dataOption, req.body, true)

      if (listError.length > 0 || listErrorOption.length > 0) {
        response.message = 'Erreur'
        response.data.push(...listError)
        response.data.push(...listErrorOption)
      } else {
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
            '_id',
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
            response.message = 'Impossible de modifier le compte admin'

            if (admin) {
              response.message = 'Compte modifié'
              response.error = false
              response.data.push(admin)
              code = 200
            }
          } else if (adminAlreadyExist && emailAdminAlreadyExistForAnother) {
            response.message = 'Email déjà utilisée par un autre compte'
          } else {
            response.message = "Ce comtpe n'existe pas"
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
      let dataIpt = [{ label: '_id', type: 'objectid' }]
      let listError = this.verifSecure(dataIpt, req.params)

      if (listError.length > 0) {
        response.message = 'Erreur'
        response.data.push(listError)
      } else {
        try {
          const db = await new Database()
          const adminMdl = new AdminMdl(db)
          const { _id } = req.params
          const adminAlreadyExist = await adminMdl.didAdminAlreadyExiste(
            '_id',
            id
          )
          response.message = 'Compte admin inconnu'
          if (adminAlreadyExist) {
            const admin = await adminMdl.queryDeleteAdmin(id)
            response.message = "Impossible de supprimer l'admin"
            if (admin) {
              response.message = 'Admin supprimé'
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
