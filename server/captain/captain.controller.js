import express from 'express'
import Database from '../mogodb/mongo.connect.js'
import CaptainMdl from './captain.model.js'
import ClassCtrl from '../controller/class.controller.js'

const { Request, Response } = express
export default class CaptainCtrl extends ClassCtrl {
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
          const captainMdl = new CaptainMdl(db)
          const { firstname, lastname, email, password, phone } = req.body

          const captainAlreadyExist = await captainMdl.didCaptainAlreadyExiste(
            'email',
            email
          )
          response.message = 'Email déjà utilisée'
          if (!captainAlreadyExist) {
            const captain = await captainMdl.queryCreateCaptain(
              firstname,
              lastname,
              email,
              password,
              phone
            )
            response.message = 'Impossible de créer le comtpe captain'
            if (captain) {
              const { password, ...captainWithoutPassword } = captain._doc
              response.message = 'Compte captain créé'
              response.error = false
              response.data.push(captainWithoutPassword)
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
    try {
      const db = await new Database()
      const captainMdl = new CaptainMdl(db)
      const { _id } = req.query ?? ''
      const captain = await captainMdl.queryGetCaptain(_id)
      response.message = 'Aucun captain'
      if (captain.length > 0) {
        response.message = 'Captain(s) récupéré(s)'
        response.error = false
        response.data = captain
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
          const captainMdl = new CaptainMdl(db)
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
          const captainAlreadyExist = await captainMdl.didCaptainAlreadyExiste(
            '_id',
            id
          )
          let emailCaptainAlreadyExistForAnother = false
          if (filteredData['email']) {
            emailCaptainAlreadyExistForAnother =
              await captainMdl.didEmailCaptainAlreadyExiste(
                id,
                filteredData['email']
              )
          }
          if (captainAlreadyExist && !emailCaptainAlreadyExistForAnother) {
            const captain = await captainMdl.queryUpdateCaptain(
              id,
              filteredData
            )
            response.message = 'Impossible de modifier le compte captain'

            if (captain) {
              response.message = 'Compte modifié'
              response.error = false
              response.data.push(captain)
              code = 200
            }
          } else if (
            captainAlreadyExist &&
            emailCaptainAlreadyExistForAnother
          ) {
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
          const captainMdl = new CaptainMdl(db)
          const { _id } = req.params
          const captainAlreadyExist = await captainMdl.didCaptainAlreadyExiste(
            '_id',
            id
          )
          response.message = 'Compte captain inconnu'
          if (captainAlreadyExist) {
            const captain = await captainMdl.queryDeleteCaptain(id)
            response.message = "Impossible de supprimer l'captain"
            if (captain) {
              response.message = 'Captain supprimé'
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
