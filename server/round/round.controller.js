import express from 'express'
import Database from '../mogodb/mongo.connect.js'
import RoundMdl from './round.model.js'
import ClassCtrl from '../controller/class.controller.js'
import ParcelMdl from '../parcel/parcel.model.js'
import DelivererMdl from '../deliverer/deliverer.model.js'

const { Request, Response } = express

export default class RoundCtrl extends ClassCtrl {
  static create = async (req = Request, res = Response) => {
    let code = 404
    let response = {
      error: true,
      message: 'Bad request',
      data: [],
    }
    if (Object.keys(req.body).length > 0) {
      let dataIpt = [
        { label: 'deliverer_id', type: 'objectid' },
        { label: 'date', type: 'string' },
        { label: 'parcels', type: 'array' },
      ]
      let listError = this.verifSecure(dataIpt, req.body)

      if (listError.length > 0) {
        response.message = 'Erreur'
        response.data.push(listError)
      } else {
        try {
          const db = await new Database()
          const roundMdl = new RoundMdl(db)
          const parcelMdl = new ParcelMdl(db)
          const delivererMdl = new DelivererMdl(db)
          const { deliverer_id, date, parcels } = req.body
          let result = []

          const parcelPromises = parcels.map(async (id) => {
            const isOK = await parcelMdl.didParcelAlreadyExiste('_id', id)
            const isDelivererOK = await delivererMdl.didDelivererAlreadyExiste(
              '_id',
              deliverer_id
            )

            if (isOK && isDelivererOK) {
              const parcelAlreadyExistForThisRound =
                await roundMdl.didParcelAlreadyExisteForARound(id)
              if (!parcelAlreadyExistForThisRound) {
                result.push(id)
              } else {
                listError.push(`Colis ${id} déjà affecté à une tournée`)
              }
            }
            if (!isOK) {
              listError.push(
                `Colis ${id} inconnu, impossible de l'ajouter à la tournée`
              )
            }
            if (!isDelivererOK) {
              listError.push(
                `Livreur ${deliverer_id} inconnu, impossible de lui affecter la tournée`
              )
            }
          })

          await Promise.all(parcelPromises)

          if (listError.length > 0) {
            response.message = 'Erreur'
            response.data.push(...listError)
          } else {
            const round = await roundMdl.queryCreateRound(
              deliverer_id,
              date,
              result
            )
            response.message = 'Impossible de créer la tournée'
            if (round) {
              response.message = 'Tournée créé'
              response.error = false
              response.data.push(round)
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
      let dataOption = [
        { label: '_id', type: 'objectid' },
        { label: 'deliverer_id', type: 'objectid' },
      ]
      listErrorOption = this.verifWithOption(dataOption, req.query, true)
    }
    if (listErrorOption > 0) {
      response.message = 'Erreur'
      response.data.push(listErrorOption)
    }
    {
      try {
        const db = await new Database()
        const roundMdl = new RoundMdl(db)
        const filteredData = Object.entries(req.query).reduce(
          (obj, [key, value]) => {
            if (['_id', 'deliverer_id'].includes(key)) {
              obj[key] = value
            }
            return obj
          },
          {}
        )
        const round = await roundMdl.queryGetRound(filteredData)
        response.message = 'Aucune tournée'
        if (round.length > 0) {
          response.message = 'Tournée(s) récupéré(s)'
          response.error = false
          response.data = round
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
        { label: 'parcels', type: 'array' },
        { label: 'date', type: 'string' },
        { label: 'deliverer_id', type: 'objectid' },
      ]
      let listError = this.verifSecure(dataIpt, req.params)
      let listErrorOption = this.verifWithOption(dataOption, req.body, true)

      if (listError.length > 0 || listErrorOption > 0) {
        response.message = 'Erreur'
        response.data.push(listError)
        response.data.push(listErrorOption)
      } else {
        try {
          const db = await new Database()
          const roundMdl = new RoundMdl(db)
          const { id } = req.params
          const filteredData = Object.entries(req.body).reduce(
            (obj, [key, value]) => {
              if (['parcels', 'deliverer_id', 'date'].includes(key)) {
                obj[key] = value
              }
              return obj
            },
            {}
          )
          const roundAlreadyExist = await roundMdl.didRoundAlreadyExiste(id)
          response.message = 'Tournée inconnue'
          if (roundAlreadyExist) {
            const round = await roundMdl.queryUpdateRound(id, filteredData)
            response.message = 'Impossible de modifier la tournée'
            if (round) {
              response.message = 'Tournée modifiée'
              response.error = false
              response.data.push(round)
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

  static affectDeliverer = async (req = Request, res = Response) => {
    let code = 404
    let response = {
      error: true,
      message: 'Bad request',
      data: [],
    }
    if (Object.keys(req.body).length > 0) {
      let dataIpt = [
        { label: 'id', type: 'objectid' },
        { label: 'deliverer_id', type: 'objectid' },
        { label: 'date', type: 'string' },
      ]
      let listError = this.verifSecure(dataIpt, req.body)

      if (listError.length > 0) {
        response.message = 'Erreur'
        response.data.push(listError)
      } else {
        try {
          const db = await new Database()
          const roundMdl = new RoundMdl(db)
          const delivererMdl = new DelivererMdl(db)
          const { id, deliverer_id, date } = req.body

          const roundAlreadyExist = await roundMdl.didRoundAlreadyExiste(id)

          response.message = 'Tournée inconnu'
          if (roundAlreadyExist) {
            let isDelivererOK = await delivererMdl.didDelivererAlreadyExiste(
              '_id',
              deliverer_id
            )

            response.message = 'Livreur inconnu'
            if (isDelivererOK) {
              let isDelivererOK = true
              /* await didDelivererIsFree.didDelivererAlreadyExiste(
                  deliverer_id,
                  date
                ) */

              response.message = `Le livreur ${deliverer_id} ne peut pas être affecté à la tournée ${id}, vérifiez la date`
              if (isDelivererOK) {
                const round = await roundMdl.queryAffectDelivererToRound(
                  id,
                  deliverer_id,
                  date
                )
                response.message = 'Erreur lors de laffectation du livreur'
                if (round) {
                  response.message = `Tournée ${id} affecté au livreur ${deliverer_id}`
                  response.error = false
                  response.data.push(round)
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
    let code = 404
    let response = {
      error: true,
      message: 'Bad request',
      data: [],
    }
    if (Object.keys(req.params).length > 0) {
      const dataIpt = [{ label: 'id', type: 'objectid' }]
      const listError = this.verifSecure(dataIpt, req.params)

      if (listError.length > 0) {
        response.message = 'Erreur'
        response.data.push(listError)
      } else {
        try {
          const db = await new Database()
          const roundMdl = new RoundMdl(db)
          const { id } = req.params
          const roundAlreadyExist = await roundMdl.didRoundAlreadyExiste(id)
          response.message = 'Tournée inexistant'
          if (roundAlreadyExist) {
            const round = await roundMdl.queryDeleteRound(id)
            response.message = 'Impossible de supprimer la tournée'
            if (round) {
              response.message = 'Tournée supprimée'
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
