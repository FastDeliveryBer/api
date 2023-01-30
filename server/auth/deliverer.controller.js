import express from 'express'

const { Request, Response } = express
export default class DeliveryCtrl {
  static fnc = (req = Request, res = Response) => {
    res.status(200).send('test')
  }
}
