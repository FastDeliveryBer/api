import express from 'express'
import Database from '../mogodb/mongo.connect.js'
import DelivererMdl from './deliverer.model.js'
import ClassCtrl from '../controller/class.controller.js'

const { Request, Response } = express
export default class DeliveryCtrl extends ClassCtrl {
  static getDeliverer = async (req = Request, res = Response) => {
    let code = 404
    let response = {
      error: true,
      message: 'Bad request',
      data: [],
    }
    try {
      const db = await new Database()
      const delivererMdl = new DelivererMdl(db)
      const deliverer = await delivererMdl.queryGetDeliverer()
      response.message = 'Aucun livreur'
      if (deliverer.length > 0) {
        response.message = 'Livreur(s) récupéré'
        response.error = false
        response.data = deliverer
        code = 200
      }
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
    res.status(code).send(response)
  }

  static createDeliverer = async (req = Request, res = Response) => {
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
        { label: 'email', type: 'string' },
        { label: 'phone', type: 'number' },
        { label: 'langage', type: 'string' },
        { label: 'password', type: 'string' },
      ]
      let listError = this.verifSecure(dataIpt, req.body)

      if (listError.length > 0) {
        response.message = 'Erreur'
        response.data.push(listError)
      } else {
        try {
          const db = await new Database()
          const delivererMdl = new DelivererMdl(db)
          const { firstname, lastname, email, password, phone, langage } =
            req.body

          const delivererAlreadyExist =
            await delivererMdl.didDelivererAlreadyExiste(email)
          response.message = 'Ce livreur existe déjà'
          if (!delivererAlreadyExist) {
            const deliverer = await delivererMdl.queryCreateDeliverer(
              firstname,
              lastname,
              email,
              password,
              phone,
              langage
            )
            response.message = 'Impossible de créer le livreur'
            if (deliverer) {
              const { password, ...delivererWithoutPassword } = deliverer._doc
              response.message = 'Livreur créé'
              response.error = false
              response.data.push({
                deliverer: delivererWithoutPassword,
              })
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

  static updateDeliverer = async (req = Request, res = Response) => {
    let code = 404
    let response = {
      error: true,
      message: 'Bad request',
      data: [],
    }
    if (Object.keys(req.body).length > 0) {
      let dataIpt = [{ label: 'email', type: 'string' }]
      let dataOption = [
        { label: 'lastname', type: 'string' },
        { label: 'firstname', type: 'string' },
        { label: 'phone', type: 'number' },
        { label: 'langage', type: 'string' },
      ]
      let listError = this.verifSecure(dataIpt, req.body)
      let listErrorOption = this.verifWithOption(dataOption, req.body, true)

      if (listError.length > 0 || listErrorOption > 0) {
        response.message = 'Erreur'
        response.data.push(listError)
        response.data.push(listErrorOption)
      } else {
        try {
          const db = await new Database()
          const delivererMdl = new DelivererMdl(db)
          const { email } = req.body
          const filteredData = Object.entries(req.body).reduce(
            (obj, [key, value]) => {
              if (['firstname', 'lastname', 'phone', 'langage'].includes(key)) {
                obj[key] = value
              }
              return obj
            },
            {}
          )
          const delivererAlreadyExist =
            await delivererMdl.didDelivererAlreadyExiste(email)
          response.message = "Ce livreur n'existe pas"
          if (delivererAlreadyExist) {
            const deliverer = await delivererMdl.queryUpdateDeliverer(
              email,
              filteredData
            )
            response.message = 'Impossible de modifier le livreur'

            if (deliverer) {
              response.message = 'Livreur modifié'
              response.error = false
              response.data.push({
                deliverer: deliverer,
              })
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

  static deleteDeliverer = async (req = Request, res = Response) => {
    let code = 404
    let response = {
      error: true,
      message: 'Bad request',
      data: [],
    }
    if (Object.keys(req.body).length > 0) {
      let dataIpt = [{ label: 'email', type: 'string' }]
      let listError = this.verifSecure(dataIpt, req.body)

      if (listError.length > 0) {
        response.message = 'Erreur'
        response.data.push(listError)
      } else {
        try {
          const db = await new Database()
          const delivererMdl = new DelivererMdl(db)
          const { email } = req.body
          const delivererAlreadyExist =
            await delivererMdl.didDelivererAlreadyExiste(email)
          response.message = "Ce livreur n'existe pas"
          if (delivererAlreadyExist) {
            const deliverer = await delivererMdl.queryDeleteDeliverer(email)
            response.message = 'Impossible de supprimer le livreur'
            if (deliverer) {
              response.message = 'Livreur supprimé'
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

  static fnc = () => {
    res.status(200).send('Hello')
  }
}
