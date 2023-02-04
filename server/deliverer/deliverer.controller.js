import express from 'express'
import Database from '../mogodb/mongo.connect.js'
import DelivererMdl from './deliverer.model.js'

const { Request, Response } = express
export default class DeliveryCtrl {
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
        response.data.push(deliverer)
        code = 200
      }
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
    res.status(code).send(response)
  }

  static fnc = () => {
    res.status(200).send('Hello')
  }
}
