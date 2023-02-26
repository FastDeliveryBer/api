import express from 'express'
import Database from '../mogodb/mongo.connect.js'
import bcrypt from 'bcrypt'
import DelivererMdl from './deliverer.model.js'
import RoundMdl from './../round/round.model.js'
import ClassCtrl from '../controller/class.controller.js'
import Authentication from './../auth/token.validation.js'

const { Request, Response } = express
export default class DeliveryCtrl extends ClassCtrl {
  static create = async (req = Request, res = Response) => {
    let code = 400
    let response
    if (Object.keys(req.body).length > 0) {
      let dataIpt = [
        { label: 'lastname', type: 'string' },
        { label: 'firstname', type: 'string' },
        { label: 'email', type: 'email' },
        { label: 'password', type: 'string' },
        { label: 'phone', type: 'number' },
        { label: 'langage', type: 'langage' },
        { label: 'password', type: 'string' },
      ]
      let listError = this.verifSecure(dataIpt, req.body)

      if (listError.length === 0) {
        try {
          const db = await new Database()
          const delivererMdl = new DelivererMdl(db)
          const { firstname, lastname, email, password, phone, langage } =
            req.body

          const delivererAlreadyExist =
            await delivererMdl.didDelivererAlreadyExiste('email', email)
          code = 404
          if (!delivererAlreadyExist) {
            code = 400
            const deliverer = await delivererMdl.queryCreateDeliverer(
              firstname,
              lastname,
              email,
              password,
              phone,
              langage
            )
            if (deliverer) {
              const { password, ...delivererWithoutPassword } = deliverer._doc
              response = delivererWithoutPassword
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

    if (listErrorOption.length === 0) {
      try {
        code = 404
        const db = await new Database()
        const delivererMdl = new DelivererMdl(db)
        const { id } = req.query ?? ''
        const deliverer = await delivererMdl.queryGetDeliverer(id)
        if (deliverer.length > 0) {
          response = [...deliverer]
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
    let response
    if (
      Object.keys(req.body).length > 0 &&
      Object.keys(req.params).length > 0
    ) {
      const dataIpt = [{ label: 'id', type: 'objectid' }]
      const dataOption = [
        { label: 'email', type: 'email' },
        { label: 'lastname', type: 'string' },
        { label: 'firstname', type: 'string' },
        { label: 'phone', type: 'number' },
        { label: 'langage', type: 'langage' },
      ]
      const listError = this.verifSecure(dataIpt, req.params)
      const listErrorOption = this.verifWithOption(dataOption, req.body, true)

      if (listError.length === 0 && listErrorOption.length === 0) {
        try {
          const db = await new Database()
          const delivererMdl = new DelivererMdl(db)
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
          const delivererAlreadyExist =
            await delivererMdl.didDelivererAlreadyExiste('id', id)
          let emailDelivererAlreadyExistForAnother = false
          if (filteredData['email']) {
            emailDelivererAlreadyExistForAnother =
              await delivererMdl.didEmailDelivererAlreadyExiste(
                id,
                filteredData['email']
              )
          }

          if (delivererAlreadyExist && !emailDelivererAlreadyExistForAnother) {
            const deliverer = await delivererMdl.queryUpdateDeliverer(
              id,
              filteredData
            )
            if (deliverer) {
              response = deliverer
              code = 200
            }
          } else if (
            delivererAlreadyExist &&
            emailDelivererAlreadyExistForAnother
          ) {
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

  static deleteDeliverer = async (req = Request, res = Response) => {
    let code = 400
    let response
    if (Object.keys(req.params).length > 0) {
      let dataIpt = [{ label: 'id', type: 'objectid' }]
      let listError = this.verifSecure(dataIpt, req.params)

      if (listError.length === 0) {
        try {
          code = 404
          const db = await new Database()
          const delivererMdl = new DelivererMdl(db)
          const { id } = req.params
          const delivererAlreadyExist =
            await delivererMdl.didDelivererAlreadyExiste('id', id)
          if (delivererAlreadyExist) {
            const deliverer = await delivererMdl.queryDeleteDeliverer(id)
            if (deliverer) {
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

  static login = async (req = Request, res = Response) => {
    let code = 400
    let response
    if (Object.keys(req.body).length > 0) {
      let dataIpt = [
        { label: 'email', type: 'email' },
        { label: 'password', type: 'string' },
      ]
      let listError = this.verifSecure(dataIpt, req.body)

      if (listError.length === 0) {
        try {
          code = 404
          const db = await new Database()
          const delivererMdl = new DelivererMdl(db)
          const { email, password } = req.body
          const user = await delivererMdl.queryGetDelivererByEmail(email)

          if (user) {
            let isSamePassword = await bcrypt.compare(password, user.password)
            if (isSamePassword) {
              code = 400
              const { password, ...userWithoutPassword } = user._doc
              const token = Authentication.generateToken({ email: email })
              res.header('x-auth-token', token)
              response = userWithoutPassword
              code = 200
            }
          }
        } catch (error) {
          console.log(error)
          res.status(400).send(error)
        }
      }
      res.status(code).send(response)
    }
  }

  static getPosition = async (req = Request, res = Response) => {
    let code = 400
    let response = {}

    try {
      code = 404
      const db = await new Database()
      const delivererMdl = new DelivererMdl(db)
      const roundMdl = new RoundMdl(db)
      const deliverer = await delivererMdl.queryGetDeliverer()
      if (deliverer.length > 0) {
        let delivererToSave = []
        arrayDeliverer = [...deliverer]

        const parcelPromises = arrayDeliverer.map(async (deliverer) => {
          const filteredData = Object.entries(deliverer).reduce(
            (obj, [key, value]) => {
              if (['id'].includes(key)) {
                obj[key] = value
              }
              return obj
            },
            {}
          )

          const isDelivererOK = await roundMdl.queryGetRound(
            'id',
            deliverer.id,
            'status',
            'transit'
          )

          if (isDelivererOK) {
            delivererToSave.push(id)
          }
        })

        await Promise.all(parcelPromises)

        const round = await roundMdl.queryGetRound(filteredData)

        response = [...deliverer]
        code = 200
      }
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }

    res.status(code).send(response)
  }
}
