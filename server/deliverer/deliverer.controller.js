import express from 'express'
import Database from '../mogodb/mongo.connect.js'
import DelivererMdl from './deliverer.model.js'
import ClassCtrl from '../controller/class.controller.js'

const { Request, Response } = express
export default class DeliveryCtrl extends ClassCtrl {
  static create = async (req = Request, res = Response) => {
    let code = 400
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
        { label: 'langage', type: 'langage' },
        { label: 'password', type: 'string' },
      ]
      let listError = this.verifSecure(dataIpt, req.body)

      if (listError.length > 0) {
        response.message = 'Erreur'
        response.data.push(...listError)
      } else {
        try {
          const db = await new Database()
          const delivererMdl = new DelivererMdl(db)
          const { firstname, lastname, email, password, phone, langage } =
            req.body

          const delivererAlreadyExist =
            await delivererMdl.didDelivererAlreadyExiste('email', email)
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
              response.data.push(delivererWithoutPassword)
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

    if (listErrorOption.length > 0) {
      response.message = 'Erreur'
      response.data.push(...listErrorOption)
    } else {
      try {
        const db = await new Database()
        const delivererMdl = new DelivererMdl(db)
        const { _id } = req.query ?? ''
        const deliverer = await delivererMdl.queryGetDeliverer(_id)
        response.message = 'Aucun livreur'
        if (deliverer.length > 0) {
          response.message = 'Livreur(s) récupéré(s)'
          response.error = false
          response.data = deliverer
          code = 200
        }
      } catch (error) {
        console.log(error)
        res.status(400).send(error)
      }
    }

    res.status(code).send(response)
  }

  static updateDeliverer = async (req = Request, res = Response) => {
    let code = 400
    let response = {
      error: true,
      message: 'Bad request',
      data: [],
    }
    if (
      Object.keys(req.body).length > 0 &&
      Object.keys(req.params).length > 0
    ) {
      const dataIpt = [{ label: '_id', type: 'objectid' }]
      const dataOption = [
        { label: 'email', type: 'email' },
        { label: 'lastname', type: 'string' },
        { label: 'firstname', type: 'string' },
        { label: 'phone', type: 'number' },
        { label: 'langage', type: 'langage' },
      ]
      const listError = this.verifSecure(dataIpt, req.params)
      const listErrorOption = this.verifWithOption(dataOption, req.body, true)

      if (listError.length > 0 || listErrorOption.length > 0) {
        response.message = 'Erreur'
        response.data.push(...listError)
        response.data.push(...listErrorOption)
      } else {
        try {
          const db = await new Database()
          const delivererMdl = new DelivererMdl(db)
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
          const delivererAlreadyExist =
            await delivererMdl.didDelivererAlreadyExiste('_id', _id)
          let emailDelivererAlreadyExistForAnother = false
          if (filteredData['email']) {
            emailDelivererAlreadyExistForAnother =
              await delivererMdl.didEmailDelivererAlreadyExiste(
                _id,
                filteredData['email']
              )
          }

          if (delivererAlreadyExist && !emailDelivererAlreadyExistForAnother) {
            const deliverer = await delivererMdl.queryUpdateDeliverer(
              _id,
              filteredData
            )
            response.message = 'Impossible de modifier le livreur'

            if (deliverer) {
              response.message = 'Livreur modifié'
              response.error = false
              response.data.push(deliverer)
              code = 200
            }
          } else if (
            delivererAlreadyExist &&
            emailDelivererAlreadyExistForAnother
          ) {
            response.message = 'Email déjà utilisée par un autre livreur'
          } else {
            response.message = "Ce livreur n'existe pas"
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
    let code = 400
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
          const delivererMdl = new DelivererMdl(db)
          const { _id } = req.params
          const delivererAlreadyExist =
            await delivererMdl.didDelivererAlreadyExiste('_id', _id)
          response.message = "Ce livreur n'existe pas"
          if (delivererAlreadyExist) {
            const deliverer = await delivererMdl.queryDeleteDeliverer(_id)
            response.message = 'Impossible de supprimer le livreur'
            if (deliverer) {
              response.message = 'Livreur supprimé'
              response.error = false
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
