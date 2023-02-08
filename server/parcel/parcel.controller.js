import express from 'express'
import Database from '../mogodb/mongo.connect.js'
import ParcelMdl from './parcel.model.js'
import CustomerMdl from '../customer/customer.model.js'
import ClassCtrl from '../controller/class.controller.js'

const { Request, Response } = express

export default class ParcelCtrl extends ClassCtrl {
  static create = async (req = Request, res = Response) => {
    let code = 400
    let response = {
      error: true,
      message: 'Bad request',
      data: [],
    }
    if (Object.keys(req.body).length > 0) {
      let dataIpt = [
        { label: 'customer_id', type: 'objectid' },
        { label: 'delivery_date', type: 'string' },
        { label: 'address_expedition', type: 'string' },
        { label: 'address_delivery', type: 'string' },
        { label: 'weight', type: 'number' },
        { label: 'width', type: 'number' },
        { label: 'length', type: 'number' },
        { label: 'height', type: 'number' },
        { label: 'price', type: 'number' },
        { label: 'is_fragile', type: 'boolean' },
        { label: 'is_emergency', type: 'boolean' },
      ]
      let listError = this.verifSecure(dataIpt, req.body)

      if (listError.length > 0) {
        response.message = 'Erreur'
        response.data.push(listError)
      } else {
        try {
          const db = await new Database()
          const parcelMdl = new ParcelMdl(db)
          const customerMdl = new CustomerMdl(db)
          const {
            customer_id,
            delivery_date,
            address_expedition,
            address_delivery,
            weight,
            width,
            length,
            height,
            price,
            is_fragile,
            is_emergency,
          } = req.body

          const customerAlreadyExist =
            await customerMdl.didCustomerAlreadyExiste('_id', customer_id)
          response.message = 'Client inconnu'

          if (customerAlreadyExist) {
            const parcel = await parcelMdl.queryCreateParcel(
              customer_id,
              delivery_date,
              address_expedition,
              address_delivery,
              weight,
              width,
              length,
              height,
              price,
              is_fragile,
              is_emergency
            )
            response.message = 'Impossible de créer le colis'
            if (parcel) {
              response.message = 'Colis créé'
              response.error = false
              response.data.push(parcel)
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

    if (req.query !== '') {
      let dataOption = [
        { label: '_id', type: 'objectid' },
        { label: 'tracking_id', type: 'string' },
      ]
      listErrorOption = this.verifWithOption(dataOption, req.query, true)
    }
    if (listErrorOption > 0) {
      response.message = 'Erreur'
      response.data.push(listErrorOption)
    }
    {
      try {
        code = 404
        const db = await new Database()
        const parcelMdl = new ParcelMdl(db)
        const filteredData = Object.entries(req.query).reduce(
          (obj, [key, value]) => {
            if (['_id', 'tracking_id'].includes(key)) {
              obj[key] = value
            }
            return obj
          },
          {}
        )
        const parcel = await parcelMdl.queryGetParcel(filteredData)
        response.message = 'Aucun colis'
        if (parcel.length > 0) {
          response.message = 'Colis récupéré(s)'
          response.error = false
          response.data = parcel
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
      let dataIpt = [{ label: '_id', type: 'string' }]
      let dataOption = [
        { label: 'delivery_date', type: 'string' },
        { label: 'address_expedition', type: 'string' },
        { label: 'address_delivery', type: 'string' },
        { label: 'weight', type: 'string' },
        { label: 'width', type: 'string' },
        { label: 'length', type: 'string' },
        { label: 'height', type: 'string' },
        { label: 'is_fragile', type: 'boolean' },
        { label: 'is_emergency', type: 'boolean' },
      ]
      let listError = this.verifSecure(dataIpt, req.params)
      let listErrorOption = this.verifWithOption(dataOption, req.body, true)

      if (listError.length > 0 || listErrorOption > 0) {
        response.message = 'Erreur'
        response.data.push(...listError)
        response.data.push(...listErrorOption)
      } else {
        try {
          const db = await new Database()
          const parcelMdl = new ParcelMdl(db)
          const { _id } = req.params
          const filteredData = Object.entries(req.body).reduce(
            (obj, [key, value]) => {
              if (
                [
                  'delivery_date',
                  'address_expedition',
                  'address_delivery',
                  'weight',
                  'width',
                  'length',
                  'height',
                  'is_fragile',
                  'is_emergency',
                ].includes(key)
              ) {
                obj[key] = value
              }
              return obj
            },
            {}
          )
          const parcelAlreadyExist = await parcelMdl.didParcelAlreadyExiste(
            '_id',
            _id
          )
          response.message = "Ce colis n'existe pas"
          if (parcelAlreadyExist) {
            const parcel = await parcelMdl.queryUpdateParcel(_id, filteredData)
            response.message = 'Impossible de modifier le colis'

            if (parcel) {
              response.message = 'Colis modifié'
              response.error = false
              response.data.push(parcel)
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
    let code = 400
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
          const parcelMdl = new ParcelMdl(db)
          const { _id } = req.params
          const parcelAlreadyExist = await parcelMdl.didParcelAlreadyExiste(
            '_id',
            _id
          )
          response.message = 'Colis inexistant'
          if (parcelAlreadyExist) {
            const parcel = await parcelMdl.queryDeleteParcel(_id)
            response.message = 'Impossible de supprimer le colis'
            if (parcel) {
              response.message = 'Colis supprimé'
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
