import { Round } from '../schemas/schema.round.js'
import Model from '../models/model.js'
import { ObjectId } from 'mongodb'

export default class RoundMdl extends Model {
  queryCreateRound = async (delivererid, date, arrayTrackinId) => {
    try {
      const ID = new ObjectId()
      let round = new Round({
        id: ID,
        delivererid: delivererid,
        schelude_date: date,
        parcels: arrayTrackinId,
      })
      await round.save()
      return round
    } catch (error) {
      throw error
    }
  }

  queryGetRound = async (filteredData) => {
    const query = filteredData
    try {
      let round = await Round.find(query)
      return round
    } catch (error) {
      throw error
    }
  }

  queryUpdateRound = async (id, data) => {
    try {
      const round = await Round.findOneAndUpdate(
        { id: id },
        { $set: data },
        { new: true }
      )
      return round
    } catch (error) {
      throw error
    }
  }

  queryAffectDelivererToRound = async (id, delivererid, date) => {
    try {
      const round = await Round.findOneAndUpdate(
        { id: id },
        {
          $set: {
            delivererid: delivererid,
            date: date,
          },
        },
        { new: true }
      )
      return round
    } catch (error) {
      throw error
    }
  }

  queryDeleteRound = async (id) => {
    try {
      const round = await Round.findOneAndDelete({ id: id })
      return round
    } catch (error) {
      throw error
    }
  }

  didRoundAlreadyExiste = async (id) => {
    const query = { id: id }

    try {
      const roundExist = await Round.exists(query)
      return roundExist
    } catch (error) {
      throw error
    }
  }

  didParcelAlreadyExisteForARound = async (idParcel) => {
    const query = { parcels: idParcel }

    try {
      const roundExist = await Round.exists(query)
      return roundExist
    } catch (error) {
      throw error
    }
  }
}
