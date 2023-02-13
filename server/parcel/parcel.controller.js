import express from 'express'
import Database from '../mogodb/mongo.connect.js'
import ParcelMdl from './parcel.model.js'
import CustomerMdl from '../customer/customer.model.js'
import ClassCtrl from '../controller/class.controller.js'

const { Request, Response } = express

export default class ParcelCtrl extends ClassCtrl {
  static create = async (req = Request, res = Response) => {
    let code = 400
    let response = {}
    if (Object.keys(req.body).length > 0) {
      let dataIpt = [
        { label: 'customerid', type: 'objectid' },
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

      if (listError.length === 0) {
        try {
          const db = await new Database()
          const parcelMdl = new ParcelMdl(db)
          const customerMdl = new CustomerMdl(db)
          const {
            customerid,
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
            await customerMdl.didCustomerAlreadyExiste('id', customerid)

          if (customerAlreadyExist) {
            const parcel = await parcelMdl.queryCreateParcel(
              customerid,
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
            if (parcel) {
              response = parcel
              code = 201
            } else {
              code = 400
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

    if (
      req.query['id'] !== undefined ||
      req.query['trackingid'] !== undefined
    ) {
      let dataOption = [
        { label: 'id', type: 'objectid' },
        { label: 'trackingid', type: 'string' },
      ]
      listErrorOption = this.verifWithOption(dataOption, req.query, true)
    }

    if (listErrorOption.length === 0) {
      try {
        code = 404
        const db = await new Database()
        const parcelMdl = new ParcelMdl(db)
        const filteredData = Object.entries(req.query).reduce(
          (obj, [key, value]) => {
            if (['id', 'trackingid'].includes(key)) {
              obj[key] = value
            }
            return obj
          },
          {}
        )
        const parcel = await parcelMdl.queryGetParcel(filteredData)
        if (parcel.length > 0) {
          response = [...parcel]
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
    let response
    if (
      Object.keys(req.body).length > 0 &&
      Object.keys(req.params).length > 0
    ) {
      let dataIpt = [{ label: 'id', type: 'string' }]
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

      if (listError.length === 0 || listErrorOption === 0) {
        try {
          code = 404
          const db = await new Database()
          const parcelMdl = new ParcelMdl(db)
          const { id } = req.params
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
            'id',
            id
          )
          if (parcelAlreadyExist) {
            const parcel = await parcelMdl.queryUpdateParcel(id, filteredData)
            if (parcel) {
              response = parcel
              code = 200
            } else {
              code = 400
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
    let response

    if (Object.keys(req.params).length > 0) {
      const dataIpt = [{ label: 'id', type: 'objectid' }]
      const listError = this.verifSecure(dataIpt, req.params)

      if (listError.length === 0) {
        try {
          code = 404
          const db = await new Database()
          const parcelMdl = new ParcelMdl(db)
          const { id } = req.params
          const parcelAlreadyExist = await parcelMdl.didParcelAlreadyExiste(
            'id',
            id
          )
          if (parcelAlreadyExist) {
            const parcel = await parcelMdl.queryDeleteParcel(id)
            if (parcel) code = 204
            else code = 400
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
