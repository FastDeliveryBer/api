import express from 'express'
import Database from '../mogodb/mongo.connect.js'
import RoundMdl from './round.model.js'
import ClassCtrl from '../controller/class.controller.js'
import deliverer from '../../docs/deliverer/index.js'
import ParcelMdl from '../parcel/parcel.model.js'

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
        { label: 'deliverer_id', type: 'string' },
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
          const { deliverer_id, date, parcels } = req.body
          let result = []

          const parcelPromises = parcels.map(async (id) => {
            const isOK = await parcelMdl.didParcelAlreadyExiste(id)

            if (isOK) {
              const parcelAlreadyExistForThisRound =
                await roundMdl.didParcelAlreadyExisteForARound(id)
              if (!parcelAlreadyExistForThisRound) {
                result.push(id)
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

          if (listError.length > 0) {
            response.message = 'Erreur'
            response.data.push(listError)
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
      let dataOption = [{ label: 'id', type: 'objectid' }]
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
        const { id } = req.query ?? ''
        const round = await roundMdl.queryGetRound(id)
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
      let dataOption = [{ label: 'parcels', type: 'array' }]
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
              if (['parcels', 'deliverer'].includes(key)) {
                obj[key] = value
              }
              return obj
            },
            {}
          )
          const roundAlreadyExist = await roundMdl.didRoundAlreadyExiste(id)
          response.message = "Ce colis n'existe pas"
          if (roundAlreadyExist) {
            const round = await roundMdl.queryUpdateRound(id, filteredData)
            response.message = 'Impossible de modifier le colis'
            if (round) {
              response.message = 'Colis modifié'
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
          response.message = 'Colis inexistant'
          if (roundAlreadyExist) {
            const round = await roundMdl.queryDeleteRound(id)
            response.message = 'Impossible de supprimer le colis'
            if (round) {
              response.message = 'Colis supprimé'
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
