import express from 'express'
import Database from '../mogodb/mongo.connect.js'
import RoundMdl from './round.model.js'
import ClassCtrl from '../controller/class.controller.js'
import ParcelMdl from '../parcel/parcel.model.js'
import DelivererMdl from '../deliverer/deliverer.model.js'

const { Request, Response } = express

export default class RoundCtrl extends ClassCtrl {
  static create = async (req = Request, res = Response) => {
    let code = 400
    let response
    if (Object.keys(req.body).length > 0) {
      let dataIpt = [
        { label: 'delivererid', type: 'objectid' },
        { label: 'schelude_date', type: 'string' },
        { label: 'parcels', type: 'array' },
      ]
      let listError = this.verifSecure(dataIpt, req.body)

      if (listError.length === 0) {
        try {
          const db = await new Database()
          const roundMdl = new RoundMdl(db)
          const parcelMdl = new ParcelMdl(db)
          const delivererMdl = new DelivererMdl(db)
          const { delivererid, schelude_date, parcels } = req.body
          let parcelsToSave = []

          const parcelPromises = parcels.map(async (id) => {
            const isOK = await parcelMdl.didParcelAlreadyExiste('id', id)
            const isDelivererOK = await delivererMdl.didDelivererAlreadyExiste(
              'id',
              delivererid
            )

            if (isOK) {
              const parcelAlreadyExistForThisRound =
                await roundMdl.didParcelAlreadyExisteForARound(id)
              if (!parcelAlreadyExistForThisRound) {
                parcelsToSave.push(id)
              } else {
                listError.push(`Le colis ${id} est déjà affecté à une tournée`)
              }
            } else {
              listError.push(
                `Colis ${id} inconnu, impossible de l'ajouter à la tournée`
              )
            }
          })

          await Promise.all(parcelPromises)

          if (listError.length === 0) {
            code = 400
            const round = await roundMdl.queryCreateRound(
              delivererid,
              schelude_date,
              parcelsToSave
            )
            if (round) {
              response = round
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

    if (
      req.query['id'] !== undefined ||
      req.query['delivererid'] !== undefined
    ) {
      let dataOption = [
        { label: 'id', type: 'objectid' },
        { label: 'delivererid', type: 'objectid' },
      ]
      listErrorOption = this.verifWithOption(dataOption, req.query, true)
    }

    if (listErrorOption.length === 0) {
      try {
        code = 404
        const db = await new Database()
        const roundMdl = new RoundMdl(db)
        const filteredData = Object.entries(req.query).reduce(
          (obj, [key, value]) => {
            if (['id', 'delivererid'].includes(key)) {
              obj[key] = value
            }
            return obj
          },
          {}
        )
        const round = await roundMdl.queryGetRound(filteredData)
        if (round.length > 0) {
          response = [...round]
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
      const dataIpt = [{ label: 'id', type: 'objectid' }]
      const dataOption = [
        { label: 'parcels', type: 'array' },
        { label: 'schelude_date', type: 'string' },
        { label: 'delivererid', type: 'objectid' },
      ]
      const listError = this.verifSecure(dataIpt, req.params)
      const listErrorOption = this.verifWithOption(dataOption, req.body, true)

      if (listError.length === 0 || listErrorOption === 0) {
        try {
          code = 404
          const db = await new Database()
          const roundMdl = new RoundMdl(db)
          const { id } = req.params
          const filteredData = Object.entries(req.body).reduce(
            (obj, [key, value]) => {
              if (['parcels', 'delivererid', 'schelude_date'].includes(key)) {
                obj[key] = value
              }
              return obj
            },
            {}
          )
          const roundAlreadyExist = await roundMdl.didRoundAlreadyExiste(id)
          if (roundAlreadyExist) {
            let round = await roundMdl.queryUpdateRound(id, filteredData)
            if (round) {
              response = round
              code = 200
            }

            if (round.parcels.length == 0) {
              round = await roundMdl.queryDeleteRound(id)
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

  static affectDeliverer = async (req = Request, res = Response) => {
    let code = 404
    let response
    if (Object.keys(req.body).length > 0) {
      let dataIpt = [
        { label: 'id', type: 'objectid' },
        { label: 'delivererid', type: 'objectid' },
        { label: 'date', type: 'string' },
      ]
      let listError = this.verifSecure(dataIpt, req.body)

      if (listError.length === 0) {
        try {
          const db = await new Database()
          const roundMdl = new RoundMdl(db)
          const delivererMdl = new DelivererMdl(db)
          const { id, delivererid, date } = req.body

          const roundAlreadyExist = await roundMdl.didRoundAlreadyExiste(id)

          response.message = 'Tournée inconnu'
          if (roundAlreadyExist) {
            let isDelivererOK = await delivererMdl.didDelivererAlreadyExiste(
              'id',
              delivererid
            )

            response.message = 'Livreur inconnu'
            if (isDelivererOK) {
              let isDelivererOK = true
              /* await didDelivererIsFree.didDelivererAlreadyExiste(
                  delivererid,
                  date
                ) */

              response.message = `Le livreur ${delivererid} ne peut pas être affecté à la tournée ${id}, vérifiez la date`
              if (isDelivererOK) {
                const round = await roundMdl.queryAffectDelivererToRound(
                  id,
                  delivererid,
                  date
                )
                if (round) {
                  response = round
                  code = 200
                }
              }
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
          const roundMdl = new RoundMdl(db)
          const { id } = req.params
          const roundAlreadyExist = await roundMdl.didRoundAlreadyExiste(id)
          if (roundAlreadyExist) {
            const round = await roundMdl.queryDeleteRound(id)
            if (round) {
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
