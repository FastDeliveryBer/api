import express from 'express'
import DelivererMdl from './deliverer.model.js'

const { Request, Response } = express
export default class DeliveryCtrl {
  static fnc = async (req = Request, res = Response) => {
    let data = await DelivererMdl.connect()
    res.status(200).send(data)
  }
}
